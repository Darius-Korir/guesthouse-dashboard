import { useState, useEffect } from 'react';
import Header from './components/Header';
import MetricCards from './components/MetricCards';
import RegistrationForm from './components/RegistrationForm';
import RegistryTable from './components/RegistryTable';

// --- 1. INITIAL DATA SETUP ---
const INITIAL_RESOURCES = [
  { id: 'rm-000', name: 'Executive Board Room', type: 'Room', status: 'Occupied' },
  { id: 'rm-001', name: 'Main Conference Room', type: 'Room', status: 'Available' },
  { id: 'rm-002', name: 'Counseling Suite A', type: 'Room', status: 'Occupied' },
  { id: 'rm-100', name: 'ICT Computer Lab', type: 'Room', status: 'Available' },
  { id: 'rm-101', name: 'Conference Room A', type: 'Room', status: 'Available' },
  { id: 'rm-102', name: 'Counseling Suite B', type: 'Room', status: 'Occupied' },
  { id: 'dsk-01', name: 'Hot Desk 01', type: 'Desk', status: 'Available' },
  { id: 'dsk-02', name: 'Hot Desk 02', type: 'Desk', status: 'Occupied' },
  { id: 'dsk-03', name: 'Hot Desk 03', type: 'Desk', status: 'Available' },
];

const DEFAULT_GUESTS = [
  { id: 'g-8821', name: 'Darius Korir', purpose: 'Community Counseling Session', resourceId: 'rm-102', checkInTime: '2026-10-30T09:00:00.000Z', status: 'Active' },
  { id: 'g-8822', name: 'John Kiprop', purpose: 'ICT Computer Lab Access', resourceId: 'dsk-02', checkInTime: '2026-10-30T10:15:00.000Z', status: 'Active' },
];

export default function App() {
  // --- LOAD INITIAL DATA FROM LOCAL STORAGE OR USE DEFAULTS ---
  const [guests, setGuests] = useState(() => {
    const saved = localStorage.getItem('peniel_dashboard_guests');
    return saved ? JSON.parse(saved) : DEFAULT_GUESTS;
  });

  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem('peniel_dashboard_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });
  // --- 3. FILTER STATES ---
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // --- PERSIST TO LOCAL STORAGE ON STATE CHANGE ---
  useEffect(() => {
    localStorage.setItem('peniel_dashboard_guests', JSON.stringify(guests));
  }, [guests]);

  useEffect(() => {
    localStorage.setItem('peniel_dashboard_resources', JSON.stringify(resources));
  }, [resources]);

  const handleCheckIn = (newGuestData) => {
    const newGuest = {
      id: `g-${Math.floor(1000 + Math.random() * 9000)}`,
      ...newGuestData,
      checkInTime: new Date().toISOString(),
      status: 'Active'
    };
    setGuests(prev => [newGuest, ...prev]);
    setResources(prev => prev.map(res => res.id === newGuest.resourceId ? { ...res, status: 'Occupied' } : res));
  };

  const handleCheckOut = (guestId, resourceId) => {
    setGuests(prev => prev.map(g => g.id === guestId ? { ...g, status: 'Checked Out' } : g));
    setResources(prev => prev.map(r => r.id === resourceId ? { ...r, status: 'Available' } : r));
  };
    const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to permanently clear all guest logs? This will reset the workspace data.')) {
      // Clear specific items out of Local Storage
      localStorage.removeItem('community_dashboard_guests');
      localStorage.removeItem('community_dashboard_resources');
      
      // Reset component states back to default layouts
      setGuests(DEFAULT_GUESTS);
      setResources(INITIAL_RESOURCES);
    }
  };


  // --- 6. DERIVED COMPUTED FILTERS ---
  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          guest.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || guest.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
              {/* Filter Bar Controls & System Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-slate-50/50 p-3 rounded-xl border border-slate-100">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:max-w-xs border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full sm:w-40 border border-gray-300 rounded-lg p-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active Only</option>
                  <option value="Checked Out">Checked Out</option>
                </select>
              </div>

              {/* System Reset Button Action */}
              <button
                type="button"
                onClick={handleClearLogs}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-600 shadow-sm transition-all hover:bg-red-50 active:bg-red-100"
              >
                🗑️ Clear Logs
              </button>
            </div>



  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <Header />
        
        <MetricCards 
          activeCount={guests.filter(g => g.status === 'Active').length} 
          availableCount={resources.filter(r => r.status === 'Available').length} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RegistrationForm resources={resources} onCheckIn={handleCheckIn} />
          
          <div className="lg:col-span-2 bg-white border border-gray-200 p-5 rounded-xl shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:max-w-xs border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-40 border border-gray-300 rounded-lg p-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active Only</option>
                <option value="Checked Out">Checked Out</option>
              </select>
            </div>

            <RegistryTable 
              filteredGuests={filteredGuests} 
              resources={resources} 
              onCheckOut={handleCheckOut} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}