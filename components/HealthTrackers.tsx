'use client';
import { useState, useEffect } from 'react';
import { TrendingDown, TrendingUp, Plus } from 'lucide-react';

interface WeeklyEntry {
  date: string;
  weight?: number;
  dose?: number;
}

export default function HealthTrackers() {
  const [weeklyData, setWeeklyData] = useState<WeeklyEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [weight, setWeight] = useState('');
  const [dose, setDose] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('kevins_health_data');
    if (saved) {
      setWeeklyData(JSON.parse(saved));
    } else {
      // Initialize with starting values
      const today = new Date();
      setWeeklyData([
        { date: today.toISOString().split('T')[0], weight: 226, dose: 85 }
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kevins_health_data', JSON.stringify(weeklyData));
  }, [weeklyData]);

  const handleAddEntry = () => {
    const newEntry: WeeklyEntry = {
      date: selectedDate,
      weight: weight ? parseFloat(weight) : undefined,
      dose: dose ? parseFloat(dose) : undefined,
    };

    const existingIdx = weeklyData.findIndex(e => e.date === selectedDate);
    if (existingIdx >= 0) {
      const updated = [...weeklyData];
      updated[existingIdx] = { ...updated[existingIdx], ...newEntry };
      setWeeklyData(updated);
    } else {
      setWeeklyData([...weeklyData, newEntry].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }

    setWeight('');
    setDose('');
  };

  const getLatestEntry = () => weeklyData[0] || { weight: 226, dose: 85 };
  const latest = getLatestEntry();
  const previousEntry = weeklyData[1];

  const weightChange = previousEntry && latest.weight && previousEntry.weight
    ? latest.weight - previousEntry.weight
    : null;

  const doseChange = previousEntry && latest.dose && previousEntry.dose
    ? latest.dose - previousEntry.dose
    : null;

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="border-l-4 border-purple-500 pl-4 mb-6">
        <h1 className="font-heading text-2xl text-white">HEALTH TRACKERS</h1>
        <p className="text-purple-400 font-bold text-sm tracking-widest">💊 Weekly Progress</p>
      </div>

      {/* CURRENT STATS CARDS */}
      <div className="grid grid-cols-2 gap-3">
        {/* WEIGHT CARD */}
        <div className="bg-[#0f172a] border border-purple-600/30 rounded p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Current Weight</span>
            {weightChange !== null && (
              <div className={`flex items-center gap-1 text-xs ${weightChange <= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {weightChange <= 0 ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
                {Math.abs(weightChange).toFixed(1)} lbs
              </div>
            )}
          </div>
          <div className="text-2xl font-bold text-white">{latest.weight || 226} <span className="text-lg text-gray-400">lbs</span></div>
          <div className="text-[10px] text-gray-500 mt-1">Starting: 226 lbs</div>
        </div>

        {/* PHENELZINE DOSE CARD */}
        <div className="bg-[#0f172a] border border-green-600/30 rounded p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Current Dose</span>
            {doseChange !== null && (
              <div className={`flex items-center gap-1 text-xs ${doseChange === 0 ? 'text-gray-400' : doseChange > 0 ? 'text-blue-400' : 'text-orange-400'}`}>
                {doseChange > 0 ? <TrendingUp size={12} /> : doseChange < 0 ? <TrendingDown size={12} /> : '→'}
                {doseChange !== 0 && Math.abs(doseChange).toFixed(1)} mg
              </div>
            )}
          </div>
          <div className="text-2xl font-bold text-white">{latest.dose || 85} <span className="text-lg text-gray-400">mg</span></div>
          <div className="text-[10px] text-gray-500 mt-1">Starting: 85 mg</div>
        </div>
      </div>

      {/* ADD ENTRY FORM */}
      <div className="bg-[#1a1a1a] border border-gray-700 rounded p-4">
        <h3 className="text-sm font-bold text-[#d4af37] mb-3">Log Weekly Entry</h3>
        
        <div className="mb-3">
          <label className="text-xs text-gray-400">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 rounded bg-black/30 text-white text-sm border border-gray-600 focus:border-purple-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <label className="text-xs text-gray-400">Weight (lbs)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="226"
              step="0.1"
              className="w-full p-2 rounded bg-black/30 text-white text-sm border border-gray-600 focus:border-purple-500 outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400">Dose (mg)</label>
            <input
              type="number"
              value={dose}
              onChange={(e) => setDose(e.target.value)}
              placeholder="85"
              step="1"
              className="w-full p-2 rounded bg-black/30 text-white text-sm border border-gray-600 focus:border-purple-500 outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleAddEntry}
          className="w-full py-2 bg-purple-700 hover:bg-purple-600 text-white font-bold rounded transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={16} /> Add Entry
        </button>
      </div>

      {/* HISTORY */}
      <div>
        <h3 className="text-sm font-bold text-[#d4af37] mb-3">History</h3>
        <div className="space-y-2">
          {weeklyData.map((entry, idx) => (
            <div key={idx} className="bg-[#1a1a1a] border border-gray-700 rounded p-3 text-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-gray-300 font-mono">{new Date(entry.date).toLocaleDateString()}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {entry.weight && <span>⚖️ {entry.weight} lbs</span>}
                    {entry.weight && entry.dose && <span className="mx-2">•</span>}
                    {entry.dose && <span>💊 {entry.dose} mg</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
