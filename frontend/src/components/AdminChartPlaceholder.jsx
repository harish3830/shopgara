export default function AdminChartPlaceholder() {
  return (
    <div className="bg-white shadow rounded-xl p-10 text-center text-gray-600 border border-dashed border-gray-300">
      <h2 className="text-xl font-semibold">Revenue & Orders Chart</h2>

      <p className="mt-3 text-gray-500">
        Chart visualization will appear here once backend analytics are connected.
      </p>

      <p className="text-sm mt-2 text-gray-400">
        (Fetching data from /api/admin/summary)
      </p>
    </div>
  );
}
