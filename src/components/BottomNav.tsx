import React from 'react';
import { TabType } from '../types';
import { soundEffects } from '../utils/audio';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isEmergencyActive: boolean;
  contactsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  isEmergencyActive,
  contactsCount = 3,
}) => {
  const tabs = [
    {
      id: 'monitor' as TabType,
      label: 'Monitor',
      icon: 'vital_signs',
    },
    {
      id: 'contacts' as TabType,
      label: 'Contacts',
      icon: 'contact_phone',
      badge: contactsCount > 0 ? `${contactsCount}` : undefined,
    },
    {
      id: 'emergency' as TabType,
      label: 'Emergency',
      icon: 'crisis_alert',
      isUrgent: true,
      badge: isEmergencyActive ? 'ACTIVE' : undefined,
    },
    {
      id: 'radar' as TabType,
      label: 'Radar',
      icon: 'radar',
    },
    {
      id: 'services' as TabType,
      label: 'Hub',
      icon: 'medical_information',
    },
    {
      id: 'medical' as TabType,
      label: 'Medical',
      icon: 'medical_services',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full z-40 pb-safe bg-[#0a0e18]/95 backdrop-blur-xl border-t border-[#262a35]/70 shadow-[0_-4px_24px_rgba(0,0,0,0.6)]">
      <div className="max-w-lg mx-auto flex items-center justify-around h-18 px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isEmergency = tab.id === 'emergency';

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                soundEffects.playHapticClick();
                onSelectTab(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center flex-1 min-w-0 py-1 px-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? isEmergency
                    ? 'text-[#ff5166] bg-[#26151b]'
                    : 'text-[#00f1fd] bg-[#17252f]'
                  : 'text-[#dfe2f1]/60 hover:text-white hover:bg-[#171b26]/50'
              }`}
            >
              <div className="relative">
                <span
                  className={`material-symbols-outlined text-[22px] ${
                    isActive ? 'font-bold' : ''
                  }`}
                  style={
                    isActive
                      ? { fontVariationSettings: "'FILL' 1, 'wght' 600" }
                      : undefined
                  }
                >
                  {tab.icon}
                </span>

                {/* Badge if Emergency is active */}
                {tab.isUrgent && isEmergencyActive && (
                  <span className="absolute -top-1 -right-2 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff334b] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff334b]"></span>
                  </span>
                )}

                {/* Numeric Badge for Contacts */}
                {!isEmergency && tab.badge && (
                  <span className="absolute -top-1 -right-2 px-1 rounded-full bg-[#ff334b] text-white text-[9px] font-black leading-tight min-w-[14px] text-center font-mono-num shadow-sm">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] sm:text-[11px] font-medium tracking-tight mt-0.5 truncate max-w-full ${
                  isActive ? 'font-bold' : ''
                }`}
              >
                {tab.label}
              </span>

              {/* Active Bottom Glow Pip */}
              {isActive && (
                <span
                  className={`absolute -bottom-1 w-5 h-0.5 rounded-full ${
                    isEmergency ? 'bg-[#ff5166]' : 'bg-[#00f1fd]'
                  } shadow-[0_0_8px_currentColor]`}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
