import React from 'react';
import { soundEffects } from '../utils/audio';

interface ContactPermissionModalProps {
  isOpen: boolean;
  onGrantPermission: () => void;
  onDenyPermission: () => void;
}

export const ContactPermissionModal: React.FC<ContactPermissionModalProps> = ({
  isOpen,
  onGrantPermission,
  onDenyPermission,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-3xl bg-[#1c1f2a] border border-[#00f1fd]/40 p-6 shadow-2xl flex flex-col items-center text-center space-y-4 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#00f1fd]/15 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-[#ff334b]/15 blur-xl pointer-events-none" />

        {/* Tactical Shield Emblem */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00f1fd]/20 to-[#00a572]/20 border border-[#00f1fd]/50 flex items-center justify-center text-[#00f1fd] shadow-[0_0_20px_rgba(0,241,253,0.3)]">
          <span className="material-symbols-outlined text-[34px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            perm_contact_calendar
          </span>
        </div>

        <div className="space-y-1.5 relative z-10">
          <span className="text-[10px] font-bold text-[#00f1fd] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#00f1fd]/15 border border-[#00f1fd]/30 font-mono-num inline-block">
            SECURITY &amp; PERMISSIONS
          </span>
          <h3 className="font-display text-lg font-black text-white">
            Allow Access to Phone Contacts?
          </h3>
          <p className="text-xs text-[#dfe2f1]/70 leading-relaxed px-1">
            FARISHTA requires contact access so you can easily choose trusted family lifelines (parents, siblings, spouse) without typing numbers manually during crises.
          </p>
        </div>

        {/* Safety & Privacy Assurances */}
        <div className="w-full rounded-2xl bg-[#171b26] border border-[#262a35] p-3 text-left space-y-2 relative z-10">
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#4edea3] text-[18px] shrink-0 mt-0.5">
              verified_user
            </span>
            <div className="text-[11px] text-[#dfe2f1]/80">
              <strong className="text-white">Strict Device Privacy:</strong> Your contacts stay on your device and are never uploaded to ad trackers.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#ff334b] text-[18px] shrink-0 mt-0.5">
              crisis_alert
            </span>
            <div className="text-[11px] text-[#dfe2f1]/80">
              <strong className="text-white">Emergency Dispatch:</strong> Only selected contacts will receive live accident GPS location if an accident is not cancelled within 10s.
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col gap-2 pt-1 relative z-10">
          <button
            type="button"
            onClick={() => {
              soundEffects.playHapticClick();
              onGrantPermission();
            }}
            className="w-full min-h-[46px] rounded-xl bg-gradient-to-r from-[#00f1fd] to-[#00a572] text-[#002113] font-display font-bold text-xs shadow-[0_0_18px_rgba(0,241,253,0.4)] active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Allow Contact Access</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEffects.playHapticClick();
              onDenyPermission();
            }}
            className="w-full min-h-[40px] rounded-xl bg-[#262a35] text-[#dfe2f1]/70 hover:text-white text-xs font-semibold hover:bg-[#313540] active:scale-95 transition-colors"
          >
            Don't Allow / Type Manually
          </button>
        </div>
      </div>
    </div>
  );
};
