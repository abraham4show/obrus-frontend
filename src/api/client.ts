const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

let storedCsrfToken: string | null = null;

// Function to fetch CSRF token from backend (call after login)
export async function fetchCsrfToken() {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/api/get-csrf-token/`, {
      credentials: 'include',
    });
    const data = await response.json();
    storedCsrfToken = data.csrfToken;
    console.debug('CSRF token fetched:', storedCsrfToken);
    return storedCsrfToken;
  } catch (err) {
    console.error('Failed to fetch CSRF token', err);
    return null;
  }
}

// Helper to get the token (synchronous)
function getCSRFToken(): string | null {
  return storedCsrfToken;
}

export const api = {
  async request(endpoint: string, options: RequestInit = {}, isFormData = false) {
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const fullUrl = `${API_BASE_URL}${normalizedEndpoint}`;
    const method = options.method?.toUpperCase() || 'GET';

    const headers: HeadersInit = isFormData ? {} : { 'Content-Type': 'application/json' };
    if (options.headers) Object.assign(headers, options.headers);

    // Add CSRF token for non-GET requests
    if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      const csrfToken = getCSRFToken();
      if (csrfToken) {
        headers['X-CSRFToken'] = csrfToken;
      } else {
        console.warn(`No CSRF token available for ${method} ${endpoint}`);
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
        } catch {}
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

  async getCurrentUser() {
    return this.request('/auth/profile/');
  },

  async login(email: string, password: string) {
    const data = await this.request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    // After login, fetch CSRF token
    await fetchCsrfToken();
    return data;
  },

  async register(userData: any) {
    const data = await this.request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    await fetchCsrfToken();
    return data;
  },

  async logout() {
    try {
      await this.request('/auth/logout/', { method: 'POST' });
    } catch (error) {
      console.warn('Logout error', error);
    }
    storedCsrfToken = null;
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
    }, true);
  },
};