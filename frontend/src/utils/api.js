const BASE_URL = "http://127.0.0.1:5000/api";
// Helper: Get JWT token
const getToken = () => localStorage.getItem("token");

// Helper: Auth header
const authHeader = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// Generic request function
async function request(method, path, body = null, auth = false) {
  console.log("FETCHING:", `${BASE_URL}${path}`);

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: auth ? authHeader() : { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = { message: "Server error" };
    }

    return data;
  } catch (err) {
    console.error("REQUEST ERROR:", err);
    return { message: "Network error" };
  }
}

// AUTH API
export const authApi = {
  register: (data) => request("POST", "/auth/register", data),
  login: (data) => request("POST", "/auth/login", data),
  me: () => request("GET", "/auth/me", null, true),
};

// PRODUCT API
export const productApi = {
  getAll: () => request("GET", "/products"),
  add: (data) => request("POST", "/products", data, true),
  myProducts: () => request("GET", "/products/my", null, true),
  update: (id, data) => request("PUT", `/products/${id}`, data, true),
  remove: (id) => request("DELETE", `/products/${id}`, null, true),
};

// ORDER API
export const orderApi = {
  place: (items) => request("POST", "/orders", { items }, true),
  myOrders: () => request("GET", "/orders/my", null, true),
};

// VENDOR API
export const vendorApi = {
  myOrders: () => request("GET", "/orders/vendor/my", null, true),
  updateOrderStatus: (id, status) =>
    request("PUT", `/orders/vendor/${id}/status`, { status }, true),
  
};

// ADMIN API
export const adminApi = {
  getVendorRequests: () => request("GET", "/admin/vendor-requests", null, true),

  approveVendor: (id) =>
    request("PUT", `/admin/vendors/${id}/approve`, {}, true),

  revokeVendor: (id) =>
    request("PUT", `/admin/vendors/${id}/revoke`, {}, true),

  allVendors: () => request("GET", "/admin/vendors", null, true),

  pendingOrders: () => request("GET", "/admin/orders/pending", null, true),

  assignOrder: (orderId, vendorId) =>
    request("PUT", `/admin/orders/${orderId}/assign`, { vendorId }, true),

  summary: () => request("GET", "/admin/summary", null, true),
};

// SUPER ADMIN – Admin Management (Create Admin, List Admins)
export const superAdminApi = {
  createAdmin: (data) => request("POST", "/auth/create-admin", data, true),
  getAdmins: () => request("GET", "/auth/admins", null, true),
};
