export type Region = 'Metro Manila' | 'North Luzon' | 'South Luzon & Cavite' | 'Visayas' | 'Mindanao';

export interface VehicleColor {
  name: string;
  hex: string;
  imageUrl: string;
}

export interface VehicleModel {
  id: string;
  name: string;
  segment: string;
  badge?: string;
  srpOutright: number;
  srpSubscription?: number;
  hasSubscriptionOption: boolean;
  batteryKwh: number;
  rangeKm: number;
  rangeStandard: 'NEDC' | 'WLTP';
  powerHp: number;
  torqueNm: number;
  seats: number;
  groundClearanceMm?: number;
  screenSize: string;
  acceleration?: string; // 0-100 km/h
  drivetrain: string;
  warranty: string;
  batteryWarranty: string;
  description: string;
  colors: VehicleColor[];
  highlights: string[];
}

export interface Dealer {
  id: string;
  name: string;
  region: Region;
  city: string;
  province?: string;
  address: string;
  hotline: string;
  hotlineRaw: string;
  serves: string[];
}

export interface TestDriveBooking {
  id: string;
  referenceCode: string;
  fullName: string;
  email: string;
  mobile: string;
  modelId: string;
  modelName: string;
  dealerId: string;
  dealerName: string;
  dealerAddress: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Confirmed' | 'Completed' | 'Cancelled';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  mediaUrls?: string[];
  suggestedDealer?: Dealer;
  quickActions?: {
    label: string;
    action: 'book_test_drive' | 'calculate_model' | 'call_dealer' | 'view_dealer';
    payload?: string;
  }[];
}
