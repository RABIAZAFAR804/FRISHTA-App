import React, { useState, useEffect } from 'react';
import { EmergencyContact } from '../types';
import { soundEffects } from '../utils/audio';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contact: EmergencyContact) => void;
  editingContact?: EmergencyContact | null;
  onOpenPhonePicker?: () => void;
  prefillData?: { name: string; phone: string; relation: string } | null;
}

const RELATION_OPTIONS = [
  'Mother',
  'Father',
  'Spouse',
  'Brother',
  'Sister',
  'Son',
  'Daughter',
  'Family Doctor',
  'Close Friend',
  'Relative',
  'Other',
];

export const ContactFormModal: React.FC<ContactFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingContact,
  onOpenPhonePicker,
  prefillData,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relation, setRelation] = useState('Mother');
  const [customRelation, setCustomRelation] = useState('');
  const [enabledAlert, setEnabledAlert] = useState(true);
  const [isPrimary, setIsPrimary] = useState(false);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setPhone(editingContact.phone);
      if (RELATION_OPTIONS.includes(editingContact.relation)) {
        setRelation(editingContact.relation);
        setCustomRelation('');
      } else {
        setRelation('Other');
        setCustomRelation(editingContact.relation);
      }
      setEnabledAlert(editingContact.enabledAlert !== false);
      setIsPrimary(Boolean(editingContact.isPrimary));
      setNotes(editingContact.notes || '');
    } else if (prefillData) {
      setName(prefillData.name);
      setPhone(prefillData.phone);
      if (RELATION_OPTIONS.includes(prefillData.relation)) {
        setRelation(prefillData.relation);
        setCustomRelation('');
      } else {
        setRelation('Other');
        setCustomRelation(prefillData.relation);
      }
      setEnabledAlert(true);
      setIsPrimary(false);
      setNotes('Imported from phone contacts');
    } else {
      setName('');
      setPhone('');
      setRelation('Mother');
      setCustomRelation('');
      setEnabledAlert(true);
      setIsPrimary(false);
      setNotes('');
    }
    setError(null);
  }, [editingContact, prefillData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter contact full name');
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setError('Please enter a valid cellular number (e.g. +92 300 1234567)');
      return;
    }

    const finalRelation = relation === 'Other' && customRelation.trim() ? customRelation.trim() : relation;

    const contactPayload: EmergencyContact = {
      id: editingContact?.id || `contact-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      relation: finalRelation,
      enabledAlert,
      isPrimary,
      avatarUrl: editingContact?.avatarUrl || '',
      notes: notes.trim() || undefined,
      proximity: editingContact?.proximity || 'Trusted Lifeline',
    };

    soundEffects.playSuccessDispatch();
    onSave(contactPayload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl bg-[#1c1f2a] border border-[#ff334b]/40 shadow-2xl flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#262a35] bg-[#171b26] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#ff334b]/20 text-[#ff334b] flex items-center justify-center border border-[#ff334b]/40">
              <span className="material-symbols-outlined text-[22px]">
                {editingContact ? 'edit' : 'person_add'}
              </span>
            </div>
            <div>
              <h3 className="font-display font-black text-sm text-white">
                {editingContact ? 'Edit Emergency Contact' : 'Add Trusted Emergency Contact'}
              </h3>
              <p className="text-[11px] text-[#dfe2f1]/60">
                Dispatches live GPS accident location to this contact in crisis
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close form"
            className="w-8 h-8 rounded-full bg-[#262a35] flex items-center justify-center text-[#dfe2f1]/80 hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Quick Choose from Contacts action bar (if adding new contact) */}
        {!editingContact && onOpenPhonePicker && (
          <div className="p-3 bg-[#111e29] border-b border-[#00f1fd]/30 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[#00f1fd] text-[18px] shrink-0">
                perm_contact_calendar
              </span>
              <span className="text-xs text-[#dfe2f1]/90 truncate">
                Have phone contacts? Avoid manual typing
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                soundEffects.playHapticClick();
                onOpenPhonePicker();
              }}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#00f1fd] to-[#00a572] text-[#002b30] text-xs font-bold shrink-0 shadow-[0_0_12px_rgba(0,241,253,0.3)] active:scale-95 transition-all flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">contacts</span>
              <span>Choose from Contacts</span>
            </button>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3.5 overflow-y-auto max-h-[75vh]">
          {error && (
            <div className="p-2.5 rounded-xl bg-[#93000a]/30 border border-[#ff334b]/50 text-[#ffdad6] text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#ff334b]">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* Name Field */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#dfe2f1]/80 block mb-1">
              Contact Full Name <span className="text-[#ff334b]">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-[#dfe2f1]/40">
                <span className="material-symbols-outlined text-[18px]">badge</span>
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ammi / Mother, Abu / Father, Fatima, Hamza"
                className="w-full bg-[#171b26] border border-[#313540] rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-[#dfe2f1]/40 focus:outline-none focus:border-[#00f1fd]"
                required
              />
            </div>
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#dfe2f1]/80 block mb-1">
              Cellular Mobile Number <span className="text-[#ff334b]">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-[#dfe2f1]/40">
                <span className="material-symbols-outlined text-[18px]">call</span>
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +92 300 1234567"
                className="w-full bg-[#171b26] border border-[#313540] rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-[#dfe2f1]/40 font-mono-num focus:outline-none focus:border-[#00f1fd]"
                required
              />
            </div>
            <span className="text-[10px] text-[#dfe2f1]/50 mt-1 block">
              Receives instant accident GPS coordinates &amp; live 1122 dispatch tracking link.
            </span>
          </div>

          {/* Relationship Selection */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#dfe2f1]/80 block mb-1">
              Relationship / Role
            </label>
            <select
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              className="w-full bg-[#171b26] border border-[#313540] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#00f1fd]"
            >
              {RELATION_OPTIONS.map((rel) => (
                <option key={rel} value={rel}>
                  {rel}
                </option>
              ))}
            </select>
          </div>

          {relation === 'Other' && (
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#dfe2f1]/80 block mb-1">
                Specify Custom Relationship
              </label>
              <input
                type="text"
                value={customRelation}
                onChange={(e) => setCustomRelation(e.target.value)}
                placeholder="e.g. Neighbor, Guardian, Boss"
                className="w-full bg-[#171b26] border border-[#313540] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f1fd]"
              />
            </div>
          )}

          {/* Toggle: Receive Accident Alert */}
          <div className="p-3 rounded-2xl bg-[#171b26] border border-[#262a35] flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="material-symbols-outlined text-[#4edea3] text-[20px]">
                notifications_active
              </span>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block">
                  Send Crash GPS Location Alert
                </span>
                <span className="text-[10px] text-[#dfe2f1]/60 block truncate">
                  Auto-SMS dispatched if crash is uncancelled after 10s
                </span>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={enabledAlert}
              onClick={() => {
                soundEffects.playHapticClick();
                setEnabledAlert(!enabledAlert);
              }}
              className={`w-12 h-6 rounded-full p-0.5 transition-colors relative shrink-0 ${
                enabledAlert ? 'bg-[#4edea3]' : 'bg-[#313540]'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-[#002113] shadow-md transform transition-transform ${
                  enabledAlert ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle: Primary Contact */}
          <div className="p-3 rounded-2xl bg-[#171b26] border border-[#262a35] flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="material-symbols-outlined text-[#ff334b] text-[20px]">
                star
              </span>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block">
                  Set as Primary Lifeline
                </span>
                <span className="text-[10px] text-[#dfe2f1]/60 block truncate">
                  First priority for Rescue 1122 automated dispatch calls
                </span>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={isPrimary}
              onClick={() => {
                soundEffects.playHapticClick();
                setIsPrimary(!isPrimary);
              }}
              className={`w-12 h-6 rounded-full p-0.5 transition-colors relative shrink-0 ${
                isPrimary ? 'bg-[#ff334b]' : 'bg-[#313540]'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  isPrimary ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Notes / Special Instructions */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#dfe2f1]/80 block mb-1">
              Emergency Notes / Proximity (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Has spare keys, Doctor at General Hospital"
              className="w-full bg-[#171b26] border border-[#313540] rounded-xl px-3 py-2 text-xs text-white placeholder-[#dfe2f1]/40 focus:outline-none focus:border-[#00f1fd]"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#262a35]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#262a35] text-white text-xs font-semibold hover:bg-[#313540] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff334b] to-[#be0035] text-white text-xs font-bold shadow-[0_0_16px_rgba(255,51,75,0.4)] active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              <span>{editingContact ? 'Update Contact' : 'Save Emergency Contact'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
