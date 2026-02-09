export default function CouplesDashboard() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="font-heading text-2xl text-[#d4af37]">GUILD HALL</h1>
        <p className="text-xs text-gray-400">Shared Instance: Stella & Kevin</p>
      </div>
      <div className="bg-[#1e1e1e] border-2 border-[#444] rounded p-1">
        <div className="bg-[#0f0f0f] p-3 rounded border border-[#222] flex justify-between items-center">
          <span className="text-gray-400 font-bold text-sm">GUILD FUNDS</span>
          <span className="text-yellow-500 font-mono">
            25<span className="text-[#d4af37]">g</span> 40<span className="text-gray-400">s</span> 00<span className="text-orange-700">c</span>
          </span>
        </div>
      </div>
      <div className="bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] bg-[#e3d5b8] text-black p-4 rounded shadow-inner border-2 border-[#5c4033]">
        <h3 className="font-heading font-bold border-b border-black/20 pb-1 mb-2">Active Quests</h3>
        <ul className="list-disc pl-4 text-sm space-y-2">
          <li><strong>The Pivot (Main Quest)</strong><p className="text-xs opacity-80">Leverage support to flip script on NPC Ex.</p></li>
          <li><strong>Housing Hunt (Daily)</strong><p className="text-xs opacity-80">Check ImmoScout for Petershausen listings.</p></li>
        </ul>
      </div>
      <button className="w-full py-3 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded border-2 border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]">INITIATE DATA SYNC</button>
    </div>
  );
}