import { useState } from 'react';

export default function RegistrationForm({ resources, onCheckIn }) {
  const [formInput, setFormInput] = useState({ name: '', purpose: '', resourceId: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formInput.name.trim() || !formInput.purpose.trim() || !formInput.resourceId) {
      alert('Please fill out all fields before registering.');
      return;
    }

    onCheckIn({
      name: formInput.name.trim(),
      purpose: formInput.purpose.trim(),
      resourceId: formInput.resourceId,
    });

    setFormInput({ name: '', purpose: '', resourceId: '' });
  };

  return (
    <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm h-fit">
      <h2 className="text-xl font-bold text-slate-800 mb-4 tracking-tight">
        New Guest Registration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formInput.name}
            onChange={handleInputChange}
            placeholder="e.g. Jane Doe"
            className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Purpose of Access
          </label>
          <textarea
            name="purpose"
            value={formInput.purpose}
            onChange={handleInputChange}
            placeholder="e.g. ICT Computer Lab Access"
            className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none h-20 resize-none transition-all"
          />
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Assign Resource
          </label>
          <select
            name="resourceId"
            value={formInput.resourceId}
            onChange={handleInputChange}
            className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-slate-700"
          >
            <option value="">-- Choose Space --</option>
            {resources.map((res) => (
              <option key={res.id} value={res.id} disabled={res.status === 'Occupied'}>
                {res.name} ({res.status})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2.5 rounded-lg transition-colors shadow-sm mt-2 text-sm"
        >
          Register Here
        </button>
      </form>
    </div>
  );
}
