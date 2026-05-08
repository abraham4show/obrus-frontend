const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

function getCSRFToken(): string | null {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrftoken') return value;
  }
  return null;
}

export const api = {
  async request(endpoint: string, options: RequestInit = {}) {
    // Ensure endpoint starts with a slash
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const fullUrl = `${API_BASE_URL}${normalizedEndpoint}`;
    const method = options.method?.toUpperCase() || 'GET';

    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (options.headers) Object.assign(headers, options.headers);

    // Add CSRF token for non-idempotent methods (except when explicitly skipped for external calls)
    if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      const csrfToken = getCSRFToken();
      if (csrfToken) headers['X-CSRFToken'] = csrfToken;
    }

    try {
      const response = await fetch(fullUrl, {
        ...options,
        headers,
        credentials: 'include', // required for session cookies
      });

      // Handle 204 No Content
      if (response.status === 204) {
        return null;
      }

      // For 403 or 401, the session might be invalid – we don't throw immediately,
      // but the caller should handle accordingly.
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
    const data = await this.request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return data;
  },

  async register(userData: any) {
    const data = await this.request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return data;
  },

  async logout() {
    try {
      await this.request('/auth/logout/', { method: 'POST' });
    } catch (error) {
      console.warn('Logout endpoint failed, clearing local session anyway', error);
    }
    // Clear any client-side state (the cookie will be invalidated on the server)
  },

  async createServiceRequest(data: any, files?: { cv?: File; document?: File }) {
    let body: BodyInit;
    let headers: HeadersInit = {};
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
      // Do not set Content-Type; browser will set multipart boundary
    } else {
      body = JSON.stringify(data);
      headers['Content-Type'] = 'application/json';
    }

    const fullUrl = `${API_BASE_URL}/service-requests/`;
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers,
      body,
      credentials: 'include',
    });

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const error = await response.json();
        errorMessage = error.detail || error.message || errorMessage;
      } catch {}
      throw new Error(errorMessage);
    }
    return response.json();
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
    const fullUrl = `${API_BASE_URL}/job-applications/`;
    const response = await fetch(fullUrl, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    if (!response.ok) {
      let errorMessage = 'Upload failed';
      try {
        const error = await response.json();
        errorMessage = error.detail || error.message || errorMessage;
      } catch {}
      throw new Error(errorMessage);
    }
    return response.json();
  },
};