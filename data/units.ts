import { Category, Unit } from "../types";
// Temperature conversions (affine transforms)
const celsiusToKelvin = (c: number) => c + 273.15;
const kelvinToCelsius = (k: number) => k - 273.15;
const fahrenheitToKelvin = (f: number) => (f - 32) * 5/9 + 273.15;
const kelvinToFahrenheit = (k: number) => (k - 273.15) * 9/5 + 32;

export const UNITS: Record<string, Unit> = {
  // Length
  'm': {
    id: 'm',
    name: 'meter',
    symbol: 'm',
    categoryId: 'length',
    toSI: (x) => x,
    fromSI: (x) => x,
    precision: 3
  },
  'km': {
    id: 'km',
    name: 'kilometer',
    symbol: 'km',
    categoryId: 'length',
    toSI: (x) => x * 1000,
    fromSI: (x) => x / 1000,
    precision: 3
  },
  'ft': {
    id: 'ft',
    name: 'foot',
    symbol: 'ft',
    categoryId: 'length',
    toSI: (x) => x * 0.3048,
    fromSI: (x) => x / 0.3048,
    precision: 3
  },
  'in': {
    id: 'in',
    name: 'inch',
    symbol: 'in',
    categoryId: 'length',
    toSI: (x) => x * 0.0254,
    fromSI: (x) => x / 0.0254,
    precision: 3
  },
  
  // Temperature (Kelvin as SI base)
  'K': {
    id: 'K',
    name: 'kelvin',
    symbol: 'K',
    categoryId: 'temperature',
    toSI: (x) => x,
    fromSI: (x) => x,
    precision: 2
  },
  'C': {
    id: 'C',
    name: 'celsius',
    symbol: '°C',
    categoryId: 'temperature',
    toSI: celsiusToKelvin,
    fromSI: kelvinToCelsius,
    precision: 2
  },
  'F': {
    id: 'F',
    name: 'fahrenheit',
    symbol: '°F',
    categoryId: 'temperature',
    toSI: fahrenheitToKelvin,
    fromSI: kelvinToFahrenheit,
    precision: 2
  },
  
  // Mass
  'kg': {
    id: 'kg',
    name: 'kilogram',
    symbol: 'kg',
    categoryId: 'mass',
    toSI: (x) => x,
    fromSI: (x) => x,
    precision: 3
  },
  'g': {
    id: 'g',
    name: 'gram',
    symbol: 'g',
    categoryId: 'mass',
    toSI: (x) => x / 1000,
    fromSI: (x) => x * 1000,
    precision: 3
  },
  'lb': {
    id: 'lb',
    name: 'pound',
    symbol: 'lb',
    categoryId: 'mass',
    toSI: (x) => x * 0.453592,
    fromSI: (x) => x / 0.453592,
    precision: 3
  },
  
  // Speed
  'ms': {
    id: 'ms',
    name: 'meter per second',
    symbol: 'm/s',
    categoryId: 'speed',
    toSI: (x) => x,
    fromSI: (x) => x,
    precision: 3
  },
  'kmh': {
    id: 'kmh',
    name: 'kilometer per hour',
    symbol: 'km/h',
    categoryId: 'speed',
    toSI: (x) => x / 3.6,
    fromSI: (x) => x * 3.6,
    precision: 2
  },
  'mph': {
    id: 'mph',
    name: 'mile per hour',
    symbol: 'mph',
    categoryId: 'speed',
    toSI: (x) => x * 0.44704,
    fromSI: (x) => x / 0.44704,
    precision: 2
  },
  
  // Digital Storage
  'B': {
    id: 'B',
    name: 'byte',
    symbol: 'B',
    categoryId: 'storage',
    toSI: (x) => x,
    fromSI: (x) => x,
    precision: 0
  },
  'KB': {
    id: 'KB',
    name: 'kilobyte',
    symbol: 'KB',
    categoryId: 'storage',
    toSI: (x) => x * 1000,
    fromSI: (x) => x / 1000,
    precision: 2
  },
  'KiB': {
    id: 'KiB',
    name: 'kibibyte',
    symbol: 'KiB',
    categoryId: 'storage',
    toSI: (x) => x * 1024,
    fromSI: (x) => x / 1024,
    precision: 2
  },
  'MB': {
    id: 'MB',
    name: 'megabyte',
    symbol: 'MB',
    categoryId: 'storage',
    toSI: (x) => x * 1000000,
    fromSI: (x) => x / 1000000,
    precision: 2
  },
  'MiB': {
    id: 'MiB',
    name: 'mebibyte',
    symbol: 'MiB',
    categoryId: 'storage',
    toSI: (x) => x * 1048576,
    fromSI: (x) => x / 1048576,
    precision: 2
  }
};

export const CATEGORIES: Record<string, Category> = {
  length: {
    id: 'length',
    name: 'Length',
    baseUnitId: 'm',
    units: ['m', 'km', 'ft', 'in'],
    icon: 'ruler',
    color: '#3B82F6'
  },
  temperature: {
    id: 'temperature',
    name: 'Temperature',
    baseUnitId: 'K',
    units: ['C', 'F', 'K'],
    icon: 'thermometer',
    color: '#EF4444'
  },
  mass: {
    id: 'mass',
    name: 'Mass',
    baseUnitId: 'kg',
    units: ['kg', 'g', 'lb'],
    icon: 'weight',
    color: '#10B981'
  },
  speed: {
    id: 'speed',
    name: 'Speed',
    baseUnitId: 'ms',
    units: ['ms', 'kmh', 'mph'],
    icon: 'gauge',
    color: '#F59E0B'
  },
  storage: {
    id: 'storage',
    name: 'Digital Storage',
    baseUnitId: 'B',
    units: ['B', 'KB', 'KiB', 'MB', 'MiB'],
    icon: 'hard-drive',
    color: '#8B5CF6'
  }
};