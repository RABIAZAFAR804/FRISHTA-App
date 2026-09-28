import React from 'react';
import { TabType } from '../types';
import { soundEffects } from '../utils/audio';

interface HeaderProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onTriggerSOS: () => void;
  isAudioMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onTriggerSOS,
  isAudioMuted,
  onToggleMute,
}) => {
  const getTabLabel = () => {
    switch (activeTab) {
      case 'monitor':
        return 'Monitor';
      case 'emergency':
        return 'Emergency';
      case 'radar':
        return 'Farishta Radar';
      case 'services':
        return 'Emergency Hub';
      case 'medical':
        return 'Medical Card';
    }
  };

  const logoUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAGU32pI6pjeJSz8HwZSw3ZAPAkRjae3TP8WacuSUfFEGJ9ImH22w0ZUc3-NYBzinQeocG8FROIjyf-Mp2DzLvmT8jikCeq3ox249BjZC14xMqTYYmG8RaYSflN8o3gJJP9lMMrO4nrXa7ZptQPfawVl_7D3F7mhtuVcWpyZNditaFmOJFJ4Ga1cgGM-9jd0uzxgNqT-wrTbWznaG2Q1lQiV_sNm7FoZKS8ZKXTqTRT1x5Ne1C7K9L_';

  const profileUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCLpqaYLUVmhtJTy89n2TBLYVi2tbJzeVpxM3YFws-aJ1vEABM4wJMcub4QLlII07dlFUncpmJACWbXqVSSgZA96C9EeoPD9oTnmvAYrpU-vAM8ODOvAtPLFmPyBiuvY73IOIWaK7_21IrqrFH3XMXR3UpZXQ5I_GtWvW-JX3AaoHHd3MqABKv8itfNs0N8zRVd7mUPa_yR3KX9Jb0fnjE6jzSLx7DYLsANKI1DOzlYIOuO9Bmh5HKJ';

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 pt-safe bg-[#0a0e18]/85 backdrop-blur-xl border-b border-[#262a35]/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-2xl mx-auto h-18 px-4 flex items-center justify-between gap-3">
        {/* Left: Brand + Status */}
        <div
          onClick={() => onSelectTab('monitor')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="relative">
            <img
              src={logoUrl}
              alt="FARISHTA App Logo"
              className="h-9 w-9 object-contain drop-shadow-[0_0_8px_rgba(255,51,75,0.5)] group-hover:scale-105 transition-transform"
              onError={(e) => {
                // Fallback icon if URL is unreachable
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-lg tracking-tight text-white">
                FARISHTA
              </span>
              <span className="text-[#313540] font-light">|</span>
              <h1 className="text-sm font-semibold text-[#dfe2f1]/90 truncate max-w-[130px]">
                {getTabLabel()}
              </h1>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]"></span>
              </span>
              <span className="text-[10px] font-bold text-[#4edea3] uppercase tracking-wider font-mono-num">
                Active Guardian • 50Hz
              </span>
            </div>
          </div>
        </div>

        {/* Right: Sound Toggle + Header SOS + Profile Avatar */}
        <div className="flex items-center gap-2">
          {/* Sound Mute/Unmute */}
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isAudioMuted ? 'Unmute acoustic alarm' : 'Mute acoustic alarm'}
            className="w-9 h-9 rounded-full bg-[#1c1f2a] border border-[#313540] text-[#dfe2f1]/80 hover:text-white flex items-center justify-center transition-colors active:scale-95"
            title={isAudioMuted ? 'Unmute alarm' : 'Mute alarm'}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isAudioMuted ? 'volume_off' : 'volume_up'}
            </span>
          </button>

          {/* Quick SOS Trigger in Header */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playEmergencyBeep();
              onTriggerSOS();
            }}
            className="min-h-[38px] px-3 rounded-full bg-gradient-to-r from-[#ff334b] to-[#be0035] text-white text-xs font-black flex items-center gap-1.5 shadow-[0_0_16px_rgba(255,51,75,0.45)] hover:shadow-[0_0_24px_rgba(255,51,75,0.7)] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px] animate-pulse">
              e911_emergency
            </span>
            <span>SOS</span>
          </button>

          {/* Medical Profile Avatar */}
          <button
            type="button"
            onClick={() => onSelectTab('medical')}
            aria-label="View Medical Profile Card"
            className="w-9 h-9 rounded-full ring-2 ring-[#4edea3]/40 overflow-hidden hover:ring-[#4edea3] transition-all relative shrink-0 active:scale-95"
          >
            <img
              src={profileUrl}
              alt="Medical Card Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback avatar
                const target = e.currentTarget;
                target.src =
                  'https://images.unsplash.com/photo-1594824813576-96b6e4e040f7?auto=format&fit=crop&w=120&q=80';
              }}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
