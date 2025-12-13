const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* ================= HELPERS ================= */

const getToken = () => localStorage.getItem("token");

const authHeader = () => {
  const token = getToken();
  return token
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    : { "Content-Type": "application/json" };
};

/* ================= REQUEST ================= */

async function request(method, path, body = null, auth = false) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: auth ? authHeader() : { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
    });

    // ❗ handle non-JSON or server crash
    let data = null;
    try {
      data = await res.json();
    } catch {
      data = { message: "Server error" };
    }

    // ❗ normalize failed responses
    if (!res.ok) {
      return {
        error: true,
        status: res.status,
        message: data?.message || "Request failed",
      };
    }

    return data;
  } catch (err) {
    console.error("REQUEST ERROR:", err);
    return {
      error: true,
      message: "Network error",
    };
  }
}

/* ================= AUTH ================= */

export const authApi = {
  register: (data) => request("POST", "/auth/register", data),
  login: (data) => request("POST", "/auth/login", data),
  me: () => request("GET", "/auth/me", null, true),
};

/* ================= PRODUCTS ================= */

export const productApi = {
  getAll: async () => {
    const res = await request("GET", "/products");
    return Array.isArray(res) ? res : [];
  },
  add: (data) => request("POST", "/products", data, true),
  myProducts: async () => {
    const res = await request("GET", "/products/my", null, true);
    return Array.isArray(res) ? res : [];
  },
  update: (id, data) => request("PUT", `/products/${id}`, data, true),
  remove: (id) => request("DELETE", `/products/${id}`, null, true),
};

/* ================= ORDERS ================= */

export const orderApi = {
  place: (items) => request("POST", "/orders", { items }, true),
  myOrders: async () => {
    const res = await request("GET", "/orders/my", null, true);
    return Array.isArray(res) ? res : [];
  },
};

/* ================= VENDOR ================= */

export const vendorApi = {
  myOrders: async () => {
    const res = await request("GET", "/orders/vendor/my", null, true);
    return Array.isArray(res) ? res : [];
  },
  updateOrderStatus: (id, status) =>
    request("PUT", `/orders/vendor/${id}/status`, { status }, true),
};

/* ================= ADMIN ================= */

export const adminApi = {
  getVendorRequests: async () => {
    const res = await request("GET", "/admin/vendor-requests", null, true);
    return Array.isArray(res) ? res : [];
  },
  approveVendor: (id) =>
    request("PUT", `/admin/vendors/${id}/approve`, {}, true),
  revokeVendor: (id) =>
    request("PUT", `/admin/vendors/${id}/revoke`, {}, true),
  allVendors: async () => {
    const res = await request("GET", "/admin/vendors", null, true);
    return Array.isArray(res) ? res : [];
  },
  pendingOrders: async () => {
    const res = await request("GET", "/admin/orders/pending", null, true);
    return Array.isArray(res) ? res : [];
  },
  assignOrder: (orderId, vendorId) =>
    request("PUT", `/admin/orders/${orderId}/assign`, { vendorId }, true),
  summary: () => request("GET", "/admin/summary", null, true),
};

/* ================= SUPER ADMIN ================= */

export const superAdminApi = {
  createAdmin: (data) => request("POST", "/auth/create-admin", data, true),
  getAdmins: async () => {
    const res = await request("GET", "/auth/admins", null, true);
    return Array.isArray(res) ? res : [];
  },
};
