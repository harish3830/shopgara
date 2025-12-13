import { useEffect, useState } from "react";
import { adminApi } from "../../utils/api"; 


export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVendors: 0,
    pendingVendors: 0,
    totalProducts: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const res = await adminApi.summary();
    const pendingorders = await adminApi.pendingOrders()
    const pendingvendors = await adminApi.getVendorRequests()
    console.log(res)

    if (!res) return;

    setStats({
      totalVendors: res.totalVendors,
      pendingVendors: pendingvendors.length,
      totalorder: res.totalOrders,
      pendingOrders: pendingorders.length,
      totalRevenue: res.totalRevenue,
    });
  };

  return (
    <div className="p-8 space-y-8">

      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-600">Platform overview & activity</p>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <DashboardCard
          title="Approved Vendors"
          value={stats.totalVendors}
          color="blue"
        />

        <DashboardCard
          title="Pending Vendor Requests"
          value={stats.pendingVendors}
          color="yellow"
        />

        <DashboardCard
          title="Total Orders"
          value={stats.totalorder}
          color="green"
        />

        <DashboardCard
          title="Pending Customer Orders"
          value={stats.pendingOrders}
          color="red"
        />
      </div>

      {/* REVENUE */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-3">Total Revenue</h2>
        <p className="text-4xl font-bold text-blue-700">
          ₹{stats.totalRevenue}
        </p>
      </div>

      {/* QUICK LINKS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        <QuickLinkCard
          title="Vendor Approval Requests"
          link="/admin/vendor-requests"
          desc="Review and approve pending vendor accounts."
        />
        <QuickLinkCard
          title="Pending Orders"
          link="/admin/pending-orders"
          desc="Assign customer orders to verified vendors."
        />
        <QuickLinkCard
          title="All Vendors"
          link="/admin/vendors"
          desc="See approved vendors & manage access."
        />
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function DashboardCard({ title, value, color }) {
  const bg = {
    blue: "bg-blue-100 text-blue-700",
    red: "bg-red-100 text-red-700",
    yellow: "bg-yellow-100 text-yellow-700",
    green: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white shadow p-6 rounded-xl">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className={`text-3xl font-bold mt-2 ${bg[color]}`}>{value}</h2>
    </div>
  );
}

function QuickLinkCard({ title, desc, link }) {
  return (
    <a
      href={link}
      className="block bg-white shadow p-6 rounded-xl hover:shadow-md transition"
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 text-sm mt-2">{desc}</p>
      <p className="text-blue-600 text-sm font-semibold mt-4">View →</p>
    </a>
  );
}
