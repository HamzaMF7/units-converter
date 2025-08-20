export interface Unit {
  id: string;
  name: string;
  symbol: string;
  categoryId: string;
  toSI: (x: number) => number;
  fromSI: (x: number) => number;
  precision?: number;
}

export interface Category {
  id: string;
  name: string;
  baseUnitId: string;
  units: string[];
  icon: string;
  color: string;
}

export interface ConversionPair {
  id: string;
  categoryId: string;
  fromUnitId: string;
  toUnitId: string;
  timestamp: number;
  isFavorite?: boolean;
}

export interface ConversionResult {
  value: number;
  unit: Unit;
  formatted: string;
}

export interface AppSettings {
  theme: 'system' | 'light' | 'dark';
  decimalFormat: '.' | ',';
  precision: number;
  hapticsEnabled: boolean;
  analyticsEnabled: boolean;
}