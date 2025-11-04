// frontend/src/services/api.js

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

/**
 * Generic API utility for interacting with FastAPI backend.
 * Provides basic GET, POST, PUT, DELETE helpers and handles errors gracefully.
 */

export const apiClient = {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`GET ${endpoint} failed`);
    return await response.json();
  },

  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`POST ${endpoint} failed: ${error}`);
    }
    return await response.json();
  },

  async put(endpoint, data = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`PUT ${endpoint} failed: ${error}`);
    }
    return await response.json();
  },

  async delete(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { method: "DELETE" });
    if (!response.ok) throw new Error(`DELETE ${endpoint} failed`);
    return await response.json();
  },
};

// Example specific endpoints (you can expand these):
export const customerAPI = {
  register: (data) => apiClient.post("/customers/register", data),
  getAll: () => apiClient.get("/customers/all"),
};

export const adminAPI = {
  getPending: () => apiClient.get("/admin/pending"),
  approve: (id) => apiClient.put(`/admin/approve/${id}`),
  reject: (id) => apiClient.put(`/admin/reject/${id}`),
};

export const notificationAPI = {
  send: (email, subject, message) =>
    apiClient.post("/notifications/send", { email, subject, message }),
  test: (email) => apiClient.get(`/notifications/test/${email}`),
};
