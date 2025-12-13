import { useState, useEffect } from "react";
import { superAdminApi } from "../../utils/api";

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");

  const loadAdmins = async () => {
    const data = await superAdminApi.getAdmins();
    setAdmins(data);
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const res = await superAdminApi.createAdmin(form);
    setMsg(res.message);
    loadAdmins();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Admin</h1>

      {msg && <p className="text-green-600 mb-4">{msg}</p>}

      <form onSubmit={submit} className="space-y-3 max-w-md bg-white p-6 shadow rounded">
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
          Create Admin
        </button>
      </form>

      <h2 className="text-xl font-bold mt-10 mb-4">Admin List</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3">Name</th>
            <th className="border p-3">Email</th>
          </tr>
        </thead>

        <tbody>
          {admins?.map((a) => (
            <tr key={a._id}>
              <td className="border p-3">{a.name}</td>
              <td className="border p-3">{a.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
