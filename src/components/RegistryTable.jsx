import { formatTimestamp } from '../utils/timeHelpers';

export default function RegistryTable({ filteredGuests, resources, onCheckOut }) {
  return (
    <div className="overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-semibold text-xs uppercase tracking-wide">
              <th className="py-3.5 px-4">Guest Information</th>
              <th className="py-3.5 px-4">Allocated Space / Timing</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {filteredGuests.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-12 text-slate-400 font-medium">
                  📋 No active tracking logs found.
                </td>
              </tr>
            ) : (
              filteredGuests.map(guest => {
                const space = resources.find(r => r.id === guest.resourceId);
                const isActive = guest.status === 'Active';
                const { timeStr, relativeStr } = formatTimestamp(guest.checkInTime);
                
                return (
                  <tr key={guest.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-600">
                          {guest.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{guest.name}</div>
                          <div className="text-xs text-slate-500 max-w-[200px] truncate">{guest.purpose}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="text-slate-600 font-medium flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                        {space?.name ?? 'Unknown resource'}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">In: {timeStr} • <span className="text-blue-600 font-medium">{relativeStr}</span></div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium border ${
                        isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60' : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}>
                        {guest.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      {isActive ? (
                        <button 
                          onClick={() => onCheckOut(guest.id, guest.resourceId)}
                          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 shadow-sm"
                        >
                          Check Out
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400 italic font-normal px-3">Completed</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
