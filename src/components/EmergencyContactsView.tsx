import React, { useState } from 'react';
import { EmergencyContact } from '../types';
import { soundEffects } from '../utils/audio';

interface EmergencyContactsViewProps {
  contacts: EmergencyContact[];
  onAddContact: () => void;
  onEditContact: (contact: EmergencyContact) => void;
  onDeleteContact: (contactId: string) => void;
  onClearAllContacts?: () => void;
  onToggleAlert: (contactId: string) => void;
  onChooseFromPhone: () => void;
  onShowToast: (message: string) => void;
}

export const EmergencyContactsView: React.FC<EmergencyContactsViewProps> = ({
  contacts,
  onAddContact,
  onEditContact,
  onDeleteContact,
  onClearAllContacts,
  onToggleAlert,
  onChooseFromPhone,
  onShowToast,
}) => {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showSmsPreview, setShowSmsPreview] = useState(false);

  const activeAlertCount = contacts.filter((c) => c.enabledAlert !== false).length;

  const handleTestSms = (contact: EmergencyContact) => {
    soundEffects.playHapticClick();
    onShowToast(`📲 Simulated Accident GPS Alert sent to ${contact.name} (${contact.phone})`);
  };

  const handleDelete = (contact: EmergencyContact) => {
    soundEffects.playHapticClick();
    onDeleteContact(contact.id);
    setDeleteConfirmId(null);
    onShowToast(`Removed ${contact.name} from emergency contacts`);
  };

  const handleClearAll = () => {
    soundEffects.playHapticClick();
    if (onClearAllContacts) {
      onClearAllContacts();
      setShowClearConfirm(false);
      onShowToast('✓ All temporary contacts removed');
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2 px-4 max-w-xl mx-auto space-y-4 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#1c1f2a] border border-[#ff334b]/40 p-5 shadow-2xl">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#ff334b]/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#00f1fd]/15 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#ff334b]/20 border border-[#ff334b]/40 text-[#ff334b] flex items-center justify-center shadow-[0_0_12px_rgba(255,51,75,0.3)]">
                <span className="material-symbols-outlined text-[24px]">contact_phone</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display font-black text-lg text-white">Emergency Contacts</h2>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4edea3]/20 border border-[#4edea3]/40 text-[#4edea3] font-bold font-mono-num">
                    PHONE DIRECT
                  </span>
                </div>
                <p className="text-xs text-[#dfe2f1]/70">
                  Select directly from your phone contact list or enter family lifelines
                </p>
              </div>
            </div>

            {contacts.length > 0 && onClearAllContacts && (
              <div>
                {showClearConfirm ? (
                  <div className="flex items-center gap-1.5 bg-[#93000a]/40 p-1 rounded-xl border border-[#ff334b]/40">
                    <button
                      type="button"
                      onClick={handleClearAll}
                      className="px-2 py-0.5 rounded-lg bg-[#ff334b] text-white text-[10px] font-bold active:scale-95"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowClearConfirm(false)}
                      className="px-1.5 py-0.5 rounded-lg bg-[#262a35] text-white text-[10px]"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowClearConfirm(true)}
                    className="text-[10px] px-2 py-1 rounded-lg bg-[#262a35] text-[#ffb3b5] hover:bg-[#93000a]/30 transition-colors flex items-center gap-1 font-semibold"
                    title="Remove all contacts"
                  >
                    <span className="material-symbols-outlined text-[12px]">delete_sweep</span>
                    <span>Clear All</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="p-2.5 rounded-xl bg-[#171b26] border border-[#262a35] flex flex-col">
              <span className="text-[9px] text-[#dfe2f1]/60 uppercase font-semibold">
                PHONE CONTACTS
              </span>
              <span className="font-display text-base font-black text-white font-mono-num mt-0.5">
                {contacts.length}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#171b26] border border-[#262a35] flex flex-col">
              <span className="text-[9px] text-[#4edea3] uppercase font-semibold">
                ALERT ARMED
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
                <span className="font-display text-base font-black text-[#4edea3] font-mono-num">
                  {activeAlertCount}/{contacts.length}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#171b26] border border-[#262a35] flex flex-col">
              <span className="text-[9px] text-[#ff334b] uppercase font-semibold">
                1122 DISPATCH
              </span>
              <span className="font-display text-xs font-bold text-white mt-1 truncate">
                SYNCED
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons: Choose from Phone Contacts & Add Contact */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => {
            soundEffects.playHapticClick();
            onChooseFromPhone();
          }}
          className="min-h-[52px] px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-[#00f1fd] to-[#00a572] text-[#002b30] font-display font-black text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,241,253,0.35)] active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">contacts</span>
          <span>Access Phone Contacts</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEffects.playHapticClick();
            onAddContact();
          }}
          className="min-h-[52px] px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-[#ff334b] to-[#be0035] text-white font-display font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_18px_rgba(255,51,75,0.35)] active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          <span>Add Contact</span>
        </button>
      </div>

      {/* Explanatory 10-Second Auto-Alert Rule Banner */}
      <div className="p-3.5 rounded-2xl bg-[#171b26] border border-[#313540] flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-[#4edea3]/20 text-[#4edea3] flex items-center justify-center shrink-0 border border-[#4edea3]/40 mt-0.5">
          <span className="material-symbols-outlined text-[18px]">timer</span>
        </div>
        <div className="flex-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white">10-Second Automatic Dispatch Rule</span>
            <button
              type="button"
              onClick={() => setShowSmsPreview(!showSmsPreview)}
              className="text-[11px] text-[#00f1fd] font-semibold hover:underline"
            >
              {showSmsPreview ? 'Hide SMS' : 'View Sample SMS'}
            </button>
          </div>
          <p className="text-[#dfe2f1]/70 text-[11px] mt-0.5 leading-relaxed">
            When a bike crash is detected and not cancelled within 10s, live GPS coordinates are sent via SMS to all saved contacts below marked with{' '}
            <strong className="text-[#4edea3]">🟢 WILL RECEIVE ALERT</strong>, simultaneously with Rescue 1122 dispatch.
          </p>
        </div>
      </div>

      {/* Simulated SMS Alert Preview Dialog / Drawer */}
      {showSmsPreview && (
        <div className="p-4 rounded-2xl bg-[#0e121d] border border-[#00f1fd]/40 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#00f1fd] font-mono-num flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">sms</span>
              AUTOMATIC EMERGENCY SMS PAYLOAD
            </span>
            <span className="text-[10px] text-[#4edea3] font-bold">100% CAD COMPATIBLE</span>
          </div>
          <div className="p-3 rounded-xl bg-[#171b26] border border-[#262a35] font-mono text-[11px] text-[#dfe2f1] leading-relaxed">
            &ldquo;🚨 <strong className="text-white">FARISHTA CRITICAL ACCIDENT ALERT:</strong> Ahmed Raza had a high-impact bike accident near Main Boulevard, Gulberg, Lahore (31.5204° N, 74.3587° E). Rescue 1122 dispatched. Nearest ER: Services Hospital. Track live ambulance &amp; responder location:{' '}
            <span className="text-[#00f1fd] underline">https://farishta.app/track/CR-88219</span>&rdquo;
          </div>
        </div>
      )}

      {/* Contacts List Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#dfe2f1]/70">
            Saved Emergency Contacts ({contacts.length})
          </span>
          <span className="text-[11px] text-[#4edea3] font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
            <span>{activeAlertCount} will receive crash GPS</span>
          </span>
        </div>

        {contacts.length === 0 ? (
          <div className="p-8 rounded-3xl bg-[#1c1f2a] border border-[#262a35] text-center space-y-3.5">
            <div className="w-14 h-14 rounded-full bg-[#00f1fd]/20 text-[#00f1fd] flex items-center justify-center mx-auto border border-[#00f1fd]/40">
              <span className="material-symbols-outlined text-[30px]">contact_phone</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-black text-white text-sm">
                No Emergency Contacts Added Yet
              </h4>
              <p className="text-xs text-[#dfe2f1]/60 max-w-sm mx-auto leading-relaxed">
                Connect your real phone contacts directly or add parents, siblings, and family members to receive instant accident GPS alerts.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-2 pt-1 max-w-xs mx-auto">
              <button
                type="button"
                onClick={onChooseFromPhone}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00f1fd] to-[#00a572] text-[#002b30] text-xs font-black shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">contacts</span>
                <span>Access Phone Contacts</span>
              </button>
              <button
                type="button"
                onClick={onAddContact}
                className="w-full py-2.5 px-4 rounded-xl bg-[#262a35] hover:bg-[#313540] text-white text-xs font-bold border border-[#313540] flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">person_add</span>
                <span>Add Manually</span>
              </button>
            </div>
          </div>
        ) : (
          contacts.map((contact) => {
            const isAlertOn = contact.enabledAlert !== false;

            return (
              <div
                key={contact.id}
                className={`relative overflow-hidden rounded-2xl bg-[#1c1f2a] border transition-all p-4 space-y-3 shadow-md ${
                  isAlertOn ? 'border-[#262a35] hover:border-[#00f1fd]/50' : 'border-[#313540]/60 opacity-80'
                }`}
              >
                {/* Top Row: Avatar, Name, Relationship, Primary Badge, and Quick Dial */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {contact.avatarUrl ? (
                      <img
                        src={contact.avatarUrl}
                        alt={contact.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-[#313540] shrink-0"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff334b] to-[#be0035] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-md">
                        {contact.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-display font-bold text-sm text-white truncate">
                          {contact.name}
                        </span>
                        <span className="text-xs text-[#dfe2f1]/60">({contact.relation})</span>
                        {contact.isPrimary && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full bg-[#ff334b]/20 border border-[#ff334b]/40 text-[#ffb3b5] text-[9px] font-bold">
                            <span
                              className="material-symbols-outlined text-[10px]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              star
                            </span>
                            PRIMARY
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#00f1fd] tracking-wide font-mono-num font-semibold mt-0.5">
                        {contact.phone}
                      </p>

                      {contact.notes && (
                        <p className="text-[10px] text-[#dfe2f1]/60 mt-0.5 truncate max-w-[240px]">
                          {contact.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Top Right Quick Actions: Call & Test SMS */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={`tel:${contact.phone}`}
                      onClick={() => soundEffects.playHapticClick()}
                      title={`Call ${contact.name}`}
                      className="w-9 h-9 rounded-full bg-[#4edea3] text-[#002113] flex items-center justify-center shadow-md active:scale-95 transition-transform hover:brightness-110"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        call
                      </span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleTestSms(contact)}
                      title={`Send simulated accident SMS to ${contact.name}`}
                      className="w-9 h-9 rounded-full bg-[#262a35] text-white flex items-center justify-center hover:bg-[#313540] active:scale-95 transition-transform"
                    >
                      <span className="material-symbols-outlined text-[18px]">sms</span>
                    </button>
                  </div>
                </div>

                {/* Middle Alert Status Bar: Clearly shows whether this contact receives the alert */}
                <div className="p-2.5 rounded-xl bg-[#171b26] border border-[#262a35] flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    {isAlertOn ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] shadow-[0_0_8px_rgba(78,222,163,0.8)] animate-pulse shrink-0" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#dfe2f1]/40 shrink-0" />
                    )}

                    <div className="min-w-0">
                      <span
                        className={`text-xs font-bold block truncate ${
                          isAlertOn ? 'text-[#4edea3]' : 'text-[#dfe2f1]/50'
                        }`}
                      >
                        {isAlertOn ? 'Will Receive Accident Alert 🟢' : 'Alert Muted (Excluded)'}
                      </span>
                      <span className="text-[10px] text-[#dfe2f1]/50 block truncate">
                        {isAlertOn
                          ? 'Automated SMS & live GPS sent if crash > 10s'
                          : 'Will NOT receive automated crash messages'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={isAlertOn}
                    onClick={() => {
                      soundEffects.playHapticClick();
                      onToggleAlert(contact.id);
                    }}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors relative shrink-0 ${
                      isAlertOn ? 'bg-[#4edea3]' : 'bg-[#313540]'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-[#002113] shadow-md transform transition-transform ${
                        isAlertOn ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Bottom Row: Edit & Remove Controls */}
                <div className="flex items-center justify-between pt-1 border-t border-[#262a35] text-xs">
                  <span className="text-[10px] text-[#dfe2f1]/50 font-mono-num">
                    {contact.proximity || 'Trusted Lifeline'}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        soundEffects.playHapticClick();
                        onEditContact(contact);
                      }}
                      className="px-3 py-1 rounded-lg bg-[#262a35] hover:bg-[#313540] text-[#dfe2f1] text-[11px] font-semibold transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">edit</span>
                      <span>Edit</span>
                    </button>

                    {deleteConfirmId === contact.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleDelete(contact)}
                          className="px-2.5 py-1 rounded-lg bg-[#ff334b] text-white text-[11px] font-bold active:scale-95 transition-all"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-2 py-1 rounded-lg bg-[#262a35] text-[#dfe2f1] text-[11px]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          soundEffects.playHapticClick();
                          setDeleteConfirmId(contact.id);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#262a35] hover:bg-[#93000a]/50 text-[#ffb3b5] text-[11px] font-semibold transition-colors flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">delete</span>
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
