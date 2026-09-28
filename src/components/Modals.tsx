import React, { useState, useEffect } from 'react';
import { Responder } from '../types';
import { soundEffects } from '../utils/audio';

// 1. Quick Call Modal
interface CallModalProps {
  responder: Responder | null;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ responder, onClose }) => {
  const [callDuration, setCallDuration] = useState(0);
  const [status, setStatus] = useState<'Connecting...' | 'Encrypted Call Active'>('Connecting...');

  useEffect(() => {
    if (!responder) return;
    const timeout = setTimeout(() => {
      setStatus('Encrypted Call Active');
      soundEffects.playHapticClick();
    }, 1200);

    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [responder]);

  if (!responder) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-3xl bg-[#1c1f2a] border border-[#313540] p-6 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#00f1fd]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Responder avatar */}
        <div className="relative my-4">
          <span className="absolute -inset-2 rounded-full bg-[#00f1fd]/20 animate-ping" />
          <img
            src={responder.avatarUrl}
            alt={responder.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-[#00f1fd] shadow-xl relative z-10"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        <h3 className="font-display text-xl font-bold text-white mt-1">{responder.name}</h3>
        <p className="text-xs text-[#00f1fd] font-semibold tracking-wide uppercase mt-0.5">
          {responder.role} • {responder.badge}
        </p>
        <span className="text-sm font-mono-num text-[#dfe2f1]/80 mt-2">{responder.phone}</span>

        {/* Call state badge */}
        <div className="my-5 px-4 py-1.5 rounded-full bg-[#171b26] border border-[#313540] flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              status === 'Connecting...' ? 'bg-[#ffb3b5] animate-ping' : 'bg-[#4edea3]'
            }`}
          />
          <span className="text-xs font-medium text-white">{status}</span>
          {status === 'Encrypted Call Active' && (
            <span className="text-xs font-mono-num text-[#4edea3] font-bold">
              {formatTime(callDuration)}
            </span>
          )}
        </div>

        {/* Audio Wave Simulation */}
        <div className="flex items-center gap-1 h-8 my-2">
          {[40, 70, 30, 90, 60, 80, 45, 95, 50, 80, 35].map((h, i) => (
            <span
              key={i}
              className="w-1 bg-[#00f1fd] rounded-full animate-pulse"
              style={{
                height: `${h}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.8s',
              }}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-6">
          <button
            type="button"
            className="w-12 h-12 rounded-full bg-[#262a35] text-white flex items-center justify-center hover:bg-[#313540] transition-colors"
            title="Mute Mic"
          >
            <span className="material-symbols-outlined text-[20px]">mic_off</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-16 h-16 rounded-full bg-[#ff334b] text-white flex items-center justify-center shadow-[0_0_24px_rgba(255,51,75,0.6)] active:scale-95 transition-transform"
            title="End Call"
          >
            <span className="material-symbols-outlined text-[30px]">call_end</span>
          </button>

          <button
            type="button"
            className="w-12 h-12 rounded-full bg-[#262a35] text-white flex items-center justify-center hover:bg-[#313540] transition-colors"
            title="Speaker"
          >
            <span className="material-symbols-outlined text-[20px]">volume_up</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Route Navigation Simulation Modal
interface RouteModalProps {
  responder: Responder | null;
  onClose: () => void;
}

export const RouteModal: React.FC<RouteModalProps> = ({ responder, onClose }) => {
  if (!responder) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-3xl bg-[#1c1f2a] border border-[#313540] p-5 shadow-2xl flex flex-col relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#262a35] pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f1fd] text-[22px]">navigation</span>
            <span className="font-display font-bold text-white text-base">Tactical Fast Route</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#262a35] flex items-center justify-center text-[#dfe2f1]/80 hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Vector Map Preview */}
        <div className="relative w-full h-48 rounded-2xl bg-[#0a0e18] border border-[#262a35] overflow-hidden flex items-center justify-center">
          {/* Simulated Dark Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00f1fd15_1px,transparent_1px)] bg-[size:16px_16px]" />

          {/* Simulated Route Line SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 180">
            {/* Roads */}
            <path d="M 20 90 L 280 90" stroke="#1c2533" strokeWidth="6" />
            <path d="M 120 20 L 120 160" stroke="#1c2533" strokeWidth="6" />
            <path d="M 220 30 L 220 160" stroke="#1c2533" strokeWidth="6" />

            {/* Trajectory */}
            <path
              d="M 60 90 L 120 90 L 120 50 L 220 50 L 220 120 L 240 120"
              fill="none"
              stroke="#00f1fd"
              strokeWidth="4"
              strokeDasharray="6 4"
              className="animate-pulse"
            />

            {/* Responder origin */}
            <circle cx="60" cy="90" r="7" fill="#4edea3" />
            <circle cx="60" cy="90" r="14" fill="#4edea3" fillOpacity="0.25" />

            {/* Destination Crash Pin */}
            <circle cx="240" cy="120" r="8" fill="#ff334b" />
            <circle cx="240" cy="120" r="18" fill="#ff334b" fillOpacity="0.3" className="animate-ping" />
          </svg>

          {/* Map Badges */}
          <div className="absolute top-2 left-2 px-2 py-1 rounded bg-[#171b26]/90 border border-[#313540] text-[10px] text-[#4edea3] font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
            <span>OPTIMAL CORRIDOR ACTIVE</span>
          </div>

          <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-[#171b26]/90 border border-[#ff334b]/40 text-[10px] text-[#ff334b] font-bold">
            <span>CRASH SITE</span>
          </div>
        </div>

        {/* Turn-by-turn instruction */}
        <div className="mt-3 p-3 rounded-xl bg-[#171b26] border border-[#262a35] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#00f1fd]/15 text-[#00f1fd] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">turn_sharp_right</span>
            </div>
            <div>
              <span className="text-xs text-white font-bold block">Turn Right on Main Blvd</span>
              <span className="text-[11px] text-[#dfe2f1]/60">Shortest golden-hour path • Clear traffic</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-[#00f1fd] font-mono-num">{responder.distance}</span>
            <span className="text-[10px] text-[#dfe2f1]/60 block">{responder.eta} ETA</span>
          </div>
        </div>

        {/* Dispatcher Notice */}
        <p className="text-[11px] text-[#dfe2f1]/70 text-center mt-3">
          Rescue 1122 Dispatcher &amp; {responder.name} share live synchronized telemetry vector coordinates.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full py-3 rounded-xl bg-[#00f1fd] text-[#00373a] font-display font-bold text-sm shadow-[0_0_20px_rgba(0,241,253,0.35)] active:scale-98 transition-transform"
        >
          Confirm Tracking Window
        </button>
      </div>
    </div>
  );
};

// 3. Witness Crash Report Modal
interface WitnessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: { casualties: string; severity: string; notes: string }) => void;
}

export const WitnessModal: React.FC<WitnessModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [casualties, setCasualties] = useState('1 Rider (Unconscious)');
  const [severity, setSeverity] = useState('Critical Head/Bleed');
  const [notes, setNotes] = useState('Bike collision with road barrier near Main Market roundabout.');
  const [photoAdded, setPhotoAdded] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-3xl bg-[#1c1f2a] border border-[#ff334b]/40 p-5 shadow-2xl flex flex-col relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#262a35] pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff334b] text-[22px]">visibility</span>
            <span className="font-display font-bold text-white text-base">Witness Incident Report</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#262a35] flex items-center justify-center text-[#dfe2f1]/80 hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="text-xs text-[#dfe2f1]/70 mb-3">
          You are reporting an accident as a bystander/witness. Your current GPS will be transmitted to Rescue 1122 and nearest Farishta community doctors.
        </p>

        {/* Form fields */}
        <div className="space-y-3 text-left">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#dfe2f1]/80 block mb-1">
              Casualties &amp; Riders
            </label>
            <select
              value={casualties}
              onChange={(e) => setCasualties(e.target.value)}
              className="w-full bg-[#171b26] border border-[#313540] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f1fd]"
            >
              <option value="1 Rider (Unconscious)">1 Rider (Unconscious)</option>
              <option value="1 Rider (Conscious, Bleeding)">1 Rider (Conscious, Bleeding)</option>
              <option value="2 Riders (Multiple Injured)">2 Riders (Multiple Injured)</option>
              <option value="Pedestrian Hit">Pedestrian Hit</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#dfe2f1]/80 block mb-1">
              Estimated Trauma Level
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Severe / Bleeding', val: 'Critical Head/Bleed' },
                { label: 'Fracture / Trauma', val: 'Fracture' },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setSeverity(opt.val)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                    severity === opt.val
                      ? 'bg-[#ff334b]/20 border-[#ff334b] text-[#ffb3b5]'
                      : 'bg-[#171b26] border-[#313540] text-[#dfe2f1]/70'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#dfe2f1]/80 block mb-1">
              Live Landmark Note
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#171b26] border border-[#313540] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#00f1fd]"
            />
          </div>

          {/* Quick Photo Simulation */}
          <button
            type="button"
            onClick={() => {
              setPhotoAdded(!photoAdded);
              soundEffects.playHapticClick();
            }}
            className={`w-full py-2 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-colors ${
              photoAdded
                ? 'bg-[#4edea3]/20 border-[#4edea3] text-[#4edea3]'
                : 'bg-[#171b26] border-[#313540] text-[#dfe2f1]/80 hover:bg-[#262a35]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {photoAdded ? 'check_circle' : 'photo_camera'}
            </span>
            <span>{photoAdded ? 'Accident Scene Photo Attached (1.2 MB)' : 'Attach Incident Photo (Optional)'}</span>
          </button>
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={() => {
            soundEffects.playEmergencyBeep();
            onSubmit({ casualties, severity, notes });
          }}
          className="mt-4 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ff334b] to-[#be0035] text-white font-display font-extrabold text-sm uppercase tracking-wider shadow-[0_0_24px_rgba(255,51,75,0.45)] active:scale-98 transition-transform flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">e911_emergency</span>
          <span>Broadcast Witness CAD Alert</span>
        </button>
      </div>
    </div>
  );
};
