'use client';
import { useState } from 'react';
import { Sword, BookOpen, Users, Map, Settings } from 'lucide-react';
import { clsx } from 'clsx';

import AuthGate from '@/components/AuthGate';

import StellasPlane from '@/components/StellasPlane';
import HousingStrategy from '@/components/HousingStrategy';
import CouplesDashboard from '@/components/CouplesDashboard';

type ViewState = 'CHARACTER' | 'SPELLBOOK' | 'SOCIAL' | 'MAP';

function GameWorld() {
  const [activeView, setActiveView] = useState<ViewState>('CHARACTER');

  const renderActionBar = () => {
    switch(activeView) {
      case 'SPELLBOOK': return;
      case 'SOCIAL': return;
      default: 
        return [
          { icon: '💊', label: 'Meds', color: 'bg-green-900' },
          { icon: '🧘‍♀️', label: 'Focus', color: 'bg-blue-900' },
          { icon: '⚔️', label: 'Gym', color: 'bg-red-900' },
          { icon: '📓', label: 'Journal', color: 'bg-gray-800' },
        ];
    }
  };

  return (
    <div className="min-h-full pb-32">
      <div className="p-4 pt-24 animate-in fade-in duration-500">
        {activeView === 'CHARACTER' && <StellasPlane />}
        {activeView === 'SPELLBOOK' && <HousingStrategy />}
        {activeView === 'SOCIAL' && <CouplesDashboard />}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center">
        <div className="w-full max-w-2xl relative bg-[#0f172a]/90 border-t-2 border-[#d4af37] shadow-[0_-5px_20px_rgba(0,0,0,0.8)] pb-safe">
          <div className="flex justify-center gap-3 p-3 -mt-8">
            {renderActionBar()?.map((btn, i) => (
              <button key={i} className={`w-12 h-12 rounded border-2 border-[#888] hover:border-[#fff] shadow-lg flex flex-col items-center justify-center active:scale-95 transition-all ${btn.color}`}>
                <span className="text-xl drop-shadow-md">{btn.icon}</span>
                <span className="text-[9px] font-bold uppercase tracking-tighter text-white/80">{btn.label}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-between px-6 py-2 bg-black/40 backdrop-blur-md">
            <NavIcon active={activeView === 'CHARACTER'} onClick={() => setActiveView('CHARACTER')} icon={<Sword size={18} />} label="Char" />
            <NavIcon active={activeView === 'SPELLBOOK'} onClick={() => setActiveView('SPELLBOOK')} icon={<BookOpen size={18} />} label="Spells" />
            <NavIcon active={activeView === 'SOCIAL'} onClick={() => setActiveView('SOCIAL')} icon={<Users size={18} />} label="Social" />
            <NavIcon active={false} onClick={() => {}} icon={<Map size={18} />} label="Map" />
             <NavIcon active={false} onClick={() => {}} icon={<Settings size={18} />} label="Menu" />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavIcon({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={clsx("flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-all", active && "opacity-100 text-[#d4af37] scale-110")}>
      <div className="p-1 rounded-full border border-white/10 bg-white/5">{icon}</div>
    </button>
  );
}

export default function Page() {
  return (
    <AuthGate>
      <GameWorld />
    </AuthGate>
  );
}
