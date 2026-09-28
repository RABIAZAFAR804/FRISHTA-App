import React, { useState } from 'react';
import { EmergencyService, ServiceCategory, RescueSystemConfig } from '../types';
import { EMERGENCY_SERVICES } from '../data/emergencyServices';
import { soundEffects } from '../utils/audio';

interface ServicesHubViewProps {
  rescueConfig: RescueSystemConfig;
  onOpenRescueConfigModal: () => void;
  onOpenServiceRoute: (service: EmergencyService) => void;
  onOpenServiceCall: (service: EmergencyService) => void;
  onBroadcastAllServices: () => void;
}

export const ServicesHubView: React.FC<ServicesHubViewProps> = ({
  rescueConfig,
  onOpenRescueConfigModal,
  onOpenServiceRoute,
  onOpenServiceCall,
  onBroadcastAllServices,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: ServiceCategory; label: string; icon: string }[] = [
    { id: 'all', label: 'All Services', icon: 'hub' },
    { id: 'rescue', label: 'Ambulance & 1122', icon: 'emergency' },
    { id: 'hospital', label: 'Hospitals & ER', icon: 'local_hospital' },
    { id: 'mobility', label: 'Bykea & Yango', icon: 'two_wheeler' },
    { id: 'community', label: 'Community Corps', icon: 'volunteer_activism' },
  ];

  const filteredServices = EMERGENCY_SERVICES.filter((svc) => {
    const matchesCategory = selectedCategory === 'all' || svc.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.capabilities.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full pb-28 pt-2 px-4 max-w-xl mx-auto space-y-4 animate-in fade-in duration-300">
      {/* Top Banner: Emergency Platforms & Lifeline Network */}
      <div className="w-full rounded-2xl bg-gradient-to-r from-[#262a35] via-[#1c1f2a] to-[#171b26] border border-[#313540] p-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-44 h-44 bg-[#00f1fd]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#00f1fd]/20 text-[#00f1fd] flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(0,241,253,0.35)]">
              <span className="material-symbols-outlined text-[26px]">medical_information</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#00f1fd] uppercase tracking-wider">
                  RAPID LIFELINE NETWORK
                </span>
                <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping" />
              </div>
              <h2 className="font-display text-lg font-black text-white mt-0.5">
                Emergency &amp; Community Hub
              </h2>
              <p className="text-xs text-[#dfe2f1]/70 mt-0.5">
                Edhi, Chhipa, Rescue 1122, Bykea, Yango &amp; Nearest ER Trauma Hospitals.
              </p>
            </div>
          </div>
        </div>

        {/* Rapid SOS Multi-Broadcast Button */}
        <div className="mt-4 pt-3 border-t border-[#313540] flex items-center justify-between gap-2">
          <span className="text-[11px] text-[#dfe2f1]/80">
            One-touch multi-network trauma notification
          </span>
          <button
            type="button"
            onClick={() => {
              soundEffects.playEmergencyBeep();
              onBroadcastAllServices();
            }}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#ff334b] to-[#be0035] text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_16px_rgba(255,51,75,0.4)] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px] animate-pulse">campaign</span>
            <span>Broadcast All</span>
          </button>
        </div>
      </div>

      {/* Victim's Configured Rescue System & Nearest Hospital Card */}
      <div className="w-full rounded-2xl bg-[#1c1f2a] border border-[#ff334b]/40 p-4 shadow-xl space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff334b] text-[20px]">
              settings_suggest
            </span>
            <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider">
              Active Rescue System &amp; Nearest ER
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              soundEffects.playHapticClick();
              onOpenRescueConfigModal();
            }}
            className="px-2.5 py-1 rounded-lg bg-[#262a35] hover:bg-[#313540] border border-[#00f1fd]/40 text-[#00f1fd] text-xs font-bold flex items-center gap-1 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[14px]">tune</span>
            <span>Update System</span>
          </button>
        </div>

        {/* Priority Grid: #1 Locked 1122 + #2 Replaceable Secondary + Target Hospital */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Priority #1: 1122 (LOCKED) */}
          <div className="p-3 rounded-xl bg-[#26151b] border border-[#ff334b]/50 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#ff334b] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-md">
                #1
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-white truncate">Rescue 1122</span>
                  <span className="material-symbols-outlined text-[14px] text-[#ff334b]" title="Locked - Cannot be replaced">
                    lock
                  </span>
                </div>
                <span className="text-[10px] text-[#ffb3b5] font-semibold block">
                  Govt Mandatory CAD • FIXED
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#ff334b]/30 text-[#ffdad6] text-[9px] font-mono-num font-bold">
              0.8 km
            </span>
          </div>

          {/* Priority #2: Replaceable Secondary (e.g. Edhi / Chhipa / Bykea) */}
          <div
            onClick={() => {
              soundEffects.playHapticClick();
              onOpenRescueConfigModal();
            }}
            className="p-3 rounded-xl bg-[#17252f] border border-[#00f1fd]/40 hover:border-[#00f1fd] transition-colors cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#00f1fd] text-[#00373a] flex items-center justify-center font-black text-xs shrink-0 shadow-md">
                #2
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-white truncate">
                    {rescueConfig.secondarySystem.name}
                  </span>
                  <span className="material-symbols-outlined text-[13px] text-[#00f1fd]">
                    swap_horiz
                  </span>
                </div>
                <span className="text-[10px] text-[#00f1fd] block truncate">
                  Victim Replaceable Fleet
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#00f1fd]/20 text-[#00f1fd] text-[9px] font-mono-num font-bold">
              {rescueConfig.secondarySystem.distance}
            </span>
          </div>
        </div>

        {/* Nearest Hospital ER Target Row */}
        <div
          onClick={() => {
            soundEffects.playHapticClick();
            onOpenRescueConfigModal();
          }}
          className="p-3 rounded-xl bg-[#171b26] border border-[#262a35] hover:border-[#4edea3]/50 transition-colors cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#4edea3]/20 text-[#4edea3] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">local_hospital</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white truncate">
                  Target ER: {rescueConfig.targetHospital.name}
                </span>
                <span className="text-[9px] text-[#4edea3] font-bold">
                  ({rescueConfig.targetHospital.icuBeds} ICU Beds)
                </span>
              </div>
              <span className="text-[10px] text-[#dfe2f1]/60 truncate block">
                {rescueConfig.targetHospital.traumaLevel} • Assigned: {rescueConfig.targetHospital.assigned1122Station}
              </span>
            </div>
          </div>

          <div className="text-right shrink-0 pl-2">
            <span className="text-xs font-bold text-[#4edea3] font-mono-num block">
              {rescueConfig.targetHospital.distance}
            </span>
            <span className="text-[10px] text-[#00f1fd] font-extrabold font-mono-num block">
              {rescueConfig.targetHospital.eta}
            </span>
          </div>
        </div>

        {/* Multi-HQ Forwarding Status Strip */}
        <div className="pt-1 flex items-center justify-between text-[11px] text-[#dfe2f1]/80 border-t border-[#262a35]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
            <span className="text-white font-medium">
              {rescueConfig.forwardToAll1122Headquarters
                ? 'Forwarding Enabled to ALL 1122 Headquarters & Regional Desks'
                : '1122 Local Station Dispatch Only'}
            </span>
          </div>
          <span className="text-[10px] text-[#4edea3] font-mono-num font-bold">
            5 HQS LINKED
          </span>
        </div>
      </div>

      {/* Instant Hotline Quick-Dial Strips (Edhi, Chhipa, 1122, Red Crescent) */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-[#dfe2f1]/70 uppercase tracking-wider px-1">
          Direct 24/7 National Emergency Hotlines
        </span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {/* Rescue 1122 */}
          <a
            href="tel:1122"
            onClick={() => soundEffects.playHapticClick()}
            className="flex items-center justify-between p-2.5 rounded-xl bg-[#26151b] border border-[#ff334b]/40 hover:border-[#ff334b] transition-all group"
          >
            <div>
              <span className="text-[9px] text-[#ffb3b5] font-bold block uppercase">Govt Rescue</span>
              <span className="font-display text-base font-black text-white">1122</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#ff334b] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[16px]">call</span>
            </div>
          </a>

          {/* Edhi Foundation 115 */}
          <a
            href="tel:115"
            onClick={() => soundEffects.playHapticClick()}
            className="flex items-center justify-between p-2.5 rounded-xl bg-[#17252f] border border-[#00f1fd]/40 hover:border-[#00f1fd] transition-all group"
          >
            <div>
              <span className="text-[9px] text-[#00f1fd] font-bold block uppercase">Edhi Centre</span>
              <span className="font-display text-base font-black text-white">115</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#00f1fd] text-[#00373a] flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[16px]">call</span>
            </div>
          </a>

          {/* Chhipa Welfare 1020 */}
          <a
            href="tel:1020"
            onClick={() => soundEffects.playHapticClick()}
            className="flex items-center justify-between p-2.5 rounded-xl bg-[#201c2b] border border-[#ffb3b5]/40 hover:border-[#ffb3b5] transition-all group"
          >
            <div>
              <span className="text-[9px] text-[#ffb3b5] font-bold block uppercase">Chhipa Rescue</span>
              <span className="font-display text-base font-black text-white">1020</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#ffb3b5] text-[#40000c] flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[16px]">call</span>
            </div>
          </a>

          {/* Red Crescent 1030 */}
          <a
            href="tel:1030"
            onClick={() => soundEffects.playHapticClick()}
            className="flex items-center justify-between p-2.5 rounded-xl bg-[#172e25] border border-[#4edea3]/40 hover:border-[#4edea3] transition-all group"
          >
            <div>
              <span className="text-[9px] text-[#4edea3] font-bold block uppercase">Red Crescent</span>
              <span className="font-display text-base font-black text-white">1030</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#4edea3] text-[#002113] flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[16px]">call</span>
            </div>
          </a>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#dfe2f1]/50">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Edhi, Chhipa, Bykea, Hospitals, ICU beds..."
          className="w-full bg-[#1c1f2a] border border-[#313540] rounded-2xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-[#dfe2f1]/50 focus:outline-none focus:border-[#00f1fd] transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-3 flex items-center text-[#dfe2f1]/60 hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}
      </div>

      {/* Category Filter Carousel / Tabs */}
      <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                soundEffects.playHapticClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all shrink-0 ${
                isActive
                  ? 'bg-[#00f1fd] text-[#00373a] shadow-[0_0_12px_rgba(0,241,253,0.3)]'
                  : 'bg-[#1c1f2a] border border-[#262a35] text-[#dfe2f1]/70 hover:text-white hover:bg-[#262a35]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Services List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-[#dfe2f1]/70 font-semibold">
            Showing <strong className="text-white font-bold">{filteredServices.length}</strong> verified facilities &amp; fleets
          </span>
          <span className="text-[10px] text-[#4edea3] font-bold font-mono-num">GPS LIVE SYNC</span>
        </div>

        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="w-full rounded-2xl bg-[#1c1f2a] border border-[#262a35] p-4 flex flex-col gap-3 shadow-md hover:border-[#00f1fd]/40 transition-all relative overflow-hidden group"
          >
            {/* Top Indicator Accent */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{
                backgroundColor: service.color,
                boxShadow: `0 0 8px ${service.color}`,
              }}
            />

            {/* Header info */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-md mt-0.5"
                  style={{
                    backgroundColor: `${service.color}25`,
                    color: service.color,
                    border: `1px solid ${service.color}50`,
                  }}
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {service.icon}
                  </span>
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-display text-sm font-bold text-white truncate">
                      {service.name}
                    </h3>
                    {service.verified && (
                      <span className="text-[#00f1fd] material-symbols-outlined text-[16px]">
                        verified
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] text-[#dfe2f1]/60 flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[13px] text-[#00f1fd]">
                      pin_drop
                    </span>
                    <span className="truncate">{service.address}</span>
                  </span>
                </div>
              </div>

              {/* Distance and ETA pill */}
              <div className="flex flex-col items-end shrink-0 pl-1">
                <span className="text-[11px] font-bold text-[#4edea3] font-mono-num">
                  {service.distance}
                </span>
                <span className="font-display text-base font-extrabold text-[#00f1fd] font-mono-num">
                  {service.eta}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-[#dfe2f1]/80 leading-relaxed">
              {service.description}
            </p>

            {/* Capabilities Badges */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {service.capabilities.map((cap, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-[#171b26] border border-[#313540] text-[#dfe2f1]/80 font-medium"
                >
                  {cap}
                </span>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#262a35]">
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
                <span className="text-white font-medium">{service.status}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Route Button */}
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playHapticClick();
                    onOpenServiceRoute(service);
                  }}
                  className="min-h-[38px] px-3.5 rounded-xl bg-[#262a35] hover:bg-[#313540] text-white text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[17px] text-[#00f1fd]">
                    navigation
                  </span>
                  <span>Route</span>
                </button>

                {/* Direct Call Button */}
                <a
                  href={`tel:${service.phone}`}
                  onClick={() => {
                    soundEffects.playHapticClick();
                    onOpenServiceCall(service);
                  }}
                  className="min-h-[38px] px-4 rounded-xl text-white text-xs font-black flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                  style={{
                    backgroundColor: service.color,
                    boxShadow: `0 0 16px ${service.color}50`,
                  }}
                >
                  <span className="material-symbols-outlined text-[17px]">call</span>
                  <span>{service.shortCode ? `Call ${service.shortCode}` : 'Call'}</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
