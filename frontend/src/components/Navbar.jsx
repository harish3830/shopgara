import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const nav =
    "text-gray-700 hover:text-black transition font-medium tracking-wide relative group";
  const active = "text-black font-semibold tracking-wide relative group";

  const navClass = ({ isActive }) => (isActive ? active : nav);

  const underline =
    "absolute left-0 bottom-[-2px] h-[2px] w-0 bg-black group-hover:w-full transition-all duration-300";

  return (
    <nav className="bg-white shadow-sm border-b py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        <Link to="/" className="text-3xl font-extrabold tracking-tight text-black">
          Shopgara
        </Link>

        <button
          className="md:hidden text-3xl text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>

        <div
          className={`md:flex items-center gap-8 absolute md:static top-16 left-0 w-full md:w-auto
          bg-white md:bg-transparent shadow-md md:shadow-none py-6 md:py-0
          transition-all duration-300 ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible md:visible md:opacity-100"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mx-auto md:mx-0">

            {/* CUSTOMER */}
            {user && user.role === "customer" && (
              <>
                <NavLink className={navClass} to="/">
                  Home <span className={underline}></span>
                </NavLink>

                <NavLink className={navClass} to="/products">
                  Products <span className={underline}></span>
                </NavLink>

                <NavLink className={navClass} to="/orders">
                  My Orders <span className={underline}></span>
                </NavLink>

                <NavLink className={navClass} to="/cart">
                  Cart <span className={underline}></span>
                </NavLink>
              </>
            )}

            {/* VENDOR */}
            {user && user.role === "vendor" && (
              <>
                <NavLink className={navClass} to="/vendor/dashboard">
                  Dashboard <span className={underline}></span>
                </NavLink>

                <NavLink className={navClass} to="/vendor/add-product">
                  Add Product <span className={underline}></span>
                </NavLink>

                <NavLink className={navClass} to="/vendor/products">
                  Products <span className={underline}></span>
                </NavLink>

                <NavLink className={navClass} to="/vendor/orders">
                  Orders <span className={underline}></span>
                </NavLink>
              </>
            )}

            {/* ADMIN */}
            {user && user.role === "admin" && (
              <>
                <NavLink className={navClass} to="/admin/dashboard">
                  Dashboard <span className={underline}></span>
                </NavLink>

                <NavLink className={navClass} to="/admin/vendor-requests">
                  Requests <span className={underline}></span>
                </NavLink>

                <NavLink className={navClass} to="/admin/vendors">
                  Vendors <span className={underline}></span>
                </NavLink>

                <NavLink className={navClass} to="/admin/pending-orders">
                  Orders <span className={underline}></span>
                </NavLink>
              </>
            )}

            {/* GUEST */}
            {!user && (
              <>
                <NavLink className={navClass} to="/login">
                  Login <span className={underline}></span>
                </NavLink>

                <NavLink className={navClass} to="/register">
                  Register <span className={underline}></span>
                </NavLink>
              </>
            )}

            {/* LOGOUT */}
            {user && (
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-700 font-medium tracking-wide"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
