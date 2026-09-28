import React, { useState, useEffect } from 'react';
import { UserRoleMode, RescueSystemConfig } from '../types';
import { soundEffects } from '../utils/audio';

interface MonitorViewProps {
  userRole: UserRoleMode;
  rescueConfig: RescueSystemConfig;
  onOpenRescueConfigModal: () => void;
  onToggleUserRole: (role: UserRoleMode) => void;
  onTriggerEmergency: () => void;
  onOpenWitnessModal: () => void;
}

export const MonitorView: React.FC<MonitorViewProps> = ({
  userRole,
  rescueConfig,
  onOpenRescueConfigModal,
  onToggleUserRole,
  onTriggerEmergency,
  onOpenWitnessModal,
}) => {
  const [autoDetectEnabled, setAutoDetectEnabled] = useState(true);
  const [gForce, setGForce] = useState(1.02);
  const [speed, setSpeed] = useState(48);
  const [isSimulatingCrash, setIsSimulatingCrash] = useState(false);
  const [decibels, setDecibels] = useState(64.2);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHoldingSOS, setIsHoldingSOS] = useState(false);

  // Micro-fluctuations to emulate real hardware 50Hz sensor stream
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSimulatingCrash) {
        setGForce(+(1.0 + (Math.random() * 0.06 - 0.03)).toFixed(2));
        setSpeed((prev) => Math.max(0, Math.min(85, prev + (Math.random() * 4 - 2))));
        setDecibels(+(62.0 + Math.random() * 5).toFixed(1));
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isSimulatingCrash]);

  // SOS Press-and-hold trigger handler (or instant click)
  useEffect(() => {
    let holdTimer: NodeJS.Timeout;
    if (isHoldingSOS) {
      soundEffects.playEmergencyBeep();
      holdTimer = setInterval(() => {
        setHoldProgress((prev) => {
          if (prev >= 100) {
            clearInterval(holdTimer);
            setIsHoldingSOS(false);
            onTriggerEmergency();
            return 100;
          }
          return prev + 10;
        });
      }, 80);
    } else {
      setHoldProgress(0);
    }

    return () => clearInterval(holdTimer);
  }, [isHoldingSOS, onTriggerEmergency]);

  // Test crash simulation
  const handleTestCrash = () => {
    if (isSimulatingCrash) return;
    setIsSimulatingCrash(true);
    soundEffects.playEmergencyBeep();
    setGForce(8.45);

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([120, 60, 200]);
    }

    setTimeout(() => {
      // Transition to emergency countdown screen for complete realism
      onTriggerEmergency();
      setIsSimulatingCrash(false);
      setGForce(1.02);
    }, 700);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2 px-4 max-w-xl mx-auto space-y-4 animate-in fade-in duration-300">
      {/* CAD & Connection Status Bar */}
      <div className="flex items-center justify-between bg-[#171b26] border border-[#262a35] rounded-full px-4 py-2 shadow-sm">
        <div className="flex items-center gap-2 min-w-0">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4edea3]"></span>
          </span>
          <span className="text-xs text-[#dfe2f1]/90 truncate">
            Rescue 1122 CAD Sync:{' '}
            <strong className="text-[#4edea3] font-bold tracking-wide">CONNECTED</strong>
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0 bg-[#262a35] px-2.5 py-0.5 rounded-full">
          <span className="material-symbols-outlined text-[14px] text-[#4edea3]">bolt</span>
          <span className="text-[11px] text-[#4edea3] font-bold font-mono-num">&lt;800ms</span>
        </div>
      </div>

      {/* Victim's Configured Rescue System & Nearest Hospital Route Quick-Bar */}
      <div
        onClick={() => {
          soundEffects.playHapticClick();
          onOpenRescueConfigModal();
        }}
        className="bg-[#1c1f2a] border border-[#ff334b]/40 hover:border-[#00f1fd] transition-all rounded-2xl p-2.5 flex items-center justify-between shadow-md cursor-pointer group"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#ff334b]/20 text-[#ff334b] flex items-center justify-center font-bold text-xs shrink-0 border border-[#ff334b]/40">
            <span className="material-symbols-outlined text-[18px]">emergency</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-white flex items-center gap-1">
                <span>#1 1122</span>
                <span className="material-symbols-outlined text-[13px] text-[#ff334b]" title="Fixed Priority 1">
                  lock
                </span>
              </span>
              <span className="text-[11px] text-[#dfe2f1]/50">•</span>
              <span className="text-xs font-semibold text-[#00f1fd] truncate">
                #2 {rescueConfig.secondarySystem.name.split(' ')[0]}
              </span>
              <span className="text-[11px] text-[#dfe2f1]/50">•</span>
              <span className="text-[11px] text-[#4edea3] truncate font-medium">
                {rescueConfig.targetHospital.name.split(' ')[0]} ({rescueConfig.targetHospital.distance})
              </span>
            </div>
            <span className="text-[10px] text-[#dfe2f1]/60 block truncate">
              {rescueConfig.forwardToAll1122Headquarters
                ? 'Broadcast Active: All 5 1122 Regional Command HQs Linked'
                : '1122 Local PSAP Only'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0 pl-1 text-[#00f1fd]">
          <span className="text-[10px] font-bold uppercase hidden sm:inline">Modify</span>
          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">
            tune
          </span>
        </div>
      </div>

      {/* Role Selection Check-Toggles: "I am a victim" vs "I am a witness" */}
      <div className="bg-[#171b26] border border-[#313540] rounded-2xl p-1.5 flex items-center gap-1.5 shadow-md">
        <button
          type="button"
          onClick={() => {
            soundEffects.playHapticClick();
            onToggleUserRole('victim');
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            userRole === 'victim'
              ? 'bg-gradient-to-r from-[#ff334b] to-[#be0035] text-white shadow-[0_0_16px_rgba(255,51,75,0.4)]'
              : 'text-[#dfe2f1]/70 hover:text-white hover:bg-[#1c1f2a]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">
            {userRole === 'victim' ? 'radio_button_checked' : 'radio_button_unchecked'}
          </span>
          <span>I am a Victim</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEffects.playHapticClick();
            onToggleUserRole('witness');
            onOpenWitnessModal();
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            userRole === 'witness'
              ? 'bg-[#00f1fd] text-[#00373a] shadow-[0_0_16px_rgba(0,241,253,0.35)]'
              : 'text-[#dfe2f1]/70 hover:text-white hover:bg-[#1c1f2a]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">
            {userRole === 'witness' ? 'radio_button_checked' : 'radio_button_unchecked'}
          </span>
          <span>I am a Witness</span>
        </button>
      </div>

      {/* Mode Advisory Notice */}
      <div className="px-1 text-[11px] text-[#dfe2f1]/60 flex items-center justify-between">
        <span>
          {userRole === 'victim'
            ? '⚡ Armed: Phone IMU detects impact & broadcasts your Medical Card.'
            : '👁️ Bystander mode: Fast-report third party accidents with live GPS.'}
        </span>
        <span className="text-[#4edea3] font-mono-num font-semibold">CAD TIER-1</span>
      </div>

      {/* Kinetic Guardian Shield Radar */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#262a35] via-[#1c1f2a] to-[#171b26] border border-[#313540] p-6 flex flex-col items-center justify-center text-center shadow-xl">
        {/* Ambient Emissive Backdrop Glows */}
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[#00f1fd]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-[#4edea3]/15 blur-3xl pointer-events-none" />

        {/* Animated Radar Visualizer */}
        <div className="relative w-44 h-44 flex items-center justify-center my-1">
          {/* Outer Pulsing Ripple */}
          <div
            className="absolute inset-0 rounded-full bg-[#00f1fd]/10 animate-ping"
            style={{ animationDuration: '3s' }}
          />

          {/* Concentric Rings */}
          <div className="absolute inset-2 rounded-full border border-[#00f1fd]/20 bg-[#00f1fd]/5" />
          <div className="absolute inset-8 rounded-full border border-[#00f1fd]/25 bg-[#171b26]/70 flex items-center justify-center">
            {/* SVG Scanning Sweep Wave */}
            <svg
              className="absolute inset-0 w-full h-full animate-radar"
              viewBox="0 0 100 100"
            >
              <defs>
                <linearGradient id="radarSweepMonitor" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f1fd" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#00f1fd" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon fill="url(#radarSweepMonitor)" points="50,50 100,50 100,20" />
            </svg>
          </div>

          {/* Core Glowing Shield Crest */}
          <div className="relative z-10 w-18 h-18 rounded-full bg-gradient-to-tr from-[#0a0e18] to-[#262a35] border border-[#00f1fd]/40 flex items-center justify-center shadow-2xl">
            <span
              className="material-symbols-outlined text-[36px] text-[#00f1fd] drop-shadow-[0_0_14px_rgba(0,241,253,0.8)]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              security
            </span>
          </div>

          {/* Live Orbiting Nodes (Farishtas in radius) */}
          <div className="absolute top-4 right-7 w-2.5 h-2.5 rounded-full bg-[#4edea3] shadow-[0_0_8px_#4edea3]" />
          <div className="absolute bottom-6 left-7 w-2.5 h-2.5 rounded-full bg-[#00f1fd] shadow-[0_0_8px_#00f1fd]" />
          <div className="absolute top-12 left-5 w-2 h-2 rounded-full bg-[#6ffbbe] shadow-[0_0_6px_#6ffbbe]" />
        </div>

        {/* 50Hz Sensor Listening Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#313540]/80 backdrop-blur-md mb-2 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
          <span className="text-[11px] font-bold text-[#4edea3] uppercase tracking-wider font-mono-num">
            50Hz Sensor Listening
          </span>
        </div>

        <h2 className="font-display text-2xl font-black text-white tracking-tight">
          SHIELD ACTIVE
        </h2>
        <p className="text-xs text-[#dfe2f1]/70 max-w-xs mt-1">
          Continuous IMU acceleration, gyro-tilt, and acoustic impact heuristics engaged.
        </p>

        {/* Farishta Community Count Chip */}
        <div className="mt-4 w-full bg-[#313540]/50 backdrop-blur-md rounded-xl p-3 flex items-center justify-between border border-[#313540]/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3]">
              <span className="material-symbols-outlined text-[20px]">group</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] text-[#dfe2f1]/70 leading-none">
                Community Farishtas
              </span>
              <span className="text-sm font-display text-[#4edea3] font-bold leading-tight mt-0.5">
                14 Helpers Active
              </span>
            </div>
          </div>
          <span className="text-xs bg-[#171b26] text-[#dfe2f1]/80 px-2.5 py-1 rounded-full font-semibold border border-[#313540]">
            within 2 km
          </span>
        </div>
      </div>

      {/* Telemetry Metrics Grid (G-Force, Speed, GPS) */}
      <div className="grid grid-cols-1 gap-3">
        {/* Card 1: G-Force Dynamics & Sparkline */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#262a35] to-[#1c1f2a] border border-[#313540] p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00f1fd]" />
                <span className="text-[11px] text-[#dfe2f1]/70 uppercase tracking-wider font-semibold">
                  Lateral Dynamics
                </span>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span
                  className={`font-display text-3xl font-black font-mono-num transition-colors ${
                    isSimulatingCrash ? 'text-[#ff334b]' : 'text-[#00f1fd]'
                  }`}
                >
                  {gForce}
                </span>
                <span className="text-sm text-[#dfe2f1]/70 font-bold">G</span>
              </div>
              <span className="text-xs text-[#dfe2f1]/60">
                {isSimulatingCrash ? 'CRASH IMPACT SPIKE' : 'Baseline Gravity Normal'}
              </span>
            </div>

            {/* Live G-Force Waveform Mini SVG */}
            <div className="w-32 h-14 flex flex-col justify-end">
              <svg className="w-full h-10 overflow-visible" viewBox="0 0 100 40">
                <defs>
                  <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00f1fd" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#00f1fd" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 30 Q 15 28, 25 31 T 50 18 T 65 32 T 75 14 T 88 28 L 100 29 L 100 40 L 0 40 Z"
                  fill="url(#waveGrad)"
                />
                <path
                  d="M 0 30 Q 15 28, 25 31 T 50 18 T 65 32 T 75 14 T 88 28 L 100 29"
                  fill="none"
                  stroke="#00f1fd"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                />
              </svg>
              <div className="flex justify-between text-[10px] text-[#dfe2f1]/50 mt-1 font-mono-num">
                <span>-5s</span>
                <span>-2.5s</span>
                <span className="text-[#00f1fd] font-bold">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Speed & GPS Split Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Speed Card */}
          <div className="rounded-2xl bg-[#1c1f2a] border border-[#262a35] p-3.5 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#4edea3]">speed</span>
                <span className="text-[11px] text-[#dfe2f1]/70 uppercase tracking-wider font-semibold">
                  Speed
                </span>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-display text-2xl font-black text-white font-mono-num">
                  {Math.round(speed)}
                </span>
                <span className="text-xs text-[#dfe2f1]/70 font-semibold">km/h</span>
              </div>
            </div>
            <div className="mt-2 pt-2 bg-[#171b26]/70 rounded-lg p-1.5 flex items-center gap-1 text-[#dfe2f1]/80">
              <span className="material-symbols-outlined text-[14px] text-[#00f1fd] shrink-0">
                navigation
              </span>
              <span className="text-[11px] truncate leading-tight">Gulberg Main, LHE</span>
            </div>
          </div>

          {/* GPS Precision Card */}
          <div className="rounded-2xl bg-[#1c1f2a] border border-[#262a35] p-3.5 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#dfe2f1]/70 uppercase tracking-wider font-semibold">
                  GPS Precision
                </span>
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-1 h-1.5 bg-[#4edea3] rounded-sm"></span>
                  <span className="w-1 h-2 bg-[#4edea3] rounded-sm"></span>
                  <span className="w-1 h-3 bg-[#4edea3] rounded-sm"></span>
                  <span className="w-1 h-3 bg-[#4edea3] rounded-sm"></span>
                </div>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-display text-2xl font-black text-[#4edea3] font-mono-num">
                  ±2.4
                </span>
                <span className="text-xs text-[#4edea3] font-bold">m</span>
              </div>
            </div>
            <div className="mt-2 pt-2 bg-[#171b26]/70 rounded-lg p-1.5 flex items-center justify-between">
              <span className="text-[10px] text-[#4edea3] font-bold uppercase">RTK Fixed</span>
              <span className="text-[10px] text-[#dfe2f1]/70 font-mono-num">18 Sats</span>
            </div>
          </div>
        </div>
      </div>

      {/* Auto Crash Detection Toggle */}
      <div className="rounded-2xl bg-[#1c1f2a] border border-[#262a35] p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3] shrink-0">
            <span className="material-symbols-outlined text-[22px]">car_crash</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-bold text-white">Auto Crash Detection</span>
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold font-mono-num ${
                  autoDetectEnabled
                    ? 'bg-[#00a572] text-white'
                    : 'bg-[#313540] text-[#dfe2f1]/60'
                }`}
              >
                {autoDetectEnabled ? 'ACTIVE' : 'OFF'}
              </span>
            </div>
            <span className="text-xs text-[#dfe2f1]/70">
              Triggers immediate 1122 dispatch upon &gt;4.5G event
            </span>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          type="button"
          role="switch"
          aria-checked={autoDetectEnabled}
          onClick={() => {
            soundEffects.playHapticClick();
            setAutoDetectEnabled(!autoDetectEnabled);
          }}
          className={`w-13 h-7 rounded-full p-0.5 transition-colors relative shrink-0 ${
            autoDetectEnabled ? 'bg-[#4edea3]' : 'bg-[#313540]'
          }`}
        >
          <span
            className={`block w-6 h-6 rounded-full bg-[#002113] shadow-md transform transition-transform ${
              autoDetectEnabled ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Calibration & Test Crash Sandbox */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#262a35] via-[#1c1f2a] to-[#0a0e18] border border-[#313540] p-5 shadow-xl text-center">
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#ff334b]/20 blur-3xl pointer-events-none" />
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#ff334b]">sensors</span>
            <span className="text-[11px] text-[#ff334b] font-bold uppercase tracking-wider">
              Calibration &amp; Safety Diagnostic
            </span>
          </div>

          <h3 className="font-display text-lg font-black text-white">Simulate Test Crash</h3>
          <p className="text-xs text-[#dfe2f1]/70 max-w-xs mt-1">
            Simulates an 8.2G multi-axis impact event, tests speaker acoustic alarms, and simulates CAD alert handoff.
          </p>

          {/* Test Trigger Button */}
          <div className="relative my-4 flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-24 w-24 rounded-full bg-[#ff334b] opacity-35" />
            <button
              type="button"
              onClick={handleTestCrash}
              className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-br from-[#ff334b] to-[#be0035] text-white flex flex-col items-center justify-center shadow-[0_0_30px_rgba(255,51,75,0.5)] active:scale-95 transition-all group"
            >
              <span
                className="material-symbols-outlined text-[32px] group-hover:scale-110 transition-transform"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                smart_toy
              </span>
              <span className="text-[11px] font-black tracking-wider uppercase mt-1">
                Test Trigger
              </span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[#dfe2f1]/60 text-xs">
            <span className="material-symbols-outlined text-[14px]">info</span>
            <span>Safe Sandbox: Will test 10-second countdown flow</span>
          </div>
        </div>
      </div>

      {/* Raw Telemetry Packets Log */}
      <div className="rounded-2xl bg-[#1c1f2a] border border-[#262a35] p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00f1fd]" />
            <span className="font-display text-xs font-bold text-white">Raw Telemetry Packets</span>
          </div>
          <span className="text-[10px] text-[#00f1fd] font-mono-num font-bold">SYNC: 100%</span>
        </div>

        <div className="space-y-1.5 font-mono text-[11px]">
          <div className="flex justify-between items-center bg-[#171b26] p-2 rounded-lg text-[#dfe2f1]/70">
            <span className="text-[#4edea3]">IMU_ACCEL_X/Y/Z</span>
            <span className="text-white font-mono-num">+0.04 / -0.01 / +{gForce}</span>
            <span className="text-[#4edea3] font-bold">STABLE</span>
          </div>
          <div className="flex justify-between items-center bg-[#171b26] p-2 rounded-lg text-[#dfe2f1]/70">
            <span className="text-[#00f1fd]">AUDIO_DECIBEL_PEAK</span>
            <span className="text-white font-mono-num">{decibels} dB</span>
            <span className="text-[#00f1fd] font-bold">CLEAR</span>
          </div>
          <div className="flex justify-between items-center bg-[#171b26] p-2 rounded-lg text-[#dfe2f1]/70">
            <span className="text-[#ffb3b5]">ROLLOVER_PITCH</span>
            <span className="text-white font-mono-num">1.4° (Threshold 65°)</span>
            <span className="text-[#4edea3] font-bold">SAFE</span>
          </div>
        </div>
      </div>

      {/* Prominent Glowing Pulsating SOS Button in Lower Thumb Zone */}
      <div className="pt-2 pb-2">
        <div className="relative w-full rounded-2xl bg-[#171b26] border border-[#ff334b]/40 p-4 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(255,51,75,0.2)]">
          <div className="flex items-center gap-2 mb-2 text-[#ffb3b5] text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px] animate-pulse">crisis_alert</span>
            <span>Emergency Thumb Action</span>
          </div>

          <div className="relative my-2 w-full flex items-center justify-center">
            {/* Outward glowing pulsation rings */}
            <span className="absolute w-44 h-16 rounded-full bg-[#ff334b]/20 animate-ping" />
            <span className="absolute w-48 h-20 rounded-full bg-[#ff334b]/10 animate-pulse" />

            {/* Glowing SOS Action Button */}
            <button
              type="button"
              onMouseDown={() => setIsHoldingSOS(true)}
              onMouseUp={() => setIsHoldingSOS(false)}
              onMouseLeave={() => setIsHoldingSOS(false)}
              onTouchStart={() => setIsHoldingSOS(true)}
              onTouchEnd={() => setIsHoldingSOS(false)}
              onClick={() => {
                soundEffects.playEmergencyBeep();
                onTriggerEmergency();
              }}
              className="relative z-10 w-full max-w-sm min-h-[64px] rounded-2xl bg-gradient-to-r from-[#ff334b] via-[#e11d48] to-[#be0035] text-white flex items-center justify-between px-6 shadow-[0_0_30px_rgba(255,51,75,0.55)] active:scale-98 transition-transform cursor-pointer"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[28px] animate-pulse">
                    e911_emergency
                  </span>
                </div>
                <div>
                  <span className="font-display font-black text-lg tracking-wide block leading-tight">
                    SOS - REPORT ACCIDENT
                  </span>
                  <span className="text-[11px] text-white/80 font-medium">
                    {userRole === 'victim'
                      ? 'Tap or hold to trigger 10s auto-dispatch'
                      : 'Alert Rescue 1122 to nearby crash'}
                  </span>
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">chevron_right</span>
              </div>
            </button>
          </div>

          {holdProgress > 0 && (
            <div className="w-full max-w-sm mt-2">
              <div className="h-1.5 w-full bg-[#262a35] rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-75"
                  style={{ width: `${holdProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
