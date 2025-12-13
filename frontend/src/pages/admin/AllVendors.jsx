import { useEffect, useState } from "react";
import { adminApi } from "../../utils/api";
import SidebarAdmin from "../../components/SidebarAdmin";

export default function AllVendors() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const res = await adminApi.allVendors();
    setUsers(res || []);
    setLoading(false);
  };

  const removeVendorRole = async (id) => {
    await adminApi.revokeVendor(id);
    loadUsers();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Vendors</h1>

        {loading && <p className="text-gray-600">Loading...</p>}

        {!loading && users.length === 0 && (
          <p className="text-gray-500">No users found.</p>
        )}

        {!loading && users.length > 0 && (
          <table className="w-full border-collapse bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => {
                const isVendor = u.role === "vendor";

                return (
                  <tr key={u._id} className="text-center">
                    <td className="border p-3">{u.name}</td>
                    <td className="border p-3">{u.email}</td>

                    <td
                      className={`border p-3 font-medium ${
                        isVendor
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {isVendor ? "Approved" : "Pending"}
                    </td>

                    <td className="border p-3">
                      {isVendor && (
                        <button
                          onClick={() => removeVendorRole(u._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm"
                        >
                          Remove Vendor
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
