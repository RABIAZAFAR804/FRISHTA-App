import React, { useState } from 'react';
import { soundEffects } from '../utils/audio';

export const MedicalCardView: React.FC = () => {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSetLockScreen = () => {
    soundEffects.playSuccessDispatch();
    setIsQrModalOpen(false);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3200);
  };

  const ahmedAvatar =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAsDr3Uot9TpIYD8CSJWdHEBXbmBE8Y_6N5Uxvz-d2kDWS_2s6NSPc0C28q7CV40vx_qaHjgBY-uHxe9v8sJahH0t7yCOJMEwHrwYatqwVB8v79Luz3Jb4ZEs3uvkqb9BjLY7NvaQLiAKHighr_9LbpnjSn0vWClpxbJ6htsh0MTIwrvSoTQU9M5yjoFYUoqHB_VdGuJjL6JocHIi2_yXchvuRls81nfYHJW5icwdlx7XFCKP-D72Vm';

  const fatimaAvatar =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBNq8ElZ72r7whtxXl-7Q2rMMlqtLA-u2Bsf6hL2vUZi1U6K7chpxV_2rND7CCiFYIgkHCiquevKCOmaY6Iucvu4SGtj0tYhNG_zCZQ0Z9LKemTIUsEVYxy17uOBcwXKZkQtlFurAjy5F2Hd5-7KNO1FJlhwySza8l6zGZJVNccUIFlmDgetOfrhaB7_VX9tJRlOIElrCHAXWZnRvLhlDObIc1lQnvDuXryaFa0apfJ9kNJql1hSA7O';

  const tariqAvatar =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCParALQHnaCYQ0-GMNeWxcoP9N-kXoAVAifUfETAjv7GKI0YDxbMGCRsUsFqfvgffhyiCdiwN9nzYm6DmAKZFeWpofAdSlAYy0DQzjDAlcLrpoDlcaaYBeyaxoS0Wn2PGkM4Wp6rKRPDXNxbqYmDEjerBvg-byrhh_mDo7q9j6pO-rqUaxgIFDo6N7LLG57AhjPawuhsQM-u6VXm-fw_kjvTc3zqfpQOBcT9EDM9rI-4euyWlR6lmf';

  const bilalAvatar =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDwEwn7v2UVZV3QbURlKNITPrTYmfyFPemL0CDTkCo2Vshqe-4FvA8yKlbQzZ254Rg7LlGin7V-iFG1RoXUViZw5uIAJpqF2Hr5jU0FDOa5QKcpMsKuSE3ufsHeHpST6KJJIHaMPq7NeVkA_syg_spQZNwm1X3rL0_TjbdKF4crUS-9x9oyfHDkdWpWRDdmKDqDALQOTdipCOeWYoffxO_XK-dCJS2bpLG8WglH0-pPMDLS4qrmBELc';

  return (
    <div className="flex flex-col w-full pb-28 pt-2 px-4 max-w-xl mx-auto space-y-4 animate-in fade-in duration-300">
      {/* Medical ID Primary Holo Card */}
      <div className="relative overflow-hidden rounded-3xl bg-[#1c1f2a] border border-[#313540] p-5 shadow-2xl">
        {/* Ambient Emissive Glows */}
        <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-[#ff334b]/15 blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-[#00a572]/15 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col space-y-4">
          {/* Top Row: Persona Info & Blood Group Focal Badge */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={ahmedAvatar}
                  alt="Ahmed Raza"
                  className="w-14 h-14 rounded-full object-cover shadow-md ring-2 ring-[#313540]"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#4edea3] shadow-[0_0_8px_rgba(78,222,163,0.8)]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-base text-white truncate">
                    Ahmed Raza
                  </span>
                  <span
                    className="material-symbols-outlined text-[#00f1fd] text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified_user
                  </span>
                </div>
                <p className="text-xs text-[#dfe2f1]/70">Male, 29 yrs • CNIC: 35202-*******-1</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[10px] text-[#4edea3] font-bold uppercase tracking-wider font-mono-num">
                    FARISHTA ID: PK-LHR-8924
                  </span>
                </div>
              </div>
            </div>

            {/* High-Contrast Crimson Blood Group Badge */}
            <div className="flex flex-col items-center justify-center px-3.5 py-2 rounded-2xl bg-gradient-to-br from-[#ff334b] to-[#be0035] text-white shadow-[0_0_24px_rgba(255,51,75,0.45)] text-center min-w-[80px]">
              <div className="flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[15px] animate-pulse"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  favorite
                </span>
                <span className="text-[9px] tracking-wider uppercase font-black">BLOOD</span>
              </div>
              <span className="font-display text-2xl font-black tracking-tight leading-none mt-0.5">
                B+
              </span>
              <span className="text-[8px] tracking-widest uppercase text-white/90 font-bold">
                POSITIVE
              </span>
            </div>
          </div>

          {/* Critical Indicators & Tags Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Organ Donor Status */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#262a35] text-white border border-[#313540]">
              <span
                className="material-symbols-outlined text-[#4edea3] text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                volunteer_activism
              </span>
              <div className="flex flex-col">
                <span className="text-[9px] text-[#dfe2f1]/60 uppercase font-bold">
                  ORGAN STATUS
                </span>
                <span className="font-display text-xs font-bold text-[#4edea3]">
                  Registered Donor
                </span>
              </div>
            </div>

            {/* Resuscitation Status */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#262a35] text-white border border-[#313540]">
              <span className="material-symbols-outlined text-[#00f1fd] text-[20px]">
                monitor_heart
              </span>
              <div className="flex flex-col">
                <span className="text-[9px] text-[#dfe2f1]/60 uppercase font-bold">
                  DNR DIRECTIVE
                </span>
                <span className="font-display text-xs font-bold text-[#00f1fd]">
                  Full Code / CPR
                </span>
              </div>
            </div>
          </div>

          {/* Medical Allergies & Precautions Alert Tag */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#93000a]/25 border border-[#ff334b]/40 text-white">
            <span className="material-symbols-outlined text-[#ff334b] text-[20px] shrink-0 mt-0.5">
              warning
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#ffb3b5] uppercase font-bold tracking-wider">
                  CRITICAL ALLERGIES &amp; CONDITIONS
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded font-black bg-[#ff334b] text-white uppercase">
                  ALERT
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                <span className="px-2 py-0.5 rounded-full bg-[#1c1f2a] border border-[#ff334b]/40 text-[#ffb3b5] text-xs font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff334b] animate-ping" />
                  <span>Asthmatic (Carries Ventolin)</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#1c1f2a] border border-[#ff334b]/40 text-[#ffb3b5] text-xs font-medium">
                  Penicillin Allergy
                </span>
              </div>
            </div>
          </div>

          {/* Telemetry Physical Readouts Strip */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="flex flex-col p-2.5 rounded-xl bg-[#171b26] border border-[#262a35]">
              <span className="text-[9px] text-[#dfe2f1]/60 uppercase font-bold">HEIGHT &amp; WT</span>
              <span className="text-xs font-bold text-white mt-0.5 font-mono-num">182cm • 79kg</span>
            </div>
            <div className="flex flex-col p-2.5 rounded-xl bg-[#171b26] border border-[#262a35]">
              <span className="text-[9px] text-[#dfe2f1]/60 uppercase font-bold">MEDICATION</span>
              <span className="text-xs font-bold text-white mt-0.5 truncate">Salbutamol</span>
            </div>
            <div className="flex flex-col p-2.5 rounded-xl bg-[#171b26] border border-[#262a35]">
              <span className="text-[9px] text-[#dfe2f1]/60 uppercase font-bold">INSURANCE</span>
              <span className="text-xs font-bold text-[#4edea3] mt-0.5 truncate">StateLife Gold</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Registered Emergency Lifelines (3 Contacts) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f1fd] text-[20px]">
              contact_emergency
            </span>
            <h2 className="font-display text-base font-bold text-white">Emergency Lifelines</h2>
          </div>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#4edea3]/20 border border-[#4edea3]/40 text-[#4edea3] font-bold tracking-wide font-mono-num">
            3/3 CONFIGURED
          </span>
        </div>

        {/* Contact 1: Fatima (Spouse) - PRIMARY LIFELINE */}
        <div className="relative overflow-hidden rounded-2xl bg-[#1c1f2a] border border-[#262a35] p-4 shadow-md space-y-2.5">
          <div className="absolute right-0 top-0 w-24 h-24 bg-[#00f1fd]/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={fatimaAvatar}
                alt="Fatima"
                className="w-11 h-11 rounded-full object-cover ring-2 ring-[#4edea3]"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-sm text-white truncate">Fatima</span>
                  <span className="text-xs text-[#dfe2f1]/60">(Spouse)</span>
                </div>
                <p className="text-xs text-[#00f1fd] tracking-wide font-mono-num font-semibold">
                  +92 300 1234567
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="tel:+923001234567"
                onClick={() => soundEffects.playHapticClick()}
                aria-label="Call Fatima"
                className="w-10 h-10 rounded-full bg-[#4edea3] text-[#002113] flex items-center justify-center shadow-md active:scale-95 transition-transform"
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  call
                </span>
              </a>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playHapticClick();
                  alert('Simulated Live GPS SMS sent to Fatima (+92 300 1234567)');
                }}
                aria-label="Send Live GPS SMS"
                className="w-10 h-10 rounded-full bg-[#262a35] text-white flex items-center justify-center hover:bg-[#313540] active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[20px]">sms</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#262a35]">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ff334b]/20 border border-[#ff334b]/40 text-[#ffb3b5] text-[10px] font-bold">
              <span
                className="material-symbols-outlined text-[12px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span>PRIMARY CONTACT</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#4edea3]/20 border border-[#4edea3]/40 text-[#4edea3] text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
              <span>SMS LIVE TRACKING ENABLED</span>
            </span>
          </div>
        </div>

        {/* Contact 2: Dr. Tariq (Father) */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#1c1f2a] border border-[#262a35] shadow-md">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={tariqAvatar}
              alt="Dr. Tariq"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-[#313540]"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-sm text-white truncate">
                  Dr. Tariq
                </span>
                <span className="text-xs text-[#dfe2f1]/60">(Father)</span>
              </div>
              <p className="text-xs text-[#dfe2f1]/80 font-mono-num">+92 300 7654321</p>
              <div className="flex items-center gap-1 mt-0.5 text-[10px] text-[#00f1fd]">
                <span className="material-symbols-outlined text-[13px]">local_hospital</span>
                <span>Medical Doctor • First Responder</span>
              </div>
            </div>
          </div>

          <a
            href="tel:+923007654321"
            onClick={() => soundEffects.playHapticClick()}
            aria-label="Call Dr. Tariq"
            className="w-10 h-10 rounded-full bg-[#262a35] text-[#4edea3] flex items-center justify-center shadow-sm active:scale-95 transition-transform hover:bg-[#313540]"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              call
            </span>
          </a>
        </div>

        {/* Contact 3: Bilal (Brother) */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#1c1f2a] border border-[#262a35] shadow-md">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={bilalAvatar}
              alt="Bilal"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-[#313540]"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-sm text-white truncate">Bilal</span>
                <span className="text-xs text-[#dfe2f1]/60">(Brother)</span>
              </div>
              <p className="text-xs text-[#dfe2f1]/80 font-mono-num">+92 333 1122334</p>
              <span className="text-[10px] text-[#dfe2f1]/60">
                Kin Contact • Proximity: 4.2 km
              </span>
            </div>
          </div>

          <a
            href="tel:+923331122334"
            onClick={() => soundEffects.playHapticClick()}
            aria-label="Call Bilal"
            className="w-10 h-10 rounded-full bg-[#262a35] text-white flex items-center justify-center shadow-sm active:scale-95 transition-transform hover:bg-[#313540]"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              call
            </span>
          </a>
        </div>
      </div>

      {/* Section 3: Rescue 1122 CAD Integration & NFC Badge */}
      <div className="space-y-3">
        <div className="flex flex-col p-4 rounded-2xl bg-[#1c1f2a] border border-[#262a35] space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#ff334b] text-[22px]">
                emergency_share
              </span>
              <div>
                <span className="text-sm font-bold text-white block">Rescue 1122 CAD Webhook</span>
                <span className="text-[10px] text-[#dfe2f1]/60">
                  National Emergency Dispatch Linked
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#4edea3]/20 border border-[#4edea3]/40 text-[#4edea3] text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" />
              <span>ACTIVE</span>
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#171b26] text-xs">
            <div className="flex flex-col">
              <span className="text-[9px] text-[#dfe2f1]/60 uppercase font-semibold">
                REGISTERED CNIC IDENTIFIER
              </span>
              <span className="font-mono-num font-bold text-white">35202-xxxxxxx-1</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-[#dfe2f1]/60 uppercase font-semibold">
                SYNC LATENCY
              </span>
              <span className="font-mono-num font-bold text-[#4edea3]">14ms • Encrypted</span>
            </div>
          </div>
        </div>

        {/* Export Medical NFC & Lock Screen QR Interaction Banner */}
        <div className="flex flex-col space-y-2 pt-1">
          <button
            type="button"
            onClick={() => {
              soundEffects.playHapticClick();
              setIsQrModalOpen(true);
            }}
            className="w-full min-h-[52px] px-4 py-3 rounded-2xl bg-[#00f1fd] text-[#00373a] font-display font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(0,241,253,0.35)] active:scale-98 transition-transform"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              qr_code_2
            </span>
            <span>Export Medical NFC / Lock Screen QR Badge</span>
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[#dfe2f1]/60 text-xs pt-1">
            <span className="material-symbols-outlined text-[15px]">lock</span>
            <span>Passcode-exempt for certified emergency medical responders</span>
          </div>
        </div>
      </div>

      {/* Lock Screen QR Modal */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-[#1c1f2a] border border-[#313540] p-6 shadow-2xl flex flex-col items-center text-center space-y-4 relative">
            <button
              type="button"
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#262a35] flex items-center justify-center text-[#dfe2f1]/80 hover:text-white"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="w-12 h-12 rounded-full bg-[#00f1fd]/20 text-[#00f1fd] flex items-center justify-center mt-1">
              <span className="material-symbols-outlined text-[28px]">nfc</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-display text-lg font-bold text-white">Lock Screen QR Badge</h3>
              <p className="text-xs text-[#dfe2f1]/70">
                Responders can scan this badge directly from your phone lock screen without unlocking.
              </p>
            </div>

            {/* High-Fidelity SVG QR Visualizer */}
            <div className="p-4 rounded-2xl bg-[#0a0e18] border border-[#262a35] shadow-inner flex flex-col items-center justify-center">
              <svg className="w-44 h-44 text-[#dfe2f1]" fill="currentColor" viewBox="0 0 100 100">
                {/* Position Detection Squares */}
                <rect x="5" y="5" width="28" height="28" rx="4" fill="#00f1fd" />
                <rect x="9" y="9" width="20" height="20" rx="2" fill="#0a0e18" />
                <rect x="13" y="13" width="12" height="12" rx="1" fill="#00f1fd" />

                <rect x="67" y="5" width="28" height="28" rx="4" fill="#00f1fd" />
                <rect x="71" y="9" width="20" height="20" rx="2" fill="#0a0e18" />
                <rect x="75" y="13" width="12" height="12" rx="1" fill="#00f1fd" />

                <rect x="5" y="67" width="28" height="28" rx="4" fill="#00f1fd" />
                <rect x="9" y="71" width="20" height="20" rx="2" fill="#0a0e18" />
                <rect x="13" y="75" width="12" height="12" rx="1" fill="#00f1fd" />

                {/* Matrix Bits */}
                <rect x="38" y="8" width="5" height="5" fill="#dfe2f1" />
                <rect x="47" y="8" width="5" height="5" fill="#dfe2f1" />
                <rect x="56" y="8" width="5" height="5" fill="#dfe2f1" />
                <rect x="38" y="18" width="8" height="4" fill="#4edea3" />
                <rect x="50" y="18" width="10" height="4" fill="#ff5166" />
                <rect x="10" y="38" width="5" height="8" fill="#dfe2f1" />
                <rect x="18" y="48" width="6" height="5" fill="#dfe2f1" />
                <rect x="27" y="40" width="5" height="12" fill="#dfe2f1" />

                {/* Center Emissive Heart Beat Beacon */}
                <rect x="40" y="40" width="20" height="20" rx="4" fill="#ff5166" />
                <path
                  d="M46 48 C46 45, 50 45, 50 48 C50 45, 54 45, 54 48 C54 52, 50 54, 50 55 C50 54, 46 52, 46 48 Z"
                  fill="#ffffff"
                />

                <rect x="67" y="40" width="6" height="6" fill="#dfe2f1" />
                <rect x="76" y="44" width="10" height="5" fill="#4edea3" />
                <rect x="88" y="38" width="5" height="8" fill="#dfe2f1" />
                <rect x="38" y="68" width="6" height="8" fill="#dfe2f1" />
                <rect x="48" y="65" width="8" height="6" fill="#dfe2f1" />
                <rect x="58" y="70" width="6" height="6" fill="#dfe2f1" />
                <rect x="38" y="80" width="10" height="6" fill="#4edea3" />
                <rect x="52" y="82" width="6" height="8" fill="#dfe2f1" />
                <rect x="62" y="84" width="8" height="4" fill="#dfe2f1" />
                <rect x="74" y="75" width="8" height="8" fill="#00f1fd" />
                <rect x="86" y="78" width="6" height="12" fill="#ff334b" />
              </svg>
              <span className="mt-2 text-[10px] text-[#4edea3] tracking-widest font-mono-num font-bold">
                B+ • FARISHTA-SECURE-256
              </span>
            </div>

            <div className="w-full flex gap-2">
              <button
                type="button"
                onClick={handleSetLockScreen}
                className="flex-1 min-h-[44px] py-2.5 px-3 rounded-xl bg-[#4edea3] text-[#002113] font-display font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">
                  add_to_home_screen
                </span>
                <span>Set Lock Screen</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEffects.playHapticClick();
                  alert('Medical Emergency Pass exported to wallet / NFC device payload.');
                  setIsQrModalOpen(false);
                }}
                className="min-h-[44px] px-3.5 rounded-xl bg-[#262a35] text-white flex items-center justify-center hover:bg-[#313540] active:scale-95 transition-transform"
                title="Share Medical ID"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#4edea3] text-[#002113] text-xs font-bold flex items-center gap-2 shadow-2xl animate-in slide-in-from-bottom duration-200">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>Lock screen emergency pass ready &amp; saved!</span>
        </div>
      )}
    </div>
  );
};
