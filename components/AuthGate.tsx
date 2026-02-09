"use client";
import React, { useEffect, useState } from "react";

async function sha256(message: string) {
  const enc = new TextEncoder();
  const data = enc.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function isStandaloneMode() {
  if (typeof window === "undefined") return false;
  // iOS
  // @ts-ignore
  if ((window as any).navigator && (window as any).navigator.standalone) return true;
  // modern
  return window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
}

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [hasPasscode, setHasPasscode] = useState<boolean | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [permanentOnline, setPermanentOnline] = useState(false);
  const [setupA, setSetupA] = useState("");
  const [setupB, setSetupB] = useState("");
  const [login, setLogin] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const h = localStorage.getItem("stella_passcode_hash");
      const po = localStorage.getItem("stella_permanent_online");
      setHasPasscode(!!h);
      setPermanentOnline(po === "1");
      if (po === "1") setLoggedIn(true);
    } catch (e) {
      setHasPasscode(false);
    }
  }, []);

  useEffect(() => {
    if (!loggedIn) return;
    // If running as PWA/installed, mark permanent online
    if (isStandaloneMode()) {
      try {
        localStorage.setItem("stella_permanent_online", "1");
        setPermanentOnline(true);
      } catch (e) {}
    }
  }, [loggedIn]);

  const handleSetup = async () => {
    setError("");
    if (!/^[0-9]{4}$/.test(setupA)) {
      setError("Passcode must be exactly 4 digits.");
      return;
    }
    if (setupA !== setupB) {
      setError("Passcodes do not match.");
      return;
    }
    const h = await sha256(setupA);
    localStorage.setItem("stella_passcode_hash", h);
    localStorage.setItem("stella_logged_in", "1");
    setHasPasscode(true);
    setLoggedIn(true);
  };

  const handleLogin = async () => {
    setError("");
    const stored = localStorage.getItem("stella_passcode_hash");
    if (!stored) {
      setError("No passcode set. Please create one.");
      setHasPasscode(false);
      return;
    }
    if (!/^[0-9]{4}$/.test(login)) {
      setError("Enter a 4-digit passcode.");
      return;
    }
    const h = await sha256(login);
    if (h === stored) {
      localStorage.setItem("stella_logged_in", "1");
      setLoggedIn(true);
    } else {
      setError("Incorrect passcode.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("stella_logged_in");
    setLoggedIn(false);
    // keep passcode for reuse; permanentOnline remains if set
  };

  // If permanently online, bypass UI and show children
  if (permanentOnline && loggedIn) return <>{children}</>;

  if (hasPasscode === null) return null;

  if (!hasPasscode) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#050b14] text-white">
        <div className="w-full max-w-md bg-[#0f172a] border border-[#333] rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3 text-[#d4af37]">Create 4-digit passcode</h2>
          <p className="text-sm text-gray-300 mb-4">For Kevin or Stella: choose a simple 4-digit PIN used to unlock the app.</p>
          <input value={setupA} onChange={(e) => setSetupA(e.target.value)} maxLength={4} inputMode="numeric" placeholder="Enter 4 digits" className="w-full mb-2 p-2 rounded bg-black/20" />
          <input value={setupB} onChange={(e) => setSetupB(e.target.value)} maxLength={4} inputMode="numeric" placeholder="Confirm passcode" className="w-full mb-3 p-2 rounded bg-black/20" />
          {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
          <div className="flex gap-2">
            <button onClick={handleSetup} className="flex-1 py-2 bg-green-700 rounded">Set passcode</button>
          </div>
          <p className="text-xs text-gray-400 mt-3">After installing to Home Screen, the app will remember your login and keep you "permanently online".</p>
        </div>
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#050b14] text-white">
        <div className="w-full max-w-sm bg-[#0f172a] border border-[#333] rounded-lg p-6">
          <h2 className="text-lg font-bold mb-2 text-[#d4af37]">Enter Passcode</h2>
          <input value={login} onChange={(e) => setLogin(e.target.value)} maxLength={4} inputMode="numeric" placeholder="4-digit passcode" className="w-full mb-3 p-2 rounded bg-black/20" />
          {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
          <div className="flex gap-2">
            <button onClick={handleLogin} className="flex-1 py-2 bg-blue-700 rounded">Unlock</button>
          </div>
          <button onClick={() => { localStorage.removeItem("stella_passcode_hash"); setHasPasscode(false); }} className="mt-3 text-xs text-gray-400 underline">Reset passcode</button>
        </div>
      </div>
    );
  }

  // loggedIn but not permanent
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">{children}</div>
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-black/60 text-white p-2 rounded shadow">
          <div className="flex items-center gap-2">
            <span className="text-sm">Online</span>
            <button onClick={handleLogout} className="text-xs text-gray-200 underline">Logout</button>
          </div>
          <div className="text-xs text-gray-300 mt-1">Tip: Add to Home Screen to stay permanently online.</div>
        </div>
      </div>
    </div>
  );
}
