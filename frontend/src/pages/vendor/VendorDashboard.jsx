import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import SidebarVendor from "../../components/SidebarVendor";
import { productApi, vendorApi } from "../../utils/api";

export default function VendorDashboard() {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [stats, setStats] = useState({
    totalProducts: 0,
    itemsSold: 0,
    revenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const myProducts = await productApi.myProducts();
    const vendorOrders = await vendorApi.myOrders();

    setProducts(myProducts || []);
    setOrders(vendorOrders || []);

    const soldItems = vendorOrders?.reduce(
      (sum, o) => sum + (o.items?.reduce((a, b) => a + (b.qty || 0), 0) || 0),
      0
    );

    const revenue = vendorOrders?.reduce(
      (sum, o) => sum + (o.totalAmount || 0),
      0
    );

    const pendingOrders = vendorOrders?.filter(
      (o) => o.status !== "delivered" && o.status !== "rejected"
    ).length;

    const completedOrders = vendorOrders?.filter(
      (o) => o.status === "delivered"
    ).length;

    setStats({
      totalProducts: myProducts?.length || 0,
      itemsSold: soldItems,
      revenue,
      pendingOrders,
      completedOrders,
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarVendor />

      <div className="flex-1 p-8 space-y-10">
        <div>
          <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard title="Total Products" value={stats.totalProducts} color="blue" />
          <DashboardCard title="Items Sold" value={stats.itemsSold} color="green" />
          <DashboardCard title="Total Revenue" value={`₹${stats.revenue}`} color="purple" />
          <DashboardCard title="Pending Orders" value={stats.pendingOrders} color="yellow" />
        </div>

        {stats.totalProducts >= 10 && (
          <div className="bg-red-100 text-red-700 p-4 rounded-xl border border-red-300">
            <strong>Product limit reached:</strong> You can only add up to 10 products.
          </div>
        )}

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

          {orders.length === 0 ? (
            <p className="text-gray-500">No orders assigned yet.</p>
          ) : (
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">Order ID</th>
                  <th className="p-3 border">Items</th>
                  <th className="p-3 border">Amount</th>
                  <th className="p-3 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id}>
                    <td className="p-3 border">{order._id}</td>
                    <td className="p-3 border">{order.items.length}</td>
                    <td className="p-3 border">₹{order.totalAmount}</td>
                    <td className="p-3 border capitalize">
                      <span
                        className={
                          order.status === "rejected"
                            ? "text-red-600 font-semibold"
                            : order.status === "delivered"
                            ? "text-green-600 font-semibold"
                            : "text-blue-600"
                        }
                      >
                        {order.status}
                      </span>
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

function DashboardCard({ title, value, color }) {
  const theme = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
    yellow: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="bg-white shadow p-6 rounded-xl">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className={`text-3xl font-bold mt-2 ${theme[color]}`}>{value}</h2>
    </div>
  );
}
