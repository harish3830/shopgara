import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { orderApi } from "../utils/api";

export default function CustomerOrders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusColors = {
    pendingAdmin: "bg-yellow-100 text-yellow-700 border-yellow-300",
    assignedToVendor: "bg-blue-100 text-blue-700 border-blue-300",
    accepted: "bg-purple-100 text-purple-700 border-purple-300",
    packed: "bg-orange-100 text-orange-700 border-orange-300",
    shipped: "bg-indigo-100 text-indigo-700 border-indigo-300",
    delivered: "bg-green-100 text-green-700 border-green-300",
  };

  useEffect(() => {
    const loadOrders = async () => {
      const res = await orderApi.myOrders();
      setOrders(res || []);
      setLoading(false);
    };
    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center drop-shadow-sm">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-600 text-lg mt-10">
            You have not placed any orders yet.
          </p>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300"
              >
                {/* Order Header */}
                <div className="flex justify-between items-start flex-col md:flex-row">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      Placed on{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Status badge */}
                  <span
                    className={`mt-3 md:mt-0 px-4 py-1 rounded-full text-sm font-medium border ${statusColors[order.status]}`}
                  >
                    {order.status.replace(/([A-Z])/g, " $1")}
                  </span>
                </div>

                {/* Order Items */}
                <div className="mt-5 space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 border-b pb-3"
                    >
                      {/* Product Thumbnail */}
                      <img
                        src={
                          item.product?.imageUrl ||
                          "https://via.placeholder.com/80"
                        }
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg border"
                      />

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Qty: {item.qty}
                        </p>
                      </div>

                      {/* Price */}
                      <p className="font-semibold text-blue-600 text-lg">
                        ₹{item.price}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Total Amount */}
                <div className="mt-4 text-right">
                  <p className="text-xl font-bold text-gray-800">
                    Total: ₹{order.totalAmount}
                  </p>
                </div>

                {/* Vendor Info */}
                {order.vendor && (
                  <p className="text-sm text-gray-500 mt-2">
                    Assigned Vendor:{" "}
                    <span className="font-medium text-gray-700">
                      {order.vendor.name}
                    </span>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
