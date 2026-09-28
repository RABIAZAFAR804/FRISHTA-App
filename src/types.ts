export type TabType = 'monitor' | 'emergency' | 'radar' | 'services' | 'medical';

export type UserRoleMode = 'victim' | 'witness';

export type ServiceCategory = 'all' | 'rescue' | 'hospital' | 'mobility' | 'community';

export interface EmergencyService {
  id: string;
  name: string;
  category: 'rescue' | 'hospital' | 'mobility' | 'community';
  shortCode?: string; // e.g. "1122", "115", "1020"
  phone: string;
  address: string;
  distance: string;
  distanceKm: number;
  eta: string;
  badge: string;
  description: string;
  status: string;
  verified: boolean;
  capabilities: string[];
  icon: string;
  color: string;
  coords: { x: number; y: number }; // Radar map coordinates
}

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  isPrimary?: boolean;
  avatarUrl: string;
  notes?: string;
  proximity?: string;
}

export interface Responder {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  distance: string;
  distanceMeters: number;
  eta: string;
  badge: string;
  avatarUrl: string;
  equipment: string;
  status: 'accepting' | 'en_route' | 'on_scene';
  phone: string;
  coords: { x: number; y: number }; // Radar coordinates in percentage (0-100)
}

export interface TelemetryData {
  gForce: number;
  speedKmh: number;
  locationName: string;
  coordinates: string;
  gpsAccuracy: string;
  satellites: number;
  batteryVoltage: string;
  audioDecibels: number;
  rolloverPitch: number;
  cadSyncLatency: string;
}

export interface CadPipelineStep {
  id: string;
  title: string;
  subtitle: string;
  status: 'active' | 'pending' | 'completed' | 'queued';
  tag: string;
}
