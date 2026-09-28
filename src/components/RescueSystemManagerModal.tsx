import React, { useState } from 'react';
import { RescueSystemConfig, EmergencyService, HospitalDestination } from '../types';
import {
  EMERGENCY_SERVICES,
  HOSPITAL_DESTINATIONS,
  RESCUE_1122_HEADQUARTERS,
} from '../data/emergencyServices';
import { soundEffects } from '../utils/audio';

interface RescueSystemManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: RescueSystemConfig;
  onSaveConfig: (newConfig: RescueSystemConfig) => void;
}

export const RescueSystemManagerModal: React.FC<RescueSystemManagerModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [selectedSecondary, setSelectedSecondary] = useState<EmergencyService>(config.secondarySystem);
  const [selectedHospital, setSelectedHospital] = useState<HospitalDestination>(config.targetHospital);
  const [forwardAllHQs, setForwardAllHQs] = useState<boolean>(config.forwardToAll1122Headquarters);
  const [autoHospitalPreAlert, setAutoHospitalPreAlert] = useState<boolean>(config.autoHospitalPreAlert);
  const [isSimulatingBroadcast, setIsSimulatingBroadcast] = useState(false);
  const [broadcastLog, setBroadcastLog] = useState<string[]>([]);
  const [activeTabSection, setActiveTabSection] = useState<'hospitals' | 'secondary' | 'headquarters'>('hospitals');

  if (!isOpen) return null;

  // Secondary options: everything EXCEPT 1122
  const secondaryOptions = EMERGENCY_SERVICES.filter((s) => s.id !== 'rescue-1122');

  const handleSimulateHQForward = () => {
    setIsSimulatingBroadcast(true);
    setBroadcastLog([]);
    soundEffects.playEmergencyBeep();

    RESCUE_1122_HEADQUARTERS.forEach((hq, index) => {
      setTimeout(() => {
        soundEffects.playHapticClick();
        setBroadcastLog((prev) => [
          ...prev,
          `✓ [${hq.division}] ${hq.name} - ACKNOWLEDGED (${hq.pingLatency})`,
        ]);
        if (index === RESCUE_1122_HEADQUARTERS.length - 1) {
          setTimeout(() => {
            soundEffects.playSuccessDispatch();
            setBroadcastLog((prev) => [
              ...prev,
              `🏥 [TRAUMA BAY] ${selectedHospital.name} - PRE-ALERT DISPATCHED TO ${selectedHospital.assigned1122Station}`,
            ]);
            setIsSimulatingBroadcast(false);
          }, 400);
        }
      }, (index + 1) * 350);
    });
  };

  const handleSave = () => {
    soundEffects.playSuccessDispatch();
    onSaveConfig({
      primarySystem: config.primarySystem, // 1122 always locked
      secondarySystem: selectedSecondary,
      targetHospital: selectedHospital,
      forwardToAll1122Headquarters: forwardAllHQs,
      autoHospitalPreAlert: autoHospitalPreAlert,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg max-h-[90vh] rounded-3xl bg-[#1c1f2a] border border-[#ff334b]/40 shadow-2xl flex flex-col relative overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-[#262a35] bg-[#171b26] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#ff334b]/20 text-[#ff334b] flex items-center justify-center border border-[#ff334b]/40">
              <span className="material-symbols-outlined text-[24px]">crisis_alert</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-black text-sm text-white">
                  Rescue System &amp; Hospital Manager
                </h3>
                <span className="px-2 py-0.5 rounded bg-[#ff334b]/20 border border-[#ff334b]/40 text-[#ffb3b5] text-[9px] font-bold">
                  VICTIM CAD ROUTER
                </span>
              </div>
              <p className="text-[11px] text-[#dfe2f1]/60">
                #1 1122 Locked • Customize Secondary Fleet &amp; Nearest ER Destination
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#262a35] flex items-center justify-center text-[#dfe2f1]/80 hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Locked Rule #1 Alert Banner */}
        <div className="px-4 py-2.5 bg-[#26151b] border-b border-[#ff334b]/30 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[#ff334b] text-[18px] shrink-0">
              lock
            </span>
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-white block truncate">
                PRIORITY #1: Rescue 1122 (Govt Mandatory - LOCKED)
              </span>
              <span className="text-[10px] text-[#ffb3b5]/80">
                1122 cannot be replaced. Secondary fleets &amp; hospitals can be modified below.
              </span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#ff334b] text-white text-[10px] font-black shrink-0">
            FIXED #1
          </span>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-2 bg-[#171b26] border-b border-[#262a35] overflow-x-auto no-scrollbar">
          {[
            { id: 'hospitals' as const, label: 'Nearest Hospital ER', icon: 'local_hospital' },
            { id: 'secondary' as const, label: 'Secondary Fleet', icon: 'swap_horiz' },
            { id: 'headquarters' as const, label: 'All 1122 HQs', icon: 'hub' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                soundEffects.playHapticClick();
                setActiveTabSection(tab.id);
              }}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap flex items-center justify-center gap-1.5 transition-all ${
                activeTabSection === tab.id
                  ? 'bg-[#00f1fd] text-[#00373a] shadow-sm'
                  : 'text-[#dfe2f1]/70 hover:text-white hover:bg-[#262a35]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* TAB 1: NEAREST HOSPITALS */}
          {activeTabSection === 'hospitals' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">
                    Select Nearest Place of Hospital
                  </h4>
                  <p className="text-[11px] text-[#dfe2f1]/60">
                    Rescue 1122 automatically routes you to this ER and alerts its trauma team.
                  </p>
                </div>
                <span className="text-[10px] text-[#4edea3] font-bold font-mono-num">
                  GPS SORTED
                </span>
              </div>

              <div className="space-y-2">
                {HOSPITAL_DESTINATIONS.map((hosp) => {
                  const isSelected = selectedHospital.id === hosp.id;
                  return (
                    <div
                      key={hosp.id}
                      onClick={() => {
                        soundEffects.playHapticClick();
                        setSelectedHospital(hosp);
                      }}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                        isSelected
                          ? 'bg-[#17252f] border-[#00f1fd] shadow-[0_0_16px_rgba(0,241,253,0.25)]'
                          : 'bg-[#171b26] border-[#262a35] hover:border-[#313540]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected
                                ? 'bg-[#00f1fd] text-[#00373a]'
                                : 'bg-[#262a35] text-[#00f1fd]'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              local_hospital
                            </span>
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-display text-xs font-bold text-white truncate">
                                {hosp.name}
                              </span>
                              {isSelected && (
                                <span className="px-1.5 py-0.2 rounded bg-[#00f1fd] text-[#00373a] text-[9px] font-black uppercase">
                                  ACTIVE TARGET
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-[#dfe2f1]/60 block truncate">
                              {hosp.address}
                            </span>
                            <span className="text-[10px] text-[#ffb3b5] font-semibold block mt-0.5">
                              {hosp.traumaLevel}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-[#4edea3] font-mono-num block">
                            {hosp.distance}
                          </span>
                          <span className="text-[11px] text-[#00f1fd] font-extrabold font-mono-num block">
                            {hosp.eta} ETA
                          </span>
                        </div>
                      </div>

                      {/* Associated 1122 station & ICU Beds info */}
                      <div className="mt-2.5 pt-2 border-t border-[#262a35] flex items-center justify-between text-[10px] text-[#dfe2f1]/80">
                        <div className="flex items-center gap-1 text-[#ffb3b5]">
                          <span className="material-symbols-outlined text-[13px]">
                            airport_shuttle
                          </span>
                          <span className="truncate">{hosp.assigned1122Station}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 font-mono-num">
                          <span className="text-[#4edea3] font-bold">{hosp.icuBeds} ICU Beds</span>
                          <span>•</span>
                          <span>Blood Bank Ready</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: SECONDARY RESCUE FLEET REPLACEMENT */}
          {activeTabSection === 'secondary' && (
            <div className="space-y-3">
              <div>
                <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">
                  Replace or Update Secondary Rescue Fleet
                </h4>
                <p className="text-[11px] text-[#dfe2f1]/60">
                  Select which partner service receives backup emergency alerts alongside Rescue 1122.
                </p>
              </div>

              <div className="space-y-2">
                {secondaryOptions.map((svc) => {
                  const isSelected = selectedSecondary.id === svc.id;
                  return (
                    <div
                      key={svc.id}
                      onClick={() => {
                        soundEffects.playHapticClick();
                        setSelectedSecondary(svc);
                      }}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#17252f] border-[#4edea3] shadow-[0_0_16px_rgba(78,222,163,0.2)]'
                          : 'bg-[#171b26] border-[#262a35] hover:border-[#313540]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: `${svc.color}25`,
                              color: svc.color,
                              border: `1px solid ${svc.color}50`,
                            }}
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              {svc.icon}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-display text-xs font-bold text-white truncate">
                                {svc.name}
                              </span>
                              {isSelected && (
                                <span className="px-1.5 py-0.2 rounded bg-[#4edea3] text-[#002113] text-[9px] font-black uppercase">
                                  SELECTED
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-[#dfe2f1]/60 truncate block">
                              {svc.address} • {svc.badge}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0 pl-2">
                          <span className="text-[11px] font-bold text-[#4edea3] font-mono-num block">
                            {svc.distance}
                          </span>
                          <span className="text-[10px] text-[#00f1fd] font-semibold font-mono-num block">
                            {svc.eta}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: ALL 1122 HEADQUARTERS & BROADCAST FORWARD */}
          {activeTabSection === 'headquarters' && (
            <div className="space-y-3">
              {/* Toggle Forwarding to ALL 1122 HQs */}
              <div className="p-3.5 rounded-2xl bg-[#26151b] border border-[#ff334b]/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#ff334b] text-white flex items-center justify-center shadow-[0_0_16px_rgba(255,51,75,0.4)]">
                    <span className="material-symbols-outlined text-[22px]">hub</span>
                  </div>
                  <div>
                    <span className="font-display text-xs font-bold text-white block">
                      Forward Message to ALL 1122 Headquarters
                    </span>
                    <span className="text-[10px] text-[#ffdad6]/80">
                      Dispatches telemetry to Provincial, District &amp; Zonal PSAP Desks
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playHapticClick();
                    setForwardAllHQs(!forwardAllHQs);
                  }}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors relative shrink-0 ${
                    forwardAllHQs ? 'bg-[#ff334b]' : 'bg-[#313540]'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                      forwardAllHQs ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* List of 1122 Command HQs */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#dfe2f1]/70 uppercase tracking-wider block px-1">
                  Active 1122 Command Network ({RESCUE_1122_HEADQUARTERS.length} HQs Synchronized)
                </span>

                {RESCUE_1122_HEADQUARTERS.map((hq) => (
                  <div
                    key={hq.id}
                    className="p-3 rounded-xl bg-[#171b26] border border-[#262a35] flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#ff334b]/20 text-[#ff334b] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px]">cell_tower</span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-white block truncate">
                          {hq.name}
                        </span>
                        <span className="text-[10px] text-[#dfe2f1]/60 truncate block">
                          {hq.division} • {hq.location}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="px-2 py-0.5 rounded bg-[#4edea3]/20 text-[#4edea3] text-[9px] font-bold font-mono-num block">
                        {hq.status}
                      </span>
                      <span className="text-[10px] text-[#00f1fd] font-mono-num font-semibold mt-0.5 block">
                        {hq.pingLatency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Test Forward Broadcast Simulation */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled={isSimulatingBroadcast}
                  onClick={handleSimulateHQForward}
                  className="w-full py-2.5 rounded-xl bg-[#262a35] hover:bg-[#313540] border border-[#ff334b]/50 text-white text-xs font-bold flex items-center justify-center gap-2 active:scale-98 transition-all"
                >
                  <span className="material-symbols-outlined text-[17px] text-[#ff334b] animate-pulse">
                    outgoing_mail
                  </span>
                  <span>
                    {isSimulatingBroadcast
                      ? 'Broadcasting to 1122 Headquarters...'
                      : 'Test Forward CAD to All 1122 Headquarters'}
                  </span>
                </button>

                {broadcastLog.length > 0 && (
                  <div className="mt-2.5 p-2.5 rounded-xl bg-[#0a0e18] border border-[#262a35] font-mono text-[10px] text-[#4edea3] space-y-1">
                    {broadcastLog.map((log, i) => (
                      <div key={i} className="animate-in fade-in">
                        {log}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Hospital Pre-Alert Auto Toggle */}
          <div className="p-3 rounded-2xl bg-[#171b26] border border-[#262a35] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00f1fd] text-[20px]">
                notification_important
              </span>
              <div>
                <span className="text-xs font-bold text-white block">
                  Automatic Hospital ER Trauma Bay Pre-Alert
                </span>
                <span className="text-[10px] text-[#dfe2f1]/60">
                  Pre-reserves ICU resuscitation bay at {selectedHospital.name}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                soundEffects.playHapticClick();
                setAutoHospitalPreAlert(!autoHospitalPreAlert);
              }}
              className={`w-12 h-6 rounded-full p-0.5 transition-colors relative shrink-0 ${
                autoHospitalPreAlert ? 'bg-[#00f1fd]' : 'bg-[#313540]'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-[#00373a] shadow-md transform transition-transform ${
                  autoHospitalPreAlert ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-[#262a35] bg-[#171b26] flex items-center justify-between gap-3">
          <div className="text-[11px] text-[#dfe2f1]/70 truncate">
            Target ER: <strong className="text-white">{selectedHospital.name}</strong> ({selectedHospital.distance})
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#262a35] text-white text-xs font-semibold hover:bg-[#313540] transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#ff334b] to-[#be0035] text-white text-xs font-bold shadow-[0_0_16px_rgba(255,51,75,0.4)] active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">check</span>
              <span>Apply Rescue System</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
