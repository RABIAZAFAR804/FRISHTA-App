import { useState } from 'react';
import { TabType, UserRoleMode, Responder, EmergencyService, RescueSystemConfig } from './types';
import { DEFAULT_RESCUE_CONFIG } from './data/emergencyServices';
import { soundEffects } from './utils/audio';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { MonitorView } from './components/MonitorView';
import { EmergencyView } from './components/EmergencyView';
import { RadarView } from './components/RadarView';
import { ServicesHubView } from './components/ServicesHubView';
import { MedicalCardView } from './components/MedicalCardView';
import { CallModal, RouteModal, WitnessModal } from './components/Modals';
import { RescueSystemManagerModal } from './components/RescueSystemManagerModal';

type CallOrRouteTarget = (Responder | EmergencyService) & {
  role?: string;
  affiliation?: string;
  badge?: string;
  avatarUrl?: string;
  icon?: string;
  color?: string;
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('monitor');
  const [userRole, setUserRole] = useState<UserRoleMode>('victim');
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // Victim's Configured Rescue System (#1 1122 Locked, Secondary Replaceable, Nearest Hospital)
  const [rescueConfig, setRescueConfig] = useState<RescueSystemConfig>(DEFAULT_RESCUE_CONFIG);
  const [isRescueConfigModalOpen, setIsRescueConfigModalOpen] = useState(false);

  // Modals state
  const [activeCallTarget, setActiveCallTarget] = useState<CallOrRouteTarget | null>(null);
  const [activeRouteTarget, setActiveRouteTarget] = useState<CallOrRouteTarget | null>(null);
  const [isWitnessModalOpen, setIsWitnessModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3400);
  };

  const handleToggleMute = () => {
    const nextMute = !isAudioMuted;
    setIsAudioMuted(nextMute);
    soundEffects.isMuted = nextMute;
    if (!nextMute) {
      soundEffects.playHapticClick();
    }
  };

  const handleTriggerSOS = () => {
    setIsEmergencyActive(true);
    setActiveTab('emergency');
    showToast('🚨 Severe Crash Triggered - 10s Autonomous CAD Buffer Engaged');
  };

  const handleCancelEmergency = () => {
    setIsEmergencyActive(false);
    setActiveTab('monitor');
    showToast('✓ Autonomous CAD Dispatch Aborted. Standby Active.');
  };

  const handleDispatchConfirmed = () => {
    setIsEmergencyActive(true);
    setActiveTab('radar');
    showToast(`🚑 1122 + ${rescueConfig.secondarySystem.name} Dispatched to ${rescueConfig.targetHospital.name}!`);
  };

  const handleWitnessSubmit = (details: { casualties: string; severity: string; notes: string }) => {
    setIsWitnessModalOpen(false);
    setIsEmergencyActive(true);
    setActiveTab('radar');
    showToast(`✓ Multi-Agency CAD Dispatched: ${details.casualties} • Target: ${rescueConfig.targetHospital.name}`);
  };

  const handleBroadcastAllServices = () => {
    setIsEmergencyActive(true);
    setActiveTab('radar');
    showToast(`📡 Simultaneous CAD Broadcast: Rescue 1122 (All HQs), ${rescueConfig.secondarySystem.name} & ${rescueConfig.targetHospital.name}!`);
  };

  return (
    <div className="min-h-screen bg-[#0D0D11] text-[#dfe2f1] flex flex-col justify-between selection:bg-[#ff334b] selection:text-white relative overflow-x-hidden">
      {/* Tactical Top Bar */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onTriggerSOS={handleTriggerSOS}
        isAudioMuted={isAudioMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Screen Router */}
      <main className="flex-1 w-full pt-18">
        {activeTab === 'monitor' && (
          <MonitorView
            userRole={userRole}
            rescueConfig={rescueConfig}
            onOpenRescueConfigModal={() => setIsRescueConfigModalOpen(true)}
            onToggleUserRole={setUserRole}
            onTriggerEmergency={handleTriggerSOS}
            onOpenWitnessModal={() => setIsWitnessModalOpen(true)}
          />
        )}

        {activeTab === 'emergency' && (
          <EmergencyView
            rescueConfig={rescueConfig}
            onCancelEmergency={handleCancelEmergency}
            onDispatchConfirmed={handleDispatchConfirmed}
            isAudioMuted={isAudioMuted}
          />
        )}

        {activeTab === 'radar' && (
          <RadarView
            onOpenCall={(responder) => setActiveCallTarget(responder)}
            onOpenRoute={(responder) => setActiveRouteTarget(responder)}
            onOpenServiceCall={(service) => setActiveCallTarget(service)}
            onOpenServiceRoute={(service) => setActiveRouteTarget(service)}
          />
        )}

        {activeTab === 'services' && (
          <ServicesHubView
            rescueConfig={rescueConfig}
            onOpenRescueConfigModal={() => setIsRescueConfigModalOpen(true)}
            onOpenServiceRoute={(service) => setActiveRouteTarget(service)}
            onOpenServiceCall={(service) => setActiveCallTarget(service)}
            onBroadcastAllServices={handleBroadcastAllServices}
          />
        )}

        {activeTab === 'medical' && <MedicalCardView />}
      </main>

      {/* Floating System Micro-Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#1c1f2a] border border-[#00f1fd]/50 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 max-w-sm text-center animate-in slide-in-from-top duration-200">
          <span className="material-symbols-outlined text-[16px] text-[#00f1fd]">info</span>
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* Interactive Modals */}
      <CallModal
        target={activeCallTarget}
        onClose={() => setActiveCallTarget(null)}
      />

      <RouteModal
        target={activeRouteTarget}
        onClose={() => setActiveRouteTarget(null)}
      />

      <WitnessModal
        isOpen={isWitnessModalOpen}
        onClose={() => setIsWitnessModalOpen(false)}
        onSubmit={handleWitnessSubmit}
      />

      {/* Victim's Rescue System & Nearest Hospital Manager Modal */}
      <RescueSystemManagerModal
        isOpen={isRescueConfigModalOpen}
        onClose={() => setIsRescueConfigModalOpen(false)}
        config={rescueConfig}
        onSaveConfig={(newConfig) => {
          setRescueConfig(newConfig);
          showToast(`✓ Rescue Updated: #1 1122 (Fixed) + #2 ${newConfig.secondarySystem.name} • Destination: ${newConfig.targetHospital.name}`);
        }}
      />

      {/* Bottom Sticky Tab Navigation */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isEmergencyActive={isEmergencyActive}
      />
    </div>
  );
}
