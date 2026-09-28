import React, { useState, useEffect } from 'react';
import { Responder } from '../types';
import { soundEffects } from '../utils/audio';

interface RadarViewProps {
  onOpenCall: (responder: Responder) => void;
  onOpenRoute: (responder: Responder) => void;
}

export const RadarView: React.FC<RadarViewProps> = ({ onOpenCall, onOpenRoute }) => {
  const [activeRange, setActiveRange] = useState<'500m' | '1.0 km' | '2.0 km'>('2.0 km');
  const [dispatcherEtaSeconds, setDispatcherEtaSeconds] = useState(300); // 5 mins

  // Responder Mock Data from specs & uploaded images
  const initialResponders: Responder[] = [
    {
      id: 'ayesha',
      name: 'Dr. Ayesha Malik',
      role: 'Certified ER Doctor',
      affiliation: 'General Hospital',
      distance: '350m away',
      distanceMeters: 350,
      eta: '1.8 min',
      badge: 'Verified Farishta',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB63SncXIi6DvB-uF22ufWUC9ewwMKMGjuUBlwcteWFZ3UW7VkxQ7sVR3AVdgvF-VfAZ1CKnryn-NGe9HJr6VABKMaIlkA01BJNP3BEkFdGueZNQkkMAhcYj_NAr9qOEKg_pqhbBz0AGJvAS112dx0LC3xVD17JviwR0liUNwG-WtDEi5_4rnxpiLjlBljpvfGh1g-Zy44rM_HbDXQHAJgd7PMqlXeLuPPSB3i_qSKWBSbCJolg-Fz8',
      equipment: 'Accepting Dispatch',
      status: 'accepting',
      phone: '+92 301 9876543',
      coords: { x: 62, y: 34 },
    },
    {
      id: 'zeeshan',
      name: 'Zeeshan Tariq',
      role: 'Certified Red Crescent First-Aid',
      affiliation: 'CPR Equipped',
      distance: '620m away',
      distanceMeters: 620,
      eta: '3.1 min',
      badge: 'CPR Equipped',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBh6dYWzYXyMuDJM0RaYQ0l26eDM0CBC0Z09XwD9uOPQOE6dWf52TTKOWOP85Rl5seNbFlyQPtAi1Jdwy6znb4mGMDcLFplgStvXDGaLQbRNwEMuWRW7zzrAe13d1sKyAvwWGL6cKnGXRA5d19p4OEXDh6wh18msOF6qHy_HKTVvQgE87wwNRNxxs4XRlz0kVDMx24JKXEEHjlvMlSzz0TZOahuFAJ-3zVNF4Sw2NRt3SwTe8Ikp_rk',
      equipment: 'AED Kit Onboard',
      status: 'en_route',
      phone: '+92 321 4567890',
      coords: { x: 28, y: 65 },
    },
    {
      id: 'hamza',
      name: 'Hamza Bilal',
      role: 'Rescue Scout Volunteer',
      affiliation: 'Bleed Kit',
      distance: '1.1 km away',
      distanceMeters: 1100,
      eta: '4.5 min',
      badge: 'Bleed Kit',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCDdksgl85UuSOpRlLcl2tvu9zmiKMmAsIvg3yI__33L7yR4xZEN1URE4B4Hz3jQLTuJ69IGM1DYVd3X5xz6x3U3vLigpxR-Wa0Mh8UNb8I1XGSVo3tnTh2cq4Z_1J1N2QPSgKz-zHWN_g-0WZyyEetfoIQ_B9Aeq6Yc7Fs7J0vUch4-JZqfaQ4QPTBwr-YG9WZC9jqzqrA6olLLgm5ptMnRFD6phJxXy17jn6VsgUW6xpwu2RniW7Y',
      equipment: 'Tourniquet Verified',
      status: 'en_route',
      phone: '+92 334 8765432',
      coords: { x: 25, y: 20 },
    },
  ];

  // Dynamic ETA countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setDispatcherEtaSeconds((prev) => (prev > 0 ? prev - 1 : 295));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatEta = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  const filteredResponders = initialResponders.filter((r) => {
    if (activeRange === '500m') return r.distanceMeters <= 500;
    if (activeRange === '1.0 km') return r.distanceMeters <= 1000;
    return true; // 2.0 km
  });

  return (
    <div className="flex flex-col w-full pb-28 pt-2 px-4 max-w-xl mx-auto space-y-4 animate-in fade-in duration-300">
      {/* Telemetry Active Header Strip */}
      <div className="w-full rounded-2xl bg-[#1c1f2a] border border-[#262a35] p-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-full bg-[#00a572]/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#4edea3] text-[22px]">radar</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-[#4edea3] uppercase font-bold tracking-wider font-mono-num">
              Telemetry Active
            </span>
            <span className="font-display text-sm font-bold text-white truncate">
              {filteredResponders.length} Matched within {activeRange}
            </span>
          </div>
        </div>
        <div className="text-right shrink-0 pl-2">
          <span className="text-[10px] text-[#dfe2f1]/60 block font-semibold">AVG ARRIVAL</span>
          <span className="font-display text-2xl font-black text-[#00f1fd] font-mono-num">
            2.4<span className="text-xs font-normal text-[#dfe2f1]/60 ml-0.5">m</span>
          </span>
        </div>
      </div>

      {/* Primary Explicit Alert Widget from Prompt */}
      <div className="w-full rounded-2xl bg-gradient-to-r from-[#17252f] via-[#1c2a38] to-[#171b26] border border-[#00f1fd]/50 p-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00f1fd] via-[#4edea3] to-transparent" />
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#00f1fd]/20 text-[#00f1fd] flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(0,241,253,0.4)]">
              <span className="material-symbols-outlined text-[26px] animate-pulse">
                airport_shuttle
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#00f1fd] uppercase tracking-wider">
                  DISPATCH ACTIVE
                </span>
                <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping" />
              </div>
              <h3 className="font-display text-base font-extrabold text-white mt-0.5">
                Farishta Dispatcher is on the way.
              </h3>
              <p className="text-xs text-[#4edea3] font-bold mt-0.5">
                Saving lives by making 1122 faster!
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] text-[#dfe2f1]/60 block uppercase font-bold">ETA</span>
            <span className="font-display text-lg font-black text-[#00f1fd] font-mono-num">
              {formatEta(dispatcherEtaSeconds)}
            </span>
          </div>
        </div>

        {/* Live Status Checkmarks Bar */}
        <div className="mt-3 pt-3 border-t border-[#313540] flex flex-wrap gap-2 text-[11px] font-semibold">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#171b26] border border-[#4edea3]/40 text-[#4edea3]">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            <span>SMS Sent to Emergency Contacts 🟢</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#171b26] border border-[#00f1fd]/40 text-[#00f1fd]">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            <span>Rescue 1122 CAD Unit Dispatched 🟢</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#171b26] border border-[#4edea3]/40 text-[#4edea3]">
            <span className="material-symbols-outlined text-[14px]">cell_tower</span>
            <span>Community Responders Pinged 🟢</span>
          </div>
        </div>
      </div>

      {/* Stylized Dark Radar Map Layout */}
      <div className="relative w-full aspect-square max-h-[360px] rounded-3xl overflow-hidden bg-[#0a0e18] border border-[#313540] shadow-2xl flex items-center justify-center">
        {/* Radial Dark Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,241,253,0.08)_0%,_rgba(10,14,24,0.96)_75%)]" />

        {/* Map Vector Grid & Radar Coordinates */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
          {/* Inner 500m Ring */}
          <circle
            cx="200"
            cy="200"
            r="60"
            stroke="#00f1fd"
            strokeWidth="1"
            strokeDasharray="3 4"
            strokeOpacity="0.25"
          />
          <text x="206" y="145" fill="#00dce6" fontSize="9" fontWeight="600" opacity="0.6">
            500m
          </text>

          {/* 1.0 km Ring */}
          <circle
            cx="200"
            cy="200"
            r="115"
            stroke="#00f1fd"
            strokeWidth="1"
            strokeDasharray="4 5"
            strokeOpacity="0.3"
          />
          <text x="206" y="90" fill="#00dce6" fontSize="9" fontWeight="600" opacity="0.6">
            1.0 km
          </text>

          {/* 2.0 km Ring */}
          <circle cx="200" cy="200" r="170" stroke="#00f1fd" strokeWidth="1.2" strokeOpacity="0.35" />
          <text x="206" y="36" fill="#00dce6" fontSize="9" fontWeight="600" opacity="0.8">
            2.0 km Range
          </text>

          {/* Radar Axis Crosshair */}
          <line x1="200" y1="20" x2="200" y2="380" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.06" />
          <line x1="20" y1="200" x2="380" y2="200" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.06" />

          {/* Sweeping Radar Beam */}
          <g className="origin-center animate-radar" style={{ transformOrigin: '200px 200px' }}>
            <defs>
              <linearGradient id="radarSweepMap" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f1fd" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#00f1fd" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#00f1fd" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 200 200 L 200 30 A 170 170 0 0 1 340 120 Z" fill="url(#radarSweepMap)" />
            <line x1="200" y1="200" x2="340" y2="120" stroke="#00f1fd" strokeWidth="1.5" strokeOpacity="0.85" />
          </g>
        </svg>

        {/* Center: YOU Crash Site Pulsating Node */}
        <div className="absolute z-20 flex flex-col items-center justify-center pointer-events-none">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute h-8 w-8 rounded-full bg-[#ff334b] opacity-50" />
            <div className="w-8 h-8 rounded-full bg-[#ff334b] shadow-[0_0_24px_rgba(255,51,75,0.9)] flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[18px]">
                person_pin_circle
              </span>
            </div>
          </div>
          <span className="mt-1 px-2 py-0.5 rounded-full bg-[#262a35]/95 border border-[#ff334b]/50 text-[#ffb3b5] text-[10px] font-black tracking-tight font-mono-num">
            CRASH LOC
          </span>
        </div>

        {/* Interactive Responder Node 1: Dr. Ayesha */}
        <button
          type="button"
          onClick={() => {
            soundEffects.playHapticClick();
            onOpenCall(initialResponders[0]);
          }}
          className="absolute z-20 top-[34%] left-[62%] group -translate-x-1/2 -translate-y-1/2 cursor-pointer flex flex-col items-center hover:scale-110 transition-transform"
        >
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute h-7 w-7 rounded-full bg-[#4edea3] opacity-50" />
            <div className="w-8 h-8 rounded-full bg-[#1c1f2a] ring-2 ring-[#4edea3] shadow-[0_0_16px_rgba(78,222,163,0.7)] flex items-center justify-center text-[#4edea3]">
              <span className="material-symbols-outlined text-[18px]">stethoscope</span>
            </div>
          </div>
          <span className="mt-1 px-2 py-0.5 rounded-md bg-[#0a0e18]/90 border border-[#4edea3]/40 text-[#4edea3] text-[10px] font-bold whitespace-nowrap shadow-md">
            Dr. Ayesha (350m)
          </span>
        </button>

        {/* Interactive Responder Node 2: Zeeshan */}
        <button
          type="button"
          onClick={() => {
            soundEffects.playHapticClick();
            onOpenCall(initialResponders[1]);
          }}
          className="absolute z-20 top-[65%] left-[28%] group -translate-x-1/2 -translate-y-1/2 cursor-pointer flex flex-col items-center hover:scale-110 transition-transform"
        >
          <div className="relative flex items-center justify-center">
            <div className="w-7 h-7 rounded-full bg-[#1c1f2a] ring-2 ring-[#00f1fd] shadow-[0_0_14px_rgba(0,241,253,0.5)] flex items-center justify-center text-[#00f1fd]">
              <span className="material-symbols-outlined text-[16px]">cardiology</span>
            </div>
          </div>
          <span className="mt-1 px-1.5 py-0.5 rounded-md bg-[#0a0e18]/90 border border-[#00f1fd]/40 text-[#00f1fd] text-[10px] font-bold whitespace-nowrap">
            Zeeshan (620m)
          </span>
        </button>

        {/* Interactive Responder Node 3: Hamza */}
        <button
          type="button"
          onClick={() => {
            soundEffects.playHapticClick();
            onOpenCall(initialResponders[2]);
          }}
          className="absolute z-20 top-[20%] left-[25%] group -translate-x-1/2 -translate-y-1/2 cursor-pointer flex flex-col items-center hover:scale-110 transition-transform"
        >
          <div className="relative flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-[#1c1f2a] ring-2 ring-[#dfe2f1] shadow-[0_0_10px_rgba(220,253,255,0.4)] flex items-center justify-center text-[#dfe2f1]">
              <span className="material-symbols-outlined text-[14px]">healing</span>
            </div>
          </div>
          <span className="mt-1 px-1.5 py-0.5 rounded-md bg-[#0a0e18]/90 border border-[#313540] text-[#dfe2f1] text-[9px] font-bold whitespace-nowrap">
            Hamza (1.1km)
          </span>
        </button>

        {/* Live 50Hz radar watermark */}
        <div className="absolute bottom-3 left-3 z-20 px-2.5 py-1 rounded bg-[#0a0e18]/80 border border-[#262a35] backdrop-blur-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
          <span className="text-[10px] text-[#4edea3] tracking-wider font-extrabold uppercase font-mono-num">
            LIVE 50HZ RADAR
          </span>
        </div>
      </div>

      {/* Range Filter Buttons */}
      <div className="w-full flex items-center justify-between gap-2 p-1.5 rounded-2xl bg-[#171b26] border border-[#262a35]">
        {(['500m', '1.0 km', '2.0 km'] as const).map((range) => {
          const isActive = activeRange === range;
          return (
            <button
              key={range}
              type="button"
              onClick={() => {
                soundEffects.playHapticClick();
                setActiveRange(range);
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                isActive
                  ? 'bg-[#262a35] text-[#00f1fd] shadow-sm border border-[#00f1fd]/40'
                  : 'text-[#dfe2f1]/60 hover:text-white hover:bg-[#1c1f2a]'
              }`}
            >
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#00f1fd]" />}
              <span>{range} {isActive ? '(Active)' : ''}</span>
            </button>
          );
        })}
      </div>

      {/* Golden Window Defense Banner */}
      <div className="w-full rounded-2xl bg-[#171b26] border border-[#ff334b]/30 p-3.5 flex items-start gap-3 shadow-md">
        <div className="w-8 h-8 rounded-full bg-[#ff334b]/20 flex items-center justify-center shrink-0 mt-0.5 text-[#ff5166]">
          <span className="material-symbols-outlined text-[18px]">hourglass_top</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-[#ff5166] uppercase font-bold tracking-wider">
            Golden Window Defense
          </span>
          <p className="text-xs text-[#dfe2f1]/80 mt-0.5 leading-snug">
            Community responders provide immediate CPR &amp; wound pressure during the critical 15-to-5 minute golden hour window while Rescue 1122 ambulance is en route.
          </p>
        </div>
      </div>

      {/* Active Responders List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pt-1">
          <h2 className="font-display text-base font-bold text-white tracking-tight">
            Active Responders
          </h2>
          <span className="px-2.5 py-0.5 rounded-full bg-[#4edea3]/15 border border-[#4edea3]/30 text-[#4edea3] text-[11px] font-bold">
            Ready for Ping ({filteredResponders.length})
          </span>
        </div>

        {filteredResponders.map((responder) => (
          <div
            key={responder.id}
            className="w-full rounded-2xl bg-[#1c1f2a] border border-[#262a35] p-4 flex flex-col gap-3 shadow-lg relative overflow-hidden group hover:border-[#00f1fd]/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={responder.avatarUrl}
                    alt={responder.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#313540]"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#4edea3] flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-[#002113] text-[10px]">
                      check
                    </span>
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-display text-sm font-bold text-white truncate">
                      {responder.name}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#00a572]/20 border border-[#00a572]/40 text-[#4edea3] text-[10px] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" />
                      {responder.badge}
                    </span>
                  </div>
                  <span className="text-xs text-[#dfe2f1]/60 truncate">
                    {responder.role} • {responder.affiliation}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0 pl-1">
                <span className="text-[11px] text-[#4edea3] font-bold font-mono-num">
                  {responder.distance}
                </span>
                <span className="font-display text-base text-[#00f1fd] font-black font-mono-num">
                  {responder.eta}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#262a35]">
              <div className="flex items-center gap-1 text-[11px] text-[#dfe2f1]/70">
                <span className="material-symbols-outlined text-[16px] text-[#4edea3]">
                  offline_pin
                </span>
                <span>{responder.equipment}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playHapticClick();
                    onOpenRoute(responder);
                  }}
                  className="min-h-[38px] px-3.5 rounded-xl bg-[#262a35] hover:bg-[#313540] text-white text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[17px] text-[#00f1fd]">
                    navigation
                  </span>
                  <span>Route</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playHapticClick();
                    onOpenCall(responder);
                  }}
                  className="min-h-[38px] px-4 rounded-xl bg-[#00f1fd] text-[#00373a] text-xs font-black flex items-center gap-1.5 shadow-[0_0_16px_rgba(0,241,253,0.35)] active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[17px]">call</span>
                  <span>Quick Call</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Auto-dispatching nearest verified helper tag */}
      <div className="w-full rounded-2xl bg-[#171b26] border border-[#262a35] p-3.5 flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#4edea3] text-[20px]">security</span>
          <span className="text-xs text-white font-medium">
            Auto-dispatching nearest verified helper
          </span>
        </div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-ping" />
      </div>
    </div>
  );
};
