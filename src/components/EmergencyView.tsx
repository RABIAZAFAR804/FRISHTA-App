import React, { useState, useEffect, useRef } from 'react';
import { SlideToCancel } from './SlideToCancel';
import { RescueSystemConfig } from '../types';
import { soundEffects } from '../utils/audio';

interface EmergencyViewProps {
  rescueConfig?: RescueSystemConfig;
  onCancelEmergency: () => void;
  onDispatchConfirmed: () => void;
  isAudioMuted: boolean;
}

export const EmergencyView: React.FC<EmergencyViewProps> = ({
  rescueConfig,
  onCancelEmergency,
  onDispatchConfirmed,
  isAudioMuted,
}) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isDispatched, setIsDispatched] = useState(false);
  const maxTime = 10;
  const perimeter = 628.3; // 2 * PI * 100
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // SVG ring stroke offset
  const progressFraction = timeLeft / maxTime;
  const strokeOffset = perimeter - progressFraction * perimeter;

  // Countdown clock & acoustic pings
  useEffect(() => {
    if (isCancelled || isDispatched) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsDispatched(true);
          soundEffects.playSuccessDispatch();
          setTimeout(() => {
            onDispatchConfirmed();
          }, 1000);
          return 0;
        }

        // Play warning ping if unmuted
        if (!isAudioMuted) {
          soundEffects.playEmergencyBeep();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isCancelled, isDispatched, isAudioMuted, onDispatchConfirmed]);

  const handleCancel = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsCancelled(true);
    soundEffects.playHapticClick();
    setTimeout(() => {
      onCancelEmergency();
    }, 1400);
  };

  const handleInstantDispatch = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(0);
    setIsDispatched(true);
    soundEffects.playSuccessDispatch();
    setTimeout(() => {
      onDispatchConfirmed();
    }, 800);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-1 max-w-xl mx-auto animate-in fade-in duration-300">
      {/* Acoustic Pulsing Warning Bar */}
      <div className="w-full bg-[#93000a] text-[#ffdad6] px-4 py-2.5 flex items-center justify-between shadow-lg border-b border-[#ff334b]/40">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] animate-pulse text-white">
            volume_up
          </span>
          <span className="text-[11px] uppercase tracking-wider font-extrabold font-mono-num">
            ALARM PULSE ACTIVE • LOUD ACOUSTIC PING
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-3.5 bg-white rounded-full animate-bounce" />
          <span className="w-1.5 h-5 bg-white rounded-full animate-bounce [animation-delay:0.15s]" />
          <span className="w-1.5 h-2.5 bg-white rounded-full animate-bounce [animation-delay:0.3s]" />
        </div>
      </div>

      <div className="px-4 pt-3 flex flex-col gap-4">
        {/* Top Tactical Alert Strip */}
        <div className="bg-[#262a35] border border-[#ff334b]/50 rounded-2xl p-4 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff334b]/20 via-transparent to-transparent pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ff334b] text-white flex items-center justify-center shadow-[0_0_18px_rgba(255,51,75,0.7)]">
                <span className="material-symbols-outlined text-[24px]">crisis_alert</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-base text-white">
                    CRASH INGESTION
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#ff334b] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    CRITICAL
                  </span>
                </div>
                <p className="text-[11px] text-[#dfe2f1]/70 font-mono-num mt-0.5">
                  POST /api/v1/crash/report • ID #CR-88219
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#4edea3] uppercase tracking-wider font-bold flex items-center gap-1 justify-end">
                <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping" /> Live HUD
              </span>
              <span className="text-[11px] text-[#dfe2f1]/70 font-mono-num font-semibold">
                50Hz G-FORCE GYRO
              </span>
            </div>
          </div>
        </div>

        {/* Center Stage: Circular Progress Countdown */}
        <div className="relative flex flex-col items-center justify-center py-6 bg-[#0a0e18] border border-[#313540] rounded-3xl shadow-2xl overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute w-60 h-60 rounded-full bg-[#ff334b]/15 blur-3xl pointer-events-none -top-10" />
          <div className="absolute w-52 h-52 rounded-full bg-[#00f1fd]/10 blur-2xl pointer-events-none bottom-0" />

          {/* Telemetry G-Force Chip */}
          <div className="relative z-10 mb-3 px-3.5 py-1 rounded-full bg-[#1c1f2a] border border-[#313540] text-white flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[16px] text-[#ff334b]">speed</span>
            <span className="text-xs font-black tracking-tight text-[#ff334b] font-mono-num">
              5.8G SEVERE IMPACT DETECTED
            </span>
          </div>

          {/* SVG Ring & Countdown Display */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 240 240">
              {/* Background ring */}
              <circle
                className="text-[#1c1f2a]"
                cx="120"
                cy="120"
                r="100"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="12"
              />
              {/* Active countdown stroke */}
              <circle
                className={`transition-all duration-1000 ease-linear ${
                  isCancelled ? 'text-[#4edea3]' : isDispatched ? 'text-[#00f1fd]' : 'text-[#ff334b]'
                }`}
                cx="120"
                cy="120"
                r="100"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="14"
                strokeDasharray="628.3"
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                style={{
                  filter: isCancelled
                    ? 'drop-shadow(0 0 12px rgba(78,222,163,0.7))'
                    : 'drop-shadow(0 0 16px rgba(255,51,75,0.8))',
                }}
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute flex flex-col items-center justify-center text-center px-4">
              <span
                className={`font-display text-5xl font-black tracking-tighter font-mono-num ${
                  isCancelled
                    ? 'text-[#4edea3]'
                    : isDispatched
                    ? 'text-[#00f1fd]'
                    : 'text-[#ff334b] drop-shadow-[0_0_24px_rgba(255,51,75,0.7)]'
                }`}
              >
                {isCancelled ? 'ABORT' : isDispatched ? 'CAD OK' : `${timeLeft < 10 ? '0' : ''}${timeLeft}s`}
              </span>

              <span className="text-xs font-bold uppercase tracking-widest text-[#dfe2f1] mt-0.5">
                {isCancelled
                  ? 'DISPATCH CANCELLED'
                  : isDispatched
                  ? 'AUTONOMOUS CAD ACTIVE'
                  : 'REMAINING'}
              </span>

              <div className="mt-2.5 flex items-center gap-1.5 text-[#dfe2f1]/80 text-[11px] font-mono-num bg-[#171b26] border border-[#313540] px-2.5 py-1 rounded-lg">
                <span className="material-symbols-outlined text-[14px] text-[#4edea3]">
                  location_on
                </span>
                <span>31.5210° N, 74.3485° E</span>
              </div>
            </div>
          </div>

          {/* Subtext info */}
          <div className="relative z-10 mt-2 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171b26] border border-[#313540] text-[#dfe2f1]/80 text-xs">
              <span className="material-symbols-outlined text-[15px] text-[#ff334b]">info</span>
              <span>False Alarm? Use tactile slider below to abort</span>
            </div>
          </div>
        </div>

        {/* Heavy-Duty Slide to Cancel Component */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#dfe2f1]/70 px-1">
            Tactile Cancellation Action
          </label>
          <SlideToCancel onCancel={handleCancel} isCancelled={isCancelled} />
        </div>

        {/* Direct Action Controls */}
        <div className="flex flex-col gap-2.5">
          {/* Green Quick Abort Button */}
          <button
            type="button"
            disabled={isCancelled || isDispatched}
            onClick={handleCancel}
            className={`w-full min-h-[56px] rounded-2xl flex items-center justify-between px-4 transition-all border ${
              isCancelled
                ? 'bg-[#172e25] border-[#4edea3] text-[#4edea3] opacity-80'
                : 'bg-[#00a572] hover:bg-[#4edea3] text-[#002113] border-[#4edea3]/40 shadow-[0_4px_20px_rgba(0,165,114,0.35)] active:scale-98'
            }`}
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">thumb_up</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm">
                  {isCancelled ? 'CANCELLED CONFIRMED' : 'I AM OKAY — CANCEL'}
                </span>
                <span className="text-[10px] opacity-80 font-mono-num">
                  POST /api/v1/crash/cancel
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 font-bold text-xs uppercase tracking-wider">
              <span>ABORT</span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </div>
          </button>

          {/* Immediate Dispatch Button */}
          <button
            type="button"
            disabled={isCancelled || isDispatched}
            onClick={handleInstantDispatch}
            className="w-full min-h-[52px] bg-gradient-to-r from-[#ff334b] via-[#e11d48] to-[#be0035] text-white rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(255,51,75,0.4)] active:scale-98 transition-all hover:shadow-[0_0_30px_rgba(255,51,75,0.6)] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px] animate-pulse">send</span>
            <span className="font-display font-black text-sm uppercase tracking-wide">
              DISPATCH NOW IMMEDIATELY (BYPASS)
            </span>
          </button>
        </div>

        {/* Autonomous CAD Pipeline Checklist */}
        <div className="bg-[#1c1f2a] border border-[#262a35] rounded-2xl p-4 shadow-md flex flex-col gap-3">
          <div className="flex items-center justify-between pb-1 border-b border-[#262a35]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#00f1fd]">lan</span>
              <span className="font-display text-xs font-bold text-white uppercase tracking-wider">
                Autonomous CAD Pipeline
              </span>
            </div>
            <span className="text-[10px] font-mono-num text-[#4edea3] font-bold">
              TIER-1 RESPONSE
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {/* Step 1 */}
            <div
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                isCancelled
                  ? 'bg-[#171b26] border-[#313540] text-[#dfe2f1]/60'
                  : 'bg-[#262a35] border-[#ff334b]/40 text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff334b] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff334b]"></span>
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold">
                    {isCancelled ? '[Aborted] False Alarm Buffer' : '[Active] 10s False Alarm Buffer'}
                  </span>
                  <span className="text-[10px] text-[#dfe2f1]/60 font-mono-num">
                    {isCancelled ? 'Aborted by rider' : 'Standby countdown in progress'}
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#ff334b]/20 text-[#ffb3b5] text-[10px] font-bold font-mono-num">
                {isCancelled ? 'ABORTED' : `T-${timeLeft < 10 ? '0' : ''}${timeLeft}s`}
              </span>
            </div>

            {/* Step 2: Rescue 1122 Locked Master CAD */}
            <div
              className={`flex items-center justify-between p-2.5 rounded-xl border ${
                isDispatched
                  ? 'bg-[#172e25] border-[#4edea3]/40 text-white'
                  : 'bg-[#171b26] border-[#262a35] text-[#dfe2f1]/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-3 h-3 rounded-full ${
                    isDispatched ? 'bg-[#4edea3]' : 'bg-[#313540]'
                  }`}
                />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold flex items-center gap-1.5">
                    <span>{isDispatched ? '✓ Rescue 1122 Master CAD Sent' : '[Priority #1] Rescue 1122 CAD'}</span>
                    <span className="material-symbols-outlined text-[12px] text-[#ff334b]">lock</span>
                  </span>
                  <span className="text-[10px] text-[#dfe2f1]/50">
                    {rescueConfig?.forwardToAll1122Headquarters
                      ? 'Forwarded to ALL 5 1122 Regional & Provincial HQs'
                      : 'Direct Gov Emergency PSAP Integration (Gulberg HQ)'}
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#262a35] text-[10px] font-mono-num font-bold">
                {isDispatched ? 'TRANSMITTED' : 'LOCKED #1'}
              </span>
            </div>

            {/* Step 3: Configured Secondary Fleet */}
            <div
              className={`flex items-center justify-between p-2.5 rounded-xl border ${
                isDispatched
                  ? 'bg-[#172e25] border-[#4edea3]/40 text-white'
                  : 'bg-[#171b26] border-[#262a35] text-[#dfe2f1]/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-3 h-3 rounded-full ${
                    isDispatched ? 'bg-[#00f1fd]' : 'bg-[#313540]'
                  }`}
                />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold">
                    {isDispatched
                      ? `✓ ${rescueConfig?.secondarySystem.name || 'Edhi Foundation 115'} Alerted`
                      : `[Secondary Fleet] ${rescueConfig?.secondarySystem.name || 'Edhi Foundation 115'}`}
                  </span>
                  <span className="text-[10px] text-[#dfe2f1]/50">
                    Victim configured backup fleet • {rescueConfig?.secondarySystem.distance || '1.4 km'}
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#262a35] text-[10px] font-mono-num">
                {isDispatched ? 'ALERTED' : 'CONFIGURED'}
              </span>
            </div>

            {/* Step 4: Bykea & Community Bikers */}
            <div
              className={`flex items-center justify-between p-2.5 rounded-xl border ${
                isDispatched
                  ? 'bg-[#172e25] border-[#4edea3]/40 text-white'
                  : 'bg-[#171b26] border-[#262a35] text-[#dfe2f1]/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-3 h-3 rounded-full ${
                    isDispatched ? 'bg-[#4edea3]' : 'bg-[#313540]'
                  }`}
                />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold">
                    {isDispatched
                      ? '✓ Bykea Emergency Biker Pod Dispatched'
                      : '[Pending] Bykea & Biker Couriers'}
                  </span>
                  <span className="text-[10px] text-[#dfe2f1]/50">
                    First-aid arterial tourniquet carrier (0.5 km)
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#262a35] text-[10px] font-mono-num">
                {isDispatched ? 'EN ROUTE' : 'ROUTING'}
              </span>
            </div>

            {/* Step 5: SMS Lifelines */}
            <div
              className={`flex items-center justify-between p-2.5 rounded-xl border ${
                isDispatched
                  ? 'bg-[#172e25] border-[#4edea3]/40 text-white'
                  : 'bg-[#171b26] border-[#262a35] text-[#dfe2f1]/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-3 h-3 rounded-full ${
                    isDispatched ? 'bg-[#4edea3]' : 'bg-[#313540]'
                  }`}
                />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold">
                    {isDispatched
                      ? '✓ SMS Broadcasted to 3 Lifelines'
                      : '[Pending] SMS to 3 Emergency Contacts'}
                  </span>
                  <span className="text-[10px] text-[#dfe2f1]/50 truncate max-w-[200px]">
                    Fatima (Wife), Dr. Tariq, Bilal
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#262a35] text-[10px] font-mono-num">
                {isDispatched ? 'DELIVERED' : 'READY'}
              </span>
            </div>

            {/* Step 6: Configured Nearest Target Hospital ER */}
            <div
              className={`flex items-center justify-between p-2.5 rounded-xl border ${
                isDispatched
                  ? 'bg-[#172e25] border-[#4edea3]/40 text-white'
                  : 'bg-[#171b26] border-[#262a35] text-[#dfe2f1]/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-3 h-3 rounded-full ${
                    isDispatched ? 'bg-[#00f1fd]' : 'bg-[#313540]'
                  }`}
                />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold">
                    {isDispatched
                      ? `✓ ${rescueConfig?.targetHospital.name || 'Services Hospital'} ER Pre-Notified`
                      : `[Nearest Target ER] ${rescueConfig?.targetHospital.name || 'Services Hospital'}`}
                  </span>
                  <span className="text-[10px] text-[#dfe2f1]/50">
                    Trauma bay reserved via {rescueConfig?.targetHospital.assigned1122Station || 'Station #12'}
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#262a35] text-[10px] font-mono-num font-bold">
                {isDispatched ? 'RESERVED' : rescueConfig?.targetHospital.distance || '2.2 km'}
              </span>
            </div>
          </div>
        </div>

        {/* Telemetry Hardware Diagnostics */}
        <div className="grid grid-cols-2 gap-3 mb-2">
          <div className="bg-[#171b26] border border-[#262a35] p-3 rounded-2xl flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-[#4edea3]">
              battery_charging_full
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#dfe2f1]/60 font-semibold">VEHICLE POWER</span>
              <span className="text-xs font-bold text-white font-mono-num">13.8V Stable</span>
            </div>
          </div>

          <div className="bg-[#171b26] border border-[#262a35] p-3 rounded-2xl flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-[#00f1fd]">
              satellite_alt
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#dfe2f1]/60 font-semibold">GNSS PRECISION</span>
              <span className="text-xs font-bold text-white font-mono-num">± 1.4m CEP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
