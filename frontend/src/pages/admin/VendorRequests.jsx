import { useState, useEffect } from "react";
import SidebarAdmin from "../../components/SidebarAdmin";
import { adminApi } from "../../utils/api"; // <-- real backend API

export default function VendorRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ------------------ LOAD REQUESTS ------------------ */
  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    const res = await adminApi.getVendorRequests();
    setRequests(res || []);
    setLoading(false);
  };

  /* ------------------ APPROVE ------------------ */
  const approve = async (id) => {
    await adminApi.approveVendor(id);
    loadRequests();
  };

  /* ------------------ REJECT ------------------ */
  const reject = async (id) => {
    await adminApi.rejectVendor(id);
    loadRequests();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />

      <div className="flex-1 p-10 space-y-6">

        <h1 className="text-3xl font-bold">Vendor Approval Requests</h1>

        {/* LOADING STATE */}
        {loading && <p className="text-gray-600">Loading vendor requests...</p>}

        {/* EMPTY */}
        {!loading && requests.length === 0 && (
          <p className="text-gray-600">No vendor requests pending.</p>
        )}

        {/* REQUEST LIST */}
        {!loading && requests.length > 0 && (
          <div className="space-y-4">
            {requests.map((r) => (
              <div
                key={r._id}
                className="bg-white shadow p-4 rounded-xl flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-sm text-gray-600">{r.email}</p>
                </div>

                <div className="space-x-3">
                  <button
                    onClick={() => approve(r._id)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => reject(r._id)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
