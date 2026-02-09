import { CheckCircle } from 'lucide-react';
export default function HousingStrategy() {
  return (
    <div className="space-y-4">
      <div className="border-l-4 border-[#7434f3] pl-4 mb-6">
        <h1 className="font-heading text-2xl text-white">ASSET ALLOCATION</h1>
        <p className="text-[#7434f3] font-bold text-sm tracking-widest">Q1 2026 STRATEGY</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 bg-[#1a1a1a] border border-[#7434f3] rounded p-4 relative overflow-hidden group hover:bg-[#222] transition-colors cursor-pointer">
          <div className="absolute top-0 right-0 bg-[#7434f3] text-white text-[10px] font-bold px-2 py-1">BLUE CHIP</div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">PET-S2 <span className="text-xs text-gray-500">(Petershausen)</span></h3>
          <div className="flex gap-2 mt-2">
            <Badge text="Fit: 91%" color="bg-green-900 text-green-200" />
            <Badge text="Yield: Med" color="bg-blue-900 text-blue-200" />
          </div>
          <p className="text-xs text-gray-400 mt-2">The "Fortress" Asset. Regional Express redundancy provides critical hedge.</p>
        </div>
        <div className="bg-[#1a1a1a] border border-gray-700 rounded p-3">
          <h3 className="font-bold text-gray-300 text-sm">ALT-S2</h3>
          <p className="text-[10px] text-green-400 mt-1">+ MAX YIELD</p>
          <p className="text-[10px] text-red-400">- HIGH LATENCY</p>
        </div>
        <div className="bg-[#2a1010] border border-red-900 rounded p-3 opacity-70">
          <h3 className="font-bold text-red-500 text-sm">ODE-BUS</h3>
          <p className="text-[10px] text-red-300">TOXIC ASSET</p>
          <p className="text-[10px] text-gray-400">Bus transport failure risk.</p>
        </div>
      </div>
      <div className="bg-white/5 p-4 rounded border border-white/10 mt-4">
        <h4 className="text-[#d4af37] font-bold text-sm mb-2 flex items-center gap-2"><CheckCircle size={14} /> THE WOHNGELD BOOSTER</h4>
        <p className="text-xs leading-relaxed text-gray-300">Targeting Mietstufe IV zones to maximize subsidy caps. <br/><span className="text-green-400">Target Rent: ~€1,150 Warm</span></p>
      </div>
    </div>
  );
}
function Badge({ text, color }: any) {
  return <span className={`px-2 py-0.5 rounded text-[10px] font-bold border border-white/10 ${color}`}>{text}</span>;
}