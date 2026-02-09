export default function StellasPlane() {
  return (
    <div className="space-y-6 text-[#f8fafc]">
      <div className="text-center mb-6">
        <h1 className="font-heading text-3xl text-[#d4af37] text-shadow">STELLA'S THRONE ROOM</h1>
        <p className="font-fantasy text-[#60a5fa] text-lg">Level 60 Adaptive Strategist</p>
      </div>
      <div className="bg-[#0f172a] border border-[#333] rounded-lg p-4 shadow-xl">
        <h2 className="font-bold text-[#d4af37] border-b border-[#333] pb-2 mb-4 flex justify-between">
          <span>CORE ATTRIBUTES</span>
          <span className="text-xs text-gray-500">ENTP 8w7</span>
        </h2>
        <div className="space-y-3">
          <StatRow label="Adaptability" val={96} color="bg-blue-600" />
          <StatRow label="Resilience" val={95} color="bg-blue-500" />
          <StatRow label="Strategy" val={93} color="bg-blue-400" />
        </div>
      </div>
      <div className="bg-[#0f172a] border border-[#fbbf24] border-opacity-30 rounded-lg p-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-10 text-6xl">🛡️</div>
        <h2 className="font-bold text-[#fbbf24] border-b border-[#333] pb-2 mb-4">PARTY MEMBER: KEVIN</h2>
        <p className="text-sm text-gray-400 mb-4">Class: ISFJ (Protector) <br/> Role: Logistics & Defense</p>
        <div className="p-3 bg-black/30 rounded border border-[#fbbf24]/20">
          <strong className="text-[#fbbf24] text-xs uppercase">Active Quest:</strong>
          <div className="text-sm">Incoming Reinforcement (Feb 11-24)</div>
        </div>
      </div>
    </div>
  );
}
function StatRow({ label, val, color }: any) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-24 font-bold text-gray-400">{label}</span>
      <div className="flex-1 h-3 bg-gray-900 rounded-full overflow-hidden border border-gray-700"><div className={`${color} h-full`} style={{ width: `${val}%` }}></div></div>
      <span className="w-8 text-right">{val}</span>
    </div>
  );
}