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
  async request(endpoint: string, options: RequestInit = {}, skipAuth: boolean = false) {
    const fullUrl = `${API_BASE_URL}${endpoint}`;
    const method = options.method?.toUpperCase() || 'GET';

    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (options.headers) Object.assign(headers, options.headers);

    // No token – rely on session cookie only
    if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      const csrfToken = getCSRFToken();
      if (csrfToken) headers['X-CSRFToken'] = csrfToken;
    }

    const response = await fetch(fullUrl, { ...options, headers, credentials: 'include' });

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

  async login(email: string, password: string) {
    const data = await this.request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    // Do not store tokens – session is already set
    return data;
  },

  async register(userData: any) {
    const data = await this.request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    }, true);
    return data;
  },

  async logout() {
    // No tokens to clear; just call logout endpoint which invalidates session
    await this.request('/auth/logout/', { method: 'POST' }).catch(() => {});
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
    } else {
      body = JSON.stringify(data);
      headers['Content-Type'] = 'application/json';
    }
    const response = await fetch(`${API_BASE_URL}/service-requests/`, {
      method: 'POST',
      headers,
      body,
      credentials: 'include',
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || error.message || `HTTP ${response.status}`);
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