import { useContext, useEffect, useState } from "react";
import SidebarVendor from "../../components/SidebarVendor";
import { AuthContext } from "../../context/AuthContext";
import { vendorApi } from "../../utils/api"; // IMPORTANT FIX

export default function VendorOrders() {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("pending");

  // Correct backend status flow
  const statusFlow = [
    "assignedtovendor",
    "accepted",
    "packed",
    "shipped",
    "delivered",
  ];

  useEffect(() => {
    loadOrders();
  }, []);

  // ---------------- FETCH ORDERS ----------------
  const loadOrders = async () => {
    const res = await vendorApi.myOrders();

    if (!Array.isArray(res)) {
      console.error("Invalid response:", res);
      setOrders([]);
      return;
    }

    setOrders(res);
  };

  // ---------------- UPDATE STATUS ----------------
  const updateStatus = async (orderId, newStatus) => {
    const res = await vendorApi.updateOrderStatus(orderId, newStatus);

    if (res?.message) {
      setMessage(res.message);
    } else {
      setMessage(`Order updated to ${newStatus}`);
    }

    loadOrders();
  };

  // Determine next status based on backend flow
  const getNextStatus = (currentStatus) => {
    const normalized = currentStatus.toLowerCase();
    const index = statusFlow.indexOf(normalized);
    return statusFlow[index + 1] || null;
  };

  // ----------------- FILTER ORDERS -----------------
  const filteredOrders = Array.isArray(orders)
    ? orders.filter((o) => {
        if (filter === "pending") {
          return o.status.toLowerCase() !== "delivered";
        }
        if (filter === "completed") {
          return o.status.toLowerCase() === "delivered";
        }
        return true;
      })
    : [];

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* SIDEBAR */}
      <SidebarVendor />

      {/* CONTENT */}
      <div className="flex-1 p-10 space-y-8">

        <h1 className="text-3xl font-semibold">Orders Assigned to You</h1>
        <p className="text-gray-600">Process and update order statuses.</p>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="bg-green-100 border border-green-300 p-3 rounded text-green-700">
            {message}
          </div>
        )}

        {/* DROPDOWN FILTER */}
        <div className="flex justify-end mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded-lg shadow-sm bg-white"
          >
            <option value="pending">Pending / Upcoming</option>
            <option value="completed">Completed Orders</option>
          </select>
        </div>

        {/* ORDER TABLE */}
        <div className="bg-white rounded-xl shadow p-6">
          {filteredOrders.length === 0 ? (
            <p className="text-gray-500">No orders found.</p>
          ) : (
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">Order ID</th>
                  <th className="p-3 border">Items</th>
                  <th className="p-3 border">Amount</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Next Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((o) => (
                  <tr key={o._id} className="border">
                    
                    {/* ORDER ID */}
                    <td className="p-3 border">{o._id}</td>

                    {/* ITEMS */}
                    <td className="p-3 border">
                      {o.items.map((i, index) => (
                        <div key={index}>
                          {i.name} × {i.qty}
                        </div>
                      ))}
                    </td>

                    {/* AMOUNT */}
                    <td className="p-3 border">₹{o.totalAmount}</td>

                    {/* STATUS */}
                    <td className="p-3 border capitalize font-medium text-blue-700">
                      {o.status.replace(/([A-Z])/g, " $1")}
                    </td>

                    {/* ACTION BUTTONS */}
                    <td className="p-3 border">

                      {/* AssignedToVendor → Accept / Reject */}
                      {o.status.toLowerCase() === "assignedtovendor" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateStatus(o._id, "accepted")}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Accept
                          </button>

                          <button
                            onClick={() => updateStatus(o._id, "rejected")}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {/* Rejected */}
                      {o.status.toLowerCase() === "rejected" && (
                        <span className="text-red-600 font-semibold">Rejected</span>
                      )}

                      {/* NORMAL PROGRESSION */}
                      {o.status.toLowerCase() !== "assignedtovendor" &&
                        o.status.toLowerCase() !== "rejected" &&
                        getNextStatus(o.status) && (
                          <button
                            onClick={() =>
                              updateStatus(o._id, getNextStatus(o.status))
                            }
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Mark as {getNextStatus(o.status)}
                          </button>
                        )}

                      {/* COMPLETED */}
                      {!getNextStatus(o.status) &&
                        o.status.toLowerCase() !== "assignedtovendor" &&
                        o.status.toLowerCase() !== "rejected" && (
                          <span className="text-green-600 font-semibold">
                            Completed
                          </span>
                        )}

                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </div>

      </div>
    </div>
  );
}
