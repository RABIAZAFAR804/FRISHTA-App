import React, { useRef, useState } from 'react';
import { parseVCard } from '../data/initialContacts';
import { soundEffects } from '../utils/audio';

interface PhoneContactsPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectContact: (contact: { name: string; phone: string; relation: string }) => void;
  onTriggerNativePicker?: () => void;
  isNativePickerSupported?: boolean;
}

export const PhoneContactsPickerModal: React.FC<PhoneContactsPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectContact,
  onTriggerNativePicker,
  isNativePickerSupported = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [importedList, setImportedList] = useState<Array<{ name: string; phone: string }>>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        const parsed = parseVCard(text);
        if (parsed.length > 0) {
          soundEffects.playSuccessDispatch();
          setImportedList(parsed);
          setErrorMsg(null);
        } else {
          setErrorMsg('No valid contacts found in the selected file.');
        }
      }
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read contacts file from device.');
    };
    reader.readAsText(file);
  };

  const handleSelectOne = (item: { name: string; phone: string }) => {
    soundEffects.playHapticClick();
    onSelectContact({
      name: item.name,
      phone: item.phone,
      relation: 'Family',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl bg-[#1c1f2a] border border-[#00f1fd]/40 shadow-2xl flex flex-col max-h-[85vh] relative overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#262a35] bg-[#171b26] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#00f1fd]/20 text-[#00f1fd] flex items-center justify-center border border-[#00f1fd]/40">
              <span className="material-symbols-outlined text-[22px]">contacts</span>
            </div>
            <div>
              <h3 className="font-display font-black text-sm text-white">Direct Phone Contacts</h3>
              <p className="text-[11px] text-[#dfe2f1]/60">
                Access your real phone contact list directly
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close contacts picker"
            className="w-8 h-8 rounded-full bg-[#262a35] flex items-center justify-center text-[#dfe2f1]/80 hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Option 1: Native Phone Contact Picker */}
          <div className="p-4 rounded-2xl bg-[#171b26] border border-[#00f1fd]/40 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#00f1fd]/20 text-[#00f1fd] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">smartphone</span>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white">Direct Mobile Contact List</h4>
                <p className="text-[10px] text-[#dfe2f1]/60">
                  {isNativePickerSupported
                    ? 'Supported: Launches your device contacts app directly'
                    : 'Available on Android Chrome, Edge, and supported mobile web browsers'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                soundEffects.playHapticClick();
                if (onTriggerNativePicker) {
                  onTriggerNativePicker();
                }
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#00f1fd] to-[#00a572] text-[#002b30] font-display font-black text-xs flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(0,241,253,0.35)] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              <span>Open Phone Contacts List</span>
            </button>
          </div>

          {/* Option 2: Import from Phone Contacts File (.vcf) */}
          <div className="p-4 rounded-2xl bg-[#171b26] border border-[#262a35] space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#4edea3]/20 text-[#4edea3] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">folder_shared</span>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white">Import from Phone Contacts (.vcf)</h4>
                <p className="text-[10px] text-[#dfe2f1]/60">
                  Works on iOS &amp; Android: Select exported phone contacts file directly
                </p>
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept=".vcf,text/vcard,text/x-vcard"
              onChange={handleFileUpload}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2.5 px-4 rounded-xl bg-[#262a35] hover:bg-[#313540] text-white text-xs font-bold flex items-center justify-center gap-2 border border-[#313540] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-[#4edea3]">upload_file</span>
              <span>Choose Phone Contacts File (.vcf)</span>
            </button>

            {errorMsg && (
              <p className="text-[11px] text-[#ffb3b5] bg-[#93000a]/20 p-2 rounded-lg border border-[#ff334b]/30">
                {errorMsg}
              </p>
            )}
          </div>

          {/* Display Imported Contacts if any */}
          {importedList.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#262a35]">
              <span className="text-xs font-bold text-[#4edea3] block">
                Found {importedList.length} Contacts in Phone File:
              </span>
              <div className="max-h-48 overflow-y-auto space-y-1.5">
                {importedList.map((contact, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectOne(contact)}
                    className="p-2.5 rounded-xl bg-[#1c1f2a] border border-[#262a35] hover:border-[#00f1fd] flex items-center justify-between cursor-pointer group active:scale-98 transition-all"
                  >
                    <div>
                      <span className="text-xs font-bold text-white group-hover:text-[#00f1fd] block">
                        {contact.name}
                      </span>
                      <span className="text-[10px] text-[#dfe2f1]/60 font-mono-num">
                        {contact.phone || 'No phone'}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#00f1fd] font-bold">Select &rarr;</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#262a35] bg-[#171b26] flex items-center justify-between text-xs">
          <span className="text-[11px] text-[#dfe2f1]/60">Zero temporary mock contacts</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-[#262a35] text-white text-xs font-semibold hover:bg-[#313540]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
