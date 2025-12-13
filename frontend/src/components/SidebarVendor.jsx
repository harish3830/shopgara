import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function SidebarVendor() {
  const { logout } = useContext(AuthContext);

  const linkClass = ({ isActive }) =>
    isActive
      ? "block px-4 py-3 bg-blue-600 text-white rounded-md"
      : "block px-4 py-3 text-gray-700 hover:bg-blue-100 rounded-md";

  return (
    <aside className="w-64 bg-white border-r shadow-sm p-6 flex flex-col gap-4 min-h-screen">

      <h2 className="text-xl font-bold text-blue-700 mb-4">Vendor Panel</h2>

      <NavLink className={linkClass} to="/vendor/dashboard">
        Dashboard
      </NavLink>

      <NavLink className={linkClass} to="/vendor/add-product">
        Add Product
      </NavLink>

      <NavLink className={linkClass} to="/vendor/products">
        My Products
      </NavLink>

      <NavLink className={linkClass} to="/vendor/orders">
        Orders
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
