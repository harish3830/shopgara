import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const res = await register(form);

    // ❌ If backend returned an error
    if (res?.message && !res?._id) {
      setError(res.message);
      return;
    }

    // -------------------------
    // ✔ Vendor registration
    // -------------------------
    if (form.role === "vendor") {
      setMessage("Vendor request submitted. Wait for admin approval.");
      return;
    }

    // -------------------------
    // ✔ Customer registration (auto login)
    // -------------------------
    setMessage("Account created successfully! Redirecting...");

    // Save token
    if (res.token) {
      localStorage.setItem("token", res.token);
    }

    setTimeout(() => {
      navigate("/products");
    }, 1200);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">

      <form
        onSubmit={submit}
        className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md space-y-5"
      >
        <h1 className="text-3xl font-bold text-center">Register</h1>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded border border-green-300">
            {message}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded border border-red-300">
            {error}
          </div>
        )}

        <input
          name="name"
          placeholder="Name"
          className="w-full border p-3 rounded"
          onChange={change}
          required
        />

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

        {/* ROLE SELECTION */}
        <select
          name="role"
          className="w-full border p-3 rounded bg-white"
          onChange={change}
        >
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
        </select>

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
