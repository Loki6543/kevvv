import type { Metadata } from "next";
import { Inter, Cinzel, MedievalSharp } from "next/font/google"; 
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const heading = Cinzel({ subsets: ["latin"], variable: "--font-heading" });
const fantasy = MedievalSharp({ weight: "400", subsets: ["latin"], variable: "--font-fantasy" });

export const metadata: Metadata = {
  title: "Stella | Lvl 60 Adaptive Strategist",
  description: "Main Character HUD",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${heading.variable} ${fantasy.variable} bg-[#050b14] text-[#f8fafc] overflow-hidden select-none`}>
        <div className="h-dvh w-full flex flex-col relative bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]">
          
          <main className="flex-1 overflow-y-auto pb-32 scrollbar-hide">
            {children}
          </main>

          <div className="pointer-events-none fixed inset-0 z-50">
            <div className="absolute top-4 left-4 pointer-events-auto flex gap-3 items-center">
              <div className="w-16 h-16 rounded-full border-2 border-[#d4af37] bg-blue-900 shadow-[0_0_15px_#3b82f6] flex items-center justify-center overflow-hidden relative">
                 <span className="text-2xl">👩‍🎤</span>
                 <div className="absolute bottom-0 w-full text-[10px] bg-black/80 text-center text-[#d4af37]">60</div>
              </div>
              
              <div className="flex flex-col gap-1 w-40">
                <div className="text-xs font-bold text-[#d4af37] font-heading tracking-widest text-shadow-sm">STELLA (ENTP)</div>
                <div className="h-4 w-full bg-gray-900 border border-gray-600 rounded relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-600 to-green-400 w-[96%]"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold drop-shadow-md">HP 96%</span>
                </div>
                <div className="h-4 w-full bg-gray-900 border border-gray-600 rounded relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-blue-400 w-[93%]"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold drop-shadow-md">MP 93%</span>
                </div>
              </div>
            </div>

            <div className="absolute top-4 right-4 flex gap-2 pointer-events-auto">
               <div className="w-8 h-8 rounded border border-gray-500 bg-gray-800 flex items-center justify-center text-xs" title="Buff: Kevin's Shield">🛡️</div>
               <div className="w-8 h-8 rounded border border-gray-500 bg-gray-800 flex items-center justify-center text-xs" title="Buff: Wohngeld Booster">💰</div>
            </div>
          </div>

        </div>
      </body>
    </html>
  );
}