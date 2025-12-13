import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // Call backend via AuthContext → authApi.login()
    const res = await login(form);

    // ❌ Backend returned an error (wrong password / not approved)
    if (!res?.token) {
      setError(res.message || "Login failed");
      return;
    }

    // ✔ Save token
    localStorage.setItem("token", res.token);

    // ✔ Save user
    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: res._id,
        name: res.name,
        email: res.email,
        role: res.role,
        isApproved: res.isApproved,
      })
    );

    // ✔ Role-based redirection
    if (res.role === "admin") navigate("/admin/dashboard");
    else if (res.role === "vendor") navigate("/vendor/dashboard");
    else navigate("/products");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">

      <form
        onSubmit={submit}
        className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md space-y-5"
      >
        <h1 className="text-3xl font-bold text-center">Login</h1>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded border border-red-300">
            {error}
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          onChange={change}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          onChange={change}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
