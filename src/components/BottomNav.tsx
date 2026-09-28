import React from 'react';
import { TabType } from '../types';
import { soundEffects } from '../utils/audio';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isEmergencyActive: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  isEmergencyActive,
}) => {
  const tabs = [
    {
      id: 'monitor' as TabType,
      label: 'Monitor',
      icon: 'vital_signs',
    },
    {
      id: 'emergency' as TabType,
      label: 'Emergency',
      icon: 'crisis_alert',
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
    <nav className="fixed bottom-0 left-0 right-0 w-full z-40 pb-safe bg-[#0a0e18]/90 backdrop-blur-xl border-t border-[#262a35]/70 shadow-[0_-4px_24px_rgba(0,0,0,0.6)]">
      <div className="max-w-md mx-auto flex items-center justify-around h-18 px-2">
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
              className={`relative flex flex-col items-center justify-center min-w-[64px] min-h-[48px] py-1 px-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? isEmergency
                    ? 'text-[#ff5166] bg-[#26151b]'
                    : 'text-[#00f1fd] bg-[#17252f]'
                  : 'text-[#dfe2f1]/60 hover:text-white hover:bg-[#171b26]/50'
              }`}
            >
              <div className="relative">
                <span
                  className={`material-symbols-outlined text-[24px] ${
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
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff334b] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff334b]"></span>
                  </span>
                )}
              </div>

              <span
                className={`text-[11px] font-medium tracking-tight mt-0.5 ${
                  isActive ? 'font-bold' : ''
                }`}
              >
                {tab.label}
              </span>

              {/* Active Bottom Glow Pip */}
              {isActive && (
                <span
                  className={`absolute -bottom-1 w-6 h-0.5 rounded-full ${
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
