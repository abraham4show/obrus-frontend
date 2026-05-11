const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

function getCSRFToken(): string | null {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrftoken') return decodeURIComponent(value);
  }
  return null;
}

export const api = {
  async request(endpoint: string, options: RequestInit = {}, isFormData = false) {
    // Ensure endpoint starts with a slash
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const fullUrl = `${API_BASE_URL}${normalizedEndpoint}`;
    const method = options.method?.toUpperCase() || 'GET';

    const headers: HeadersInit = isFormData ? {} : { 'Content-Type': 'application/json' };
    if (options.headers) Object.assign(headers, options.headers);

    // Add CSRF token for non-idempotent methods
    if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      const csrfToken = getCSRFToken();
      if (csrfToken) {
        headers['X-CSRFToken'] = csrfToken;
      } else {
        console.warn('CSRF token not found in cookies');
      }
    }

    try {
      const response = await fetch(fullUrl, {
        ...options,
        headers,
        credentials: 'include',
      });

      if (response.status === 204) return null;

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        try {
          const error = await response.json();
          errorMessage = error.detail || error.message || errorMessage;
        } catch {
          // ignore JSON parsing error
        }
        throw new Error(errorMessage);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      }
      return null;
    } catch (error) {
      console.error(`API request failed: ${fullUrl}`, error);
      throw error;
    }
  },

  // Explicitly fetch current user – used after OAuth redirect
  async getCurrentUser() {
    return this.request('/auth/profile/');
  },

  async login(email: string, password: string) {
    return this.request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async register(userData: any) {
    return this.request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async logout() {
    try {
      await this.request('/auth/logout/', { method: 'POST' });
    } catch (error) {
      console.warn('Logout endpoint failed, clearing local session anyway', error);
    }
  },

  async createServiceRequest(data: any, files?: { cv?: File; document?: File }) {
    let body: BodyInit;
    let isFormData = false;

    if (files && (files.cv || files.document)) {
      const formData = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (typeof data[key] === 'object') {
            formData.append(key, JSON.stringify(data[key]));
          } else {
            formData.append(key, data[key]);
          }
        }
      }
      if (files.cv) formData.append('cv', files.cv);
      if (files.document) formData.append('document', files.document);
      body = formData;
      isFormData = true;
    } else {
      body = JSON.stringify(data);
    }

    return this.request('/service-requests/', {
      method: 'POST',
      body,
    }, isFormData);
  },

  async getMyNotifications() {
    return this.request('/notifications/my-notifications/');
  },

  async getMyServiceRequests() {
    return this.request('/service-requests/my-requests/');
  },

  async getMyJobApplications() {
    return this.request('/job-applications/my-applications/');
  },

  async createJobApplication(formData: FormData) {
    return this.request('/job-applications/', {
      method: 'POST',
      body: formData,
    }, true); // true indicates FormData
  },
};