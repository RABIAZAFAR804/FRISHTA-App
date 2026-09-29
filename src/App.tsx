import { useState } from 'react';
import { TabType, UserRoleMode, Responder, EmergencyService, RescueSystemConfig, EmergencyContact } from './types';
import { DEFAULT_RESCUE_CONFIG } from './data/emergencyServices';
import { loadEmergencyContacts, saveEmergencyContacts } from './data/initialContacts';
import { soundEffects } from './utils/audio';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { MonitorView } from './components/MonitorView';
import { EmergencyView } from './components/EmergencyView';
import { RadarView } from './components/RadarView';
import { ServicesHubView } from './components/ServicesHubView';
import { MedicalCardView } from './components/MedicalCardView';
import { EmergencyContactsView } from './components/EmergencyContactsView';
import { ContactFormModal } from './components/ContactFormModal';
import { ContactPermissionModal } from './components/ContactPermissionModal';
import { PhoneContactsPickerModal } from './components/PhoneContactsPickerModal';
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

  // Emergency Contacts state with local storage persistence
  const [contacts, setContacts] = useState<EmergencyContact[]>(loadEmergencyContacts);
  const [isContactFormModalOpen, setIsContactFormModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);
  const [isPhonePickerOpen, setIsPhonePickerOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [prefillContactData, setPrefillContactData] = useState<{ name: string; phone: string; relation: string } | null>(null);

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
    const alertCount = contacts.filter((c) => c.enabledAlert !== false).length;
    showToast(`🚑 1122 Dispatched & SMS GPS sent to ${alertCount} Emergency Contacts!`);
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

  // Contacts handlers
  const handleSaveContact = (savedContact: EmergencyContact) => {
    setContacts((prev) => {
      const existsIndex = prev.findIndex((c) => c.id === savedContact.id);
      let updated: EmergencyContact[];
      if (existsIndex >= 0) {
        updated = [...prev];
        updated[existsIndex] = savedContact;
      } else {
        if (savedContact.isPrimary) {
          prev = prev.map((c) => ({ ...c, isPrimary: false }));
        }
        updated = [savedContact, ...prev];
      }

      if (savedContact.isPrimary) {
        updated = updated.map((c) =>
          c.id === savedContact.id ? { ...c, isPrimary: true } : { ...c, isPrimary: false }
        );
      }

      saveEmergencyContacts(updated);
      return updated;
    });

    setIsContactFormModalOpen(false);
    setEditingContact(null);
    setPrefillContactData(null);
    showToast(`✓ Emergency Lifeline Saved: ${savedContact.name} (${savedContact.relation})`);
  };

  const handleDeleteContact = (contactId: string) => {
    setContacts((prev) => {
      const updated = prev.filter((c) => c.id !== contactId);
      saveEmergencyContacts(updated);
      return updated;
    });
  };

  const handleToggleContactAlert = (contactId: string) => {
    setContacts((prev) => {
      const updated = prev.map((c) => {
        if (c.id === contactId) {
          const nextState = c.enabledAlert === false;
          showToast(nextState ? `✓ Crash GPS Alert ENABLED for ${c.name}` : `Crash Alert MUTED for ${c.name}`);
          return { ...c, enabledAlert: nextState };
        }
        return c;
      });
      saveEmergencyContacts(updated);
      return updated;
    });
  };

  const handleOpenAddContactModal = () => {
    setEditingContact(null);
    setPrefillContactData(null);
    setIsContactFormModalOpen(true);
  };

  const handleOpenEditContactModal = (contact: EmergencyContact) => {
    setEditingContact(contact);
    setPrefillContactData(null);
    setIsContactFormModalOpen(true);
  };

  const handleClearAllContacts = () => {
    setContacts([]);
    saveEmergencyContacts([]);
    showToast('✓ All temporary emergency contacts cleared');
  };

  // Check if browser native Contact Picker API is available
  const isNativePickerSupported =
    typeof navigator !== 'undefined' &&
    'contacts' in navigator &&
    'ContactsManager' in window &&
    'select' in (navigator as any).contacts;

  const triggerContactSelection = async () => {
    if (isNativePickerSupported) {
      try {
        const props = ['name', 'tel'];
        const selected = await (navigator as any).contacts.select(props, { multiple: false });
        if (selected && selected.length > 0 && selected[0]) {
          const picked = selected[0];
          const rawName = picked.name?.[0] || 'Phone Contact';
          const rawTel = picked.tel?.[0] || '';
          setPrefillContactData({
            name: rawName,
            phone: rawTel,
            relation: 'Family',
          });
          setEditingContact(null);
          setIsContactFormModalOpen(true);
          showToast(`✓ Selected ${rawName} directly from device contacts`);
          return;
        }
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
        console.warn('Native picker error:', err);
      }
    }
    setIsPhonePickerOpen(true);
  };

  const handleChooseFromPhone = async () => {
    // Directly launch phone contact picker if supported by mobile browser
    if (isNativePickerSupported) {
      await triggerContactSelection();
    } else {
      setIsPhonePickerOpen(true);
    }
  };

  const handleGrantPermission = () => {
    setIsPermissionModalOpen(false);
    triggerContactSelection();
  };

  const handleDenyPermission = () => {
    setIsPermissionModalOpen(false);
    handleOpenAddContactModal();
  };

  const handleSelectFromPhoneBook = (data: { name: string; phone: string; relation: string }) => {
    setPrefillContactData(data);
    setEditingContact(null);
    setIsPhonePickerOpen(false);
    setIsContactFormModalOpen(true);
    showToast(`✓ Selected ${data.name}. Review details and save.`);
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
            contacts={contacts}
            onOpenRescueConfigModal={() => setIsRescueConfigModalOpen(true)}
            onOpenContactsTab={() => setActiveTab('contacts')}
            onAddContact={handleOpenAddContactModal}
            onToggleUserRole={setUserRole}
            onTriggerEmergency={handleTriggerSOS}
            onOpenWitnessModal={() => setIsWitnessModalOpen(true)}
          />
        )}

        {activeTab === 'contacts' && (
          <EmergencyContactsView
            contacts={contacts}
            onAddContact={handleOpenAddContactModal}
            onEditContact={handleOpenEditContactModal}
            onDeleteContact={handleDeleteContact}
            onClearAllContacts={handleClearAllContacts}
            onToggleAlert={handleToggleContactAlert}
            onChooseFromPhone={handleChooseFromPhone}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'emergency' && (
          <EmergencyView
            rescueConfig={rescueConfig}
            contacts={contacts}
            onCancelEmergency={handleCancelEmergency}
            onDispatchConfirmed={handleDispatchConfirmed}
            isAudioMuted={isAudioMuted}
          />
        )}

        {activeTab === 'radar' && (
          <RadarView
            contacts={contacts}
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

        {activeTab === 'medical' && (
          <MedicalCardView
            contacts={contacts}
            onAddContact={handleOpenAddContactModal}
            onEditContact={handleOpenEditContactModal}
            onDeleteContact={handleDeleteContact}
            onChooseFromPhone={handleChooseFromPhone}
            onShowToast={showToast}
          />
        )}
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

      {/* Contact Form Modal (Add / Edit) */}
      <ContactFormModal
        isOpen={isContactFormModalOpen}
        onClose={() => {
          setIsContactFormModalOpen(false);
          setEditingContact(null);
          setPrefillContactData(null);
        }}
        onSave={handleSaveContact}
        editingContact={editingContact}
        onOpenPhonePicker={handleChooseFromPhone}
        prefillData={prefillContactData}
      />

      {/* Contact Permission Modal */}
      <ContactPermissionModal
        isOpen={isPermissionModalOpen}
        onGrantPermission={handleGrantPermission}
        onDenyPermission={handleDenyPermission}
      />

      {/* Phone Contacts Picker Modal */}
      <PhoneContactsPickerModal
        isOpen={isPhonePickerOpen}
        onClose={() => setIsPhonePickerOpen(false)}
        onSelectContact={handleSelectFromPhoneBook}
        onTriggerNativePicker={triggerContactSelection}
        isNativePickerSupported={Boolean(isNativePickerSupported)}
      />

      {/* Bottom Sticky Tab Navigation */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isEmergencyActive={isEmergencyActive}
        contactsCount={contacts.filter((c) => c.enabledAlert !== false).length}
      />
    </div>
  );
}
