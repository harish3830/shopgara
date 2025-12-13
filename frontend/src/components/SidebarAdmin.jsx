import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function SidebarAdmin() {
  const { logout } = useContext(AuthContext);

  const linkClass = ({ isActive }) =>
    isActive
      ? "block px-4 py-3 bg-blue-700 text-white rounded-md"
      : "block px-4 py-3 text-gray-700 hover:bg-blue-100 rounded-md";

  return (
    <aside className="w-64 bg-white border-r shadow-sm p-6 flex flex-col gap-4 min-h-screen">
      <h2 className="text-xl font-bold text-blue-700 mb-4">Admin Panel</h2>

      <NavLink className={linkClass} to="/admin/dashboard">
        Dashboard
      </NavLink>

      <NavLink className={linkClass} to="/admin/vendor-requests">
        Vendor Requests
      </NavLink>

      <NavLink className={linkClass} to="/admin/vendors">
        Vendors
      </NavLink>

      <NavLink className={linkClass} to="/admin/pending-orders">
        Pending Orders
      </NavLink>
      <NavLink className={linkClass} to="/admin/manage-admins">
        Manage Admins
      </NavLink>
      <button
        onClick={logout}
        className="mt-6 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
      >
        Logout
      </button>
    </aside>
  );
}
