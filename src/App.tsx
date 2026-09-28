import { useState } from 'react';
import { TabType, UserRoleMode, Responder } from './types';
import { soundEffects } from './utils/audio';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { MonitorView } from './components/MonitorView';
import { EmergencyView } from './components/EmergencyView';
import { RadarView } from './components/RadarView';
import { MedicalCardView } from './components/MedicalCardView';
import { CallModal, RouteModal, WitnessModal } from './components/Modals';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('monitor');
  const [userRole, setUserRole] = useState<UserRoleMode>('victim');
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // Modals state
  const [activeCallResponder, setActiveCallResponder] = useState<Responder | null>(null);
  const [activeRouteResponder, setActiveRouteResponder] = useState<Responder | null>(null);
  const [isWitnessModalOpen, setIsWitnessModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
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
    showToast('🚑 Rescue 1122 CAD Ticket #CR-88219 Created & Farishta Pings Active!');
  };

  const handleWitnessSubmit = (details: { casualties: string; severity: string; notes: string }) => {
    setIsWitnessModalOpen(false);
    setIsEmergencyActive(true);
    setActiveTab('radar');
    showToast(`✓ Witness Report Dispatched: ${details.casualties} • CAD #CR-88219`);
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
            onToggleUserRole={setUserRole}
            onTriggerEmergency={handleTriggerSOS}
            onOpenWitnessModal={() => setIsWitnessModalOpen(true)}
          />
        )}

        {activeTab === 'emergency' && (
          <EmergencyView
            onCancelEmergency={handleCancelEmergency}
            onDispatchConfirmed={handleDispatchConfirmed}
            isAudioMuted={isAudioMuted}
          />
        )}

        {activeTab === 'radar' && (
          <RadarView
            onOpenCall={(responder) => setActiveCallResponder(responder)}
            onOpenRoute={(responder) => setActiveRouteResponder(responder)}
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
        responder={activeCallResponder}
        onClose={() => setActiveCallResponder(null)}
      />

      <RouteModal
        responder={activeRouteResponder}
        onClose={() => setActiveRouteResponder(null)}
      />

      <WitnessModal
        isOpen={isWitnessModalOpen}
        onClose={() => setIsWitnessModalOpen(false)}
        onSubmit={handleWitnessSubmit}
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
