import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

/* CUSTOMER PAGES */
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CustomerOrders from "./pages/CustomerOrders";

/* AUTH */
import Login from "./pages/Login";
import Register from "./pages/Register";

/* VENDOR PAGES */
import VendorDashboard from "./pages/vendor/VendorDashboard";
import AddProduct from "./pages/vendor/AddProduct";
import VendorProducts from "./pages/vendor/VendorProducts";
import VendorOrders from "./pages/vendor/VendorOrders";

/* ADMIN PAGES */
import AdminDashboard from "./pages/admin/AdminDashboard";
import VendorRequests from "./pages/admin/VendorRequests";
import PendingOrders from "./pages/admin/PendingOrders";
import AllVendors from "./pages/admin/AllVendors";

/* Super Admin Page   */
import AdminManagement from "./pages/admin/AdminManagement";

export default function Router() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* ------------------------------ */}
        {/*           PUBLIC ROUTES        */}
        {/* ------------------------------ */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />

        {/* CUSTOMER-PROTECTED ROUTES */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute role="customer">
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute role="customer">
              <CustomerOrders />
            </ProtectedRoute>
          }
        />

        {/* ------------------------------ */}
        {/*              AUTH              */}
        {/* ------------------------------ */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ------------------------------ */}
        {/*          VENDOR ROUTES         */}
        {/* ------------------------------ */}

        <Route
          path="/vendor/dashboard"
          element={
            <ProtectedRoute role="vendor">
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-admins"
          element={
            <ProtectedRoute role="admin">
              <AdminManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/add-product"
          element={
            <ProtectedRoute role="vendor">
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/products"
          element={
            <ProtectedRoute role="vendor">
              <VendorProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/orders"
          element={
            <ProtectedRoute role="vendor">
              <VendorOrders />
            </ProtectedRoute>
          }
        />

        {/* ------------------------------ */}
        {/*           ADMIN ROUTES         */}
        {/* ------------------------------ */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/vendor-requests"
          element={
            <ProtectedRoute role="admin">
              <VendorRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/pending-orders"
          element={
            <ProtectedRoute role="admin">
              <PendingOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/vendors"
          element={
            <ProtectedRoute role="admin">
              <AllVendors />
            </ProtectedRoute>
          }
        />

        {/* ------------------------------ */}
        {/*              404               */}
        {/* ------------------------------ */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
