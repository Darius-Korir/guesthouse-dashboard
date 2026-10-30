
export default function MetricCards({ activeCount, availableCount }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm flex justify-between items-center transition-all hover:shadow-md">
        <div>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider text-xs">
            Active Guest Logs
          </p>
          <h3 className="text-3xl font-bold mt-1 text-slate-800">{activeCount}</h3>
        </div>
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl text-xl font-bold select-none">
          👤
        </div>
      </div>
      
      <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm flex justify-between items-center transition-all hover:shadow-md">
        <div>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider text-xs">
            Available Spaces
          </p>
          <h3 className="text-3xl font-bold mt-1 text-slate-800">{availableCount}</h3>
        </div>
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl text-xl font-bold select-none">
          🏢
        </div>
      </div>
    </section>
  );
}
