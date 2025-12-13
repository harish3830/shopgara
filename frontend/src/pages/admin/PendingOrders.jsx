import { useState, useEffect } from "react";
import SidebarAdmin from "../../components/SidebarAdmin";
import { adminApi } from "../../utils/api"; 

export default function PendingOrders() {
  const [orders, setOrders] = useState([]);
  const [vendors, setVendors] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    const pendingOrders = await adminApi.pendingOrders();
    const vendorList = await adminApi.allVendors();

    setOrders(pendingOrders || []);
    setVendors(vendorList || []);

    setLoading(false);
  };

  /* ------------------ MODAL ACTIONS ------------------ */
  const openModal = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setSelectedVendor("");
  };

  /* ------------------ ASSIGN ORDER TO VENDOR ------------------ */
  const assignOrder = async () => {
    if (!selectedVendor) return;

    await adminApi.assignOrder(selectedOrder._id, selectedVendor);

    await loadData(); // refresh updated orders
    closeModal();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />

      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold mb-6">Pending Orders</h1>

        {/* LOADING STATE */}
        {loading && <p className="text-gray-600">Loading pending orders...</p>}

        {/* EMPTY STATE */}
        {!loading && orders.length === 0 && (
          <p className="text-gray-500">No pending orders.</p>
        )}

        {/* LIST ORDERS */}
        {!loading && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((o) => (
              <div
                key={o._id}
                className="bg-white shadow p-5 rounded-xl flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold">Order #{o._id}</h2>
                  <p className="text-gray-600">
                    Items: {o.items.length} • Amount: ₹{o.amount}
                  </p>
                </div>

                <button
                  onClick={() => openModal(o)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Assign Vendor
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ------------------ ASSIGN MODAL ------------------ */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md animate-fadeIn">

              <h2 className="text-xl font-semibold mb-3">
                Assign Vendor for Order #{selectedOrder._id}
              </h2>

              <select
                className="border p-3 rounded w-full mb-4 bg-white"
                value={selectedVendor}
                onChange={(e) => setSelectedVendor(e.target.value)}
              >
                <option value="">Select Vendor</option>

                {vendors.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.name} ({v.email})
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={assignOrder}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Assign
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
