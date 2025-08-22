// import { Category, Unit } from "../types";
// // Temperature conversions (affine transforms)
// const celsiusToKelvin = (c: number) => c + 273.15;
// const kelvinToCelsius = (k: number) => k - 273.15;
// const fahrenheitToKelvin = (f: number) => (f - 32) * 5/9 + 273.15;
// const kelvinToFahrenheit = (k: number) => (k - 273.15) * 9/5 + 32;

// export const UNITS: Record<string, Unit> = {
//   // Length
//   'm': {
//     id: 'm',
//     name: 'meter',
//     symbol: 'm',
//     categoryId: 'length',
//     toSI: (x) => x,
//     fromSI: (x) => x,
//     precision: 3
//   },
//   'km': {
//     id: 'km',
//     name: 'kilometer',
//     symbol: 'km',
//     categoryId: 'length',
//     toSI: (x) => x * 1000,
//     fromSI: (x) => x / 1000,
//     precision: 3
//   },
//   'ft': {
//     id: 'ft',
//     name: 'foot',
//     symbol: 'ft',
//     categoryId: 'length',
//     toSI: (x) => x * 0.3048,
//     fromSI: (x) => x / 0.3048,
//     precision: 3
//   },
//   'in': {
//     id: 'in',
//     name: 'inch',
//     symbol: 'in',
//     categoryId: 'length',
//     toSI: (x) => x * 0.0254,
//     fromSI: (x) => x / 0.0254,
//     precision: 3
//   },
  
//   // Temperature (Kelvin as SI base)
//   'K': {
//     id: 'K',
//     name: 'kelvin',
//     symbol: 'K',
//     categoryId: 'temperature',
//     toSI: (x) => x,
//     fromSI: (x) => x,
//     precision: 2
//   },
//   'C': {
//     id: 'C',
//     name: 'celsius',
//     symbol: '°C',
//     categoryId: 'temperature',
//     toSI: celsiusToKelvin,
//     fromSI: kelvinToCelsius,
//     precision: 2
//   },
//   'F': {
//     id: 'F',
//     name: 'fahrenheit',
//     symbol: '°F',
//     categoryId: 'temperature',
//     toSI: fahrenheitToKelvin,
//     fromSI: kelvinToFahrenheit,
//     precision: 2
//   },
  
//   // Mass
//   'kg': {
//     id: 'kg',
//     name: 'kilogram',
//     symbol: 'kg',
//     categoryId: 'mass',
//     toSI: (x) => x,
//     fromSI: (x) => x,
//     precision: 3
//   },
//   'g': {
//     id: 'g',
//     name: 'gram',
//     symbol: 'g',
//     categoryId: 'mass',
//     toSI: (x) => x / 1000,
//     fromSI: (x) => x * 1000,
//     precision: 3
//   },
//   'lb': {
//     id: 'lb',
//     name: 'pound',
//     symbol: 'lb',
//     categoryId: 'mass',
//     toSI: (x) => x * 0.453592,
//     fromSI: (x) => x / 0.453592,
//     precision: 3
//   },
  
//   // Speed
//   'ms': {
//     id: 'ms',
//     name: 'meter per second',
//     symbol: 'm/s',
//     categoryId: 'speed',
//     toSI: (x) => x,
//     fromSI: (x) => x,
//     precision: 3
//   },
//   'kmh': {
//     id: 'kmh',
//     name: 'kilometer per hour',
//     symbol: 'km/h',
//     categoryId: 'speed',
//     toSI: (x) => x / 3.6,
//     fromSI: (x) => x * 3.6,
//     precision: 2
//   },
//   'mph': {
//     id: 'mph',
//     name: 'mile per hour',
//     symbol: 'mph',
//     categoryId: 'speed',
//     toSI: (x) => x * 0.44704,
//     fromSI: (x) => x / 0.44704,
//     precision: 2
//   },
  
//   // Digital Storage
//   'B': {
//     id: 'B',
//     name: 'byte',
//     symbol: 'B',
//     categoryId: 'storage',
//     toSI: (x) => x,
//     fromSI: (x) => x,
//     precision: 0
//   },
//   'KB': {
//     id: 'KB',
//     name: 'kilobyte',
//     symbol: 'KB',
//     categoryId: 'storage',
//     toSI: (x) => x * 1000,
//     fromSI: (x) => x / 1000,
//     precision: 2
//   },
//   'KiB': {
//     id: 'KiB',
//     name: 'kibibyte',
//     symbol: 'KiB',
//     categoryId: 'storage',
//     toSI: (x) => x * 1024,
//     fromSI: (x) => x / 1024,
//     precision: 2
//   },
//   'MB': {
//     id: 'MB',
//     name: 'megabyte',
//     symbol: 'MB',
//     categoryId: 'storage',
//     toSI: (x) => x * 1000000,
//     fromSI: (x) => x / 1000000,
//     precision: 2
//   },
//   'MiB': {
//     id: 'MiB',
//     name: 'mebibyte',
//     symbol: 'MiB',
//     categoryId: 'storage',
//     toSI: (x) => x * 1048576,
//     fromSI: (x) => x / 1048576,
//     precision: 2
//   }
// };

// export const CATEGORIES: Record<string, Category> = {
//   length: {
//     id: 'length',
//     name: 'Length',
//     baseUnitId: 'm',
//     units: ['m', 'km', 'ft', 'in'],
//     icon: 'ruler',
//     color: '#3B82F6'
//   },
//   temperature: {
//     id: 'temperature',
//     name: 'Temperature',
//     baseUnitId: 'K',
//     units: ['C', 'F', 'K'],
//     icon: 'thermometer',
//     color: '#EF4444'
//   },
//   mass: {
//     id: 'mass',
//     name: 'Mass',
//     baseUnitId: 'kg',
//     units: ['kg', 'g', 'lb'],
//     icon: 'weight',
//     color: '#10B981'
//   },
//   speed: {
//     id: 'speed',
//     name: 'Speed',
//     baseUnitId: 'ms',
//     units: ['ms', 'kmh', 'mph'],
//     icon: 'gauge',
//     color: '#F59E0B'
//   },
//   storage: {
//     id: 'storage',
//     name: 'Digital Storage',
//     baseUnitId: 'B',
//     units: ['B', 'KB', 'KiB', 'MB', 'MiB'],
//     icon: 'hard-drive',
//     color: '#8B5CF6'
//   }
// };



import { Category, Unit } from "../types";

/** ---------- Helpers: temperature (affine) ---------- */
const celsiusToKelvin = (c: number) => c + 273.15;
const kelvinToCelsius = (k: number) => k - 273.15;
const fahrenheitToKelvin = (f: number) => (f - 32) * 5/9 + 273.15;
const kelvinToFahrenheit = (k: number) => (k - 273.15) * 9/5 + 32;

/** Common constants */
const INCH_TO_M = 0.0254;
const FT_TO_M = 0.3048;
const YD_TO_M = 0.9144;
const MI_TO_M = 1609.344;

const L_TO_M3 = 0.001;
const GAL_US_TO_L = 3.785411784;
const GAL_IMP_TO_L = 4.54609;

const LB_TO_KG = 0.45359237;
const OZ_TO_KG = 0.028349523125;
const TON_US_TO_KG = 907.18474;
const TONNE_TO_KG = 1000;

const PSI_TO_PA = 6894.757293168361;
const ATM_TO_PA = 101325;
const BAR_TO_PA = 100000;
const TORR_TO_PA = 133.32236842105263; // atm/760

const BTU_TO_J = 1055.05585262; // BTU (IT)
const CAL_TO_J = 4.184;         // calorie (IT)
const WH_TO_J = 3600;           // 1 Wh = 3600 J
const HP_MECH_TO_W = 745.6998715822702;

const LBF_TO_N = 4.4482216152605;
const KGF_TO_N = 9.80665;

const RPM_TO_HZ = 1 / 60;

export const UNITS: Record<string, Unit> = {
  /* ============= LENGTH (base: meter) ============= */
  m:  { id: 'm',  name: 'meter',     symbol: 'm',   categoryId: 'length', toSI: x => x,            fromSI: x => x,             precision: 3 },
  km: { id: 'km', name: 'kilometer', symbol: 'km',  categoryId: 'length', toSI: x => x * 1000,     fromSI: x => x / 1000,      precision: 3 },
  cm: { id: 'cm', name: 'centimeter',symbol: 'cm',  categoryId: 'length', toSI: x => x / 100,      fromSI: x => x * 100,       precision: 2 },
  mm: { id: 'mm', name: 'millimeter',symbol: 'mm',  categoryId: 'length', toSI: x => x / 1000,     fromSI: x => x * 1000,      precision: 1 },
  in: { id: 'in', name: 'inch',      symbol: 'in',  categoryId: 'length', toSI: x => x * INCH_TO_M,fromSI: x => x / INCH_TO_M, precision: 3 },
  ft: { id: 'ft', name: 'foot',      symbol: 'ft',  categoryId: 'length', toSI: x => x * FT_TO_M,  fromSI: x => x / FT_TO_M,   precision: 3 },
  yd: { id: 'yd', name: 'yard',      symbol: 'yd',  categoryId: 'length', toSI: x => x * YD_TO_M,  fromSI: x => x / YD_TO_M,   precision: 3 },
  mi: { id: 'mi', name: 'mile',      symbol: 'mi',  categoryId: 'length', toSI: x => x * MI_TO_M,  fromSI: x => x / MI_TO_M,   precision: 3 },

  /* ============= AREA (base: square meter) ============= */
  m2:  { id: 'm2',  name: 'square meter',      symbol: 'm²',   categoryId: 'area', toSI: x => x,               fromSI: x => x,                precision: 3 },
  km2: { id: 'km2', name: 'square kilometer',  symbol: 'km²',  categoryId: 'area', toSI: x => x * 1e6,         fromSI: x => x / 1e6,          precision: 6 },
  cm2: { id: 'cm2', name: 'square centimeter', symbol: 'cm²',  categoryId: 'area', toSI: x => x / 1e4,         fromSI: x => x * 1e4,          precision: 2 },
  mm2: { id: 'mm2', name: 'square millimeter', symbol: 'mm²',  categoryId: 'area', toSI: x => x / 1e6,         fromSI: x => x * 1e6,          precision: 1 },
  ha:  { id: 'ha',  name: 'hectare',           symbol: 'ha',   categoryId: 'area', toSI: x => x * 1e4,         fromSI: x => x / 1e4,          precision: 3 },
  ac:  { id: 'ac',  name: 'acre',              symbol: 'ac',   categoryId: 'area', toSI: x => x * 4046.8564224,fromSI: x => x / 4046.8564224, precision: 3 },
  ft2: { id: 'ft2', name: 'square foot',       symbol: 'ft²',  categoryId: 'area', toSI: x => x * (FT_TO_M**2),fromSI: x => x / (FT_TO_M**2), precision: 3 },
  in2: { id: 'in2', name: 'square inch',       symbol: 'in²',  categoryId: 'area', toSI: x => x * (INCH_TO_M**2), fromSI: x => x / (INCH_TO_M**2), precision: 3 },

  /* ============= VOLUME (base: cubic meter) ============= */
  m3:   { id: 'm3',   name: 'cubic meter',      symbol: 'm³',      categoryId: 'volume', toSI: x => x, fromSI: x => x, precision: 4 },
  L:    { id: 'L',    name: 'liter',            symbol: 'L',       categoryId: 'volume', toSI: x => x * L_TO_M3, fromSI: x => x / L_TO_M3, precision: 3 },
  mL:   { id: 'mL',   name: 'milliliter',       symbol: 'mL',      categoryId: 'volume', toSI: x => x * L_TO_M3 / 1000, fromSI: x => x / (L_TO_M3 / 1000), precision: 1 },
  ft3:  { id: 'ft3',  name: 'cubic foot',       symbol: 'ft³',     categoryId: 'volume', toSI: x => x * 0.028316846592, fromSI: x => x / 0.028316846592, precision: 4 },
  in3:  { id: 'in3',  name: 'cubic inch',       symbol: 'in³',     categoryId: 'volume', toSI: x => x * 1.6387064e-5, fromSI: x => x / 1.6387064e-5, precision: 4 },
  gal:  { id: 'gal',  name: 'US gallon',        symbol: 'gal (US)',categoryId: 'volume', toSI: x => x * GAL_US_TO_L * L_TO_M3, fromSI: x => x / (GAL_US_TO_L * L_TO_M3), precision: 4 },
  galImp:{id: 'galImp',name: 'Imperial gallon', symbol: 'gal (Imp)',categoryId: 'volume',toSI: x => x * GAL_IMP_TO_L * L_TO_M3, fromSI: x => x / (GAL_IMP_TO_L * L_TO_M3), precision: 4 },

  /* ============= MASS (base: kilogram) ============= */
  kg:   { id: 'kg',   name: 'kilogram', symbol: 'kg', categoryId: 'mass', toSI: x => x,         fromSI: x => x,         precision: 3 },
  g:    { id: 'g',    name: 'gram',     symbol: 'g',  categoryId: 'mass', toSI: x => x / 1000,  fromSI: x => x * 1000,  precision: 2 },
  mg:   { id: 'mg',   name: 'milligram',symbol: 'mg', categoryId: 'mass', toSI: x => x / 1e6,   fromSI: x => x * 1e6,   precision: 1 },
  lb:   { id: 'lb',   name: 'pound',    symbol: 'lb', categoryId: 'mass', toSI: x => x * LB_TO_KG, fromSI: x => x / LB_TO_KG, precision: 3 },
  oz:   { id: 'oz',   name: 'ounce',    symbol: 'oz', categoryId: 'mass', toSI: x => x * OZ_TO_KG, fromSI: x => x / OZ_TO_KG, precision: 3 },
  t:    { id: 't',    name: 'tonne',    symbol: 't',  categoryId: 'mass', toSI: x => x * TONNE_TO_KG, fromSI: x => x / TONNE_TO_KG, precision: 3 },
  tonUS:{ id: 'tonUS',name: 'US ton',   symbol: 'ton (US)', categoryId: 'mass', toSI: x => x * TON_US_TO_KG, fromSI: x => x / TON_US_TO_KG, precision: 3 },

  /* ============= TIME (base: second) ============= */
  s:   { id: 's',   name: 'second',      symbol: 's',   categoryId: 'time', toSI: x => x,        fromSI: x => x,        precision: 3 },
  ms:  { id: 'ms',  name: 'millisecond', symbol: 'ms',  categoryId: 'time', toSI: x => x / 1000, fromSI: x => x * 1000, precision: 0 },
  min: { id: 'min', name: 'minute',      symbol: 'min', categoryId: 'time', toSI: x => x * 60,   fromSI: x => x / 60,   precision: 4 },
  h:   { id: 'h',   name: 'hour',        symbol: 'h',   categoryId: 'time', toSI: x => x * 3600, fromSI: x => x / 3600, precision: 4 },
  day: { id: 'day', name: 'day',         symbol: 'd',   categoryId: 'time', toSI: x => x * 86400,fromSI: x => x / 86400,precision: 5 },

  /* ============= SPEED (base: m/s) ============= */
  mps: { id: 'mps', name: 'meter per second', symbol: 'm/s', categoryId: 'speed', toSI: x => x, fromSI: x => x, precision: 3 },
  kmh: { id: 'kmh', name: 'kilometer per hour', symbol: 'km/h', categoryId: 'speed', toSI: x => x / 3.6, fromSI: x => x * 3.6, precision: 2 },
  mph: { id: 'mph', name: 'mile per hour', symbol: 'mph', categoryId: 'speed', toSI: x => x * 0.44704, fromSI: x => x / 0.44704, precision: 2 },
  kn:  { id: 'kn',  name: 'knot', symbol: 'kn', categoryId: 'speed', toSI: x => x * 0.514444, fromSI: x => x / 0.514444, precision: 3 },

  /* ============= ACCELERATION (base: m/s²) ============= */
  ms2:  { id: 'ms2',  name: 'meter per second squared', symbol: 'm/s²', categoryId: 'acceleration', toSI: x => x, fromSI: x => x, precision: 3 },
  fts2: { id: 'fts2', name: 'foot per second squared',  symbol: 'ft/s²',categoryId: 'acceleration', toSI: x => x * FT_TO_M, fromSI: x => x / FT_TO_M, precision: 3 },
  g0:   { id: 'g0',   name: 'standard gravity',         symbol: 'g₀',   categoryId: 'acceleration', toSI: x => x * 9.80665, fromSI: x => x / 9.80665, precision: 4 },

  /* ============= FORCE (base: newton) ============= */
  N:   { id: 'N',   name: 'newton',     symbol: 'N',    categoryId: 'force', toSI: x => x,               fromSI: x => x,               precision: 3 },
  kN:  { id: 'kN',  name: 'kilonewton', symbol: 'kN',   categoryId: 'force', toSI: x => x * 1000,        fromSI: x => x / 1000,        precision: 3 },
  lbf: { id: 'lbf', name: 'pound-force',symbol: 'lbf',  categoryId: 'force', toSI: x => x * LBF_TO_N,     fromSI: x => x / LBF_TO_N,     precision: 3 },
  kgf: { id: 'kgf', name: 'kilogram-force', symbol: 'kgf', categoryId: 'force', toSI: x => x * KGF_TO_N, fromSI: x => x / KGF_TO_N,     precision: 3 },

  /* ============= PRESSURE (base: pascal) ============= */
  Pa:  { id: 'Pa',  name: 'pascal',      symbol: 'Pa',   categoryId: 'pressure', toSI: x => x,          fromSI: x => x,          precision: 1 },
  kPa: { id: 'kPa', name: 'kilopascal',  symbol: 'kPa',  categoryId: 'pressure', toSI: x => x * 1000,   fromSI: x => x / 1000,   precision: 2 },
  bar: { id: 'bar', name: 'bar',         symbol: 'bar',  categoryId: 'pressure', toSI: x => x * BAR_TO_PA, fromSI: x => x / BAR_TO_PA, precision: 3 },
  atm: { id: 'atm', name: 'atmosphere',  symbol: 'atm',  categoryId: 'pressure', toSI: x => x * ATM_TO_PA, fromSI: x => x / ATM_TO_PA, precision: 4 },
  psi: { id: 'psi', name: 'pound per square inch', symbol: 'psi', categoryId: 'pressure', toSI: x => x * PSI_TO_PA, fromSI: x => x / PSI_TO_PA, precision: 3 },
  mmHg:{ id: 'mmHg',name: 'millimeter of mercury', symbol: 'mmHg', categoryId: 'pressure', toSI: x => x * TORR_TO_PA, fromSI: x => x / TORR_TO_PA, precision: 2 },

  /* ============= ENERGY (base: joule) ============= */
  J:   { id: 'J',   name: 'joule',       symbol: 'J',   categoryId: 'energy', toSI: x => x,                          fromSI: x => x,                          precision: 2 },
  kJ:  { id: 'kJ',  name: 'kilojoule',   symbol: 'kJ',  categoryId: 'energy', toSI: x => x * 1000,                   fromSI: x => x / 1000,                   precision: 2 },
  Wh:  { id: 'Wh',  name: 'watt-hour',   symbol: 'Wh',  categoryId: 'energy', toSI: x => x * WH_TO_J,                fromSI: x => x / WH_TO_J,                precision: 2 },
  kWh: { id: 'kWh', name: 'kilowatt-hour', symbol: 'kWh', categoryId: 'energy', toSI: x => x * 1000 * WH_TO_J,       fromSI: x => x / (1000 * WH_TO_J),       precision: 3 },
  cal: { id: 'cal', name: 'calorie',     symbol: 'cal', categoryId: 'energy', toSI: x => x * CAL_TO_J,               fromSI: x => x / CAL_TO_J,               precision: 2 },
  kcal:{ id: 'kcal',name: 'kilocalorie', symbol: 'kcal',categoryId: 'energy', toSI: x => x * 1000 * CAL_TO_J,        fromSI: x => x / (1000 * CAL_TO_J),      precision: 2 },
  BTU: { id: 'BTU', name: 'BTU (IT)',    symbol: 'BTU', categoryId: 'energy', toSI: x => x * BTU_TO_J,               fromSI: x => x / BTU_TO_J,               precision: 2 },

  /* ============= POWER (base: watt) ============= */
  W:   { id: 'W',   name: 'watt',        symbol: 'W',   categoryId: 'power', toSI: x => x,                     fromSI: x => x,                     precision: 2 },
  kW:  { id: 'kW',  name: 'kilowatt',    symbol: 'kW',  categoryId: 'power', toSI: x => x * 1000,              fromSI: x => x / 1000,              precision: 2 },
  MW:  { id: 'MW',  name: 'megawatt',    symbol: 'MW',  categoryId: 'power', toSI: x => x * 1e6,               fromSI: x => x / 1e6,               precision: 3 },
  hp:  { id: 'hp',  name: 'horsepower (mechanical)', symbol: 'hp', categoryId: 'power', toSI: x => x * HP_MECH_TO_W, fromSI: x => x / HP_MECH_TO_W,    precision: 3 },

  /* ============= TEMPERATURE (base: kelvin) ============= */
  K: { id: 'K', name: 'kelvin', symbol: 'K', categoryId: 'temperature', toSI: x => x, fromSI: x => x, precision: 2 },
  C: { id: 'C', name: 'celsius', symbol: '°C', categoryId: 'temperature', toSI: celsiusToKelvin, fromSI: kelvinToCelsius, precision: 2 },
  F: { id: 'F', name: 'fahrenheit', symbol: '°F', categoryId: 'temperature', toSI: fahrenheitToKelvin, fromSI: kelvinToFahrenheit, precision: 2 },

  /* ============= ANGLE (base: radian) ============= */
  rad:   { id: 'rad',   name: 'radian',    symbol: 'rad', categoryId: 'angle', toSI: x => x,                  fromSI: x => x,                  precision: 5 },
  deg:   { id: 'deg',   name: 'degree',    symbol: '°',   categoryId: 'angle', toSI: x => x * Math.PI/180,    fromSI: x => x * 180/Math.PI,    precision: 3 },
  grad:  { id: 'grad',  name: 'gradian',   symbol: 'gon', categoryId: 'angle', toSI: x => x * Math.PI/200,    fromSI: x => x * 200/Math.PI,    precision: 3 },
  arcmin:{ id: 'arcmin',name: 'arcminute', symbol: '′',   categoryId: 'angle', toSI: x => x * Math.PI/(180*60), fromSI: x => x * (180*60)/Math.PI, precision: 4 },
  arcsec:{ id: 'arcsec',name: 'arcsecond', symbol: '″',   categoryId: 'angle', toSI: x => x * Math.PI/(180*3600), fromSI: x => x * (180*3600)/Math.PI, precision: 5 },

  /* ============= FREQUENCY (base: hertz) ============= */
  Hz:  { id: 'Hz',  name: 'hertz',       symbol: 'Hz',  categoryId: 'frequency', toSI: x => x,           fromSI: x => x,           precision: 3 },
  kHz: { id: 'kHz', name: 'kilohertz',   symbol: 'kHz', categoryId: 'frequency', toSI: x => x * 1000,    fromSI: x => x / 1000,    precision: 2 },
  MHz: { id: 'MHz', name: 'megahertz',   symbol: 'MHz', categoryId: 'frequency', toSI: x => x * 1e6,     fromSI: x => x / 1e6,     precision: 3 },
  GHz: { id: 'GHz', name: 'gigahertz',   symbol: 'GHz', categoryId: 'frequency', toSI: x => x * 1e9,     fromSI: x => x / 1e9,     precision: 3 },
  rpm: { id: 'rpm', name: 'revolutions per minute', symbol: 'rpm', categoryId: 'frequency', toSI: x => x * RPM_TO_HZ, fromSI: x => x / RPM_TO_HZ, precision: 3 },

  /* ============= TORQUE (base: newton meter) ============= */
  Nm:    { id: 'Nm',    name: 'newton meter', symbol: 'N·m',   categoryId: 'torque', toSI: x => x, fromSI: x => x, precision: 2 },
  lbf_ft:{ id: 'lbf_ft',name: 'pound-foot',   symbol: 'lb·ft', categoryId: 'torque', toSI: x => x * LBF_TO_N * FT_TO_M, fromSI: x => x / (LBF_TO_N * FT_TO_M), precision: 2 },

  /* ============= DENSITY (base: kg/m³) ============= */
  kg_m3: { id: 'kg_m3', name: 'kilogram per cubic meter', symbol: 'kg/m³', categoryId: 'density', toSI: x => x, fromSI: x => x, precision: 2 },
  g_cm3: { id: 'g_cm3', name: 'gram per cubic centimeter', symbol: 'g/cm³', categoryId: 'density', toSI: x => x * 1000, fromSI: x => x / 1000, precision: 4 },
  lb_ft3:{ id: 'lb_ft3',name: 'pound per cubic foot', symbol: 'lb/ft³', categoryId: 'density', toSI: x => x * (LB_TO_KG / Math.pow(FT_TO_M, 3)), fromSI: x => x / (LB_TO_KG / Math.pow(FT_TO_M, 3)), precision: 3 },

  /* ============= VOLUMETRIC FLOW (base: m³/s) ============= */
  m3_s:   { id: 'm3_s',   name: 'cubic meter per second', symbol: 'm³/s',   categoryId: 'flow', toSI: x => x, fromSI: x => x, precision: 4 },
  L_min:  { id: 'L_min',  name: 'liter per minute',       symbol: 'L/min',  categoryId: 'flow', toSI: x => (x * L_TO_M3) / 60, fromSI: x => (x * 60) / L_TO_M3, precision: 3 },
  gal_min:{ id: 'gal_min',name: 'US gallon per minute',   symbol: 'gal/min',categoryId: 'flow', toSI: x => (x * GAL_US_TO_L * L_TO_M3) / 60, fromSI: x => (x * 60) / (GAL_US_TO_L * L_TO_M3), precision: 3 },

  /* ============= DATA STORAGE (base: byte) ============= */
  B:   { id: 'B',   name: 'byte',  symbol: 'B',   categoryId: 'storage', toSI: x => x,         fromSI: x => x,         precision: 0 },
  kB:  { id: 'kB',  name: 'kilobyte (10³)', symbol: 'kB', categoryId: 'storage', toSI: x => x * 1e3, fromSI: x => x / 1e3, precision: 2 },
  MB:  { id: 'MB',  name: 'megabyte (10⁶)', symbol: 'MB', categoryId: 'storage', toSI: x => x * 1e6, fromSI: x => x / 1e6, precision: 2 },
  GB:  { id: 'GB',  name: 'gigabyte (10⁹)', symbol: 'GB', categoryId: 'storage', toSI: x => x * 1e9, fromSI: x => x / 1e9, precision: 2 },
  TB:  { id: 'TB',  name: 'terabyte (10¹²)', symbol: 'TB', categoryId: 'storage', toSI: x => x * 1e12, fromSI: x => x / 1e12, precision: 2 },
  KiB: { id: 'KiB', name: 'kibibyte (2¹⁰)', symbol: 'KiB', categoryId: 'storage', toSI: x => x * 1024, fromSI: x => x / 1024, precision: 2 },
  MiB: { id: 'MiB', name: 'mebibyte (2²⁰)', symbol: 'MiB', categoryId: 'storage', toSI: x => x * 1048576, fromSI: x => x / 1048576, precision: 2 },
  GiB: { id: 'GiB', name: 'gibibyte (2³⁰)', symbol: 'GiB', categoryId: 'storage', toSI: x => x * 1073741824, fromSI: x => x / 1073741824, precision: 2 },
  TiB: { id: 'TiB', name: 'tebibyte (2⁴⁰)', symbol: 'TiB', categoryId: 'storage', toSI: x => x * 1099511627776, fromSI: x => x / 1099511627776, precision: 2 },

  /* ============= DATA RATE (base: bit/s) ============= */
  bps:  { id: 'bps',  name: 'bit per second',            symbol: 'bit/s', categoryId: 'datarate', toSI: x => x,      fromSI: x => x,      precision: 0 },
  Kbps: { id: 'Kbps', name: 'kilobit per second (10³)',  symbol: 'kb/s',  categoryId: 'datarate', toSI: x => x * 1e3,fromSI: x => x / 1e3,precision: 0 },
  Mbps: { id: 'Mbps', name: 'megabit per second (10⁶)',  symbol: 'Mb/s',  categoryId: 'datarate', toSI: x => x * 1e6,fromSI: x => x / 1e6,precision: 0 },
  Gbps: { id: 'Gbps', name: 'gigabit per second (10⁹)',  symbol: 'Gb/s',  categoryId: 'datarate', toSI: x => x * 1e9,fromSI: x => x / 1e9,precision: 0 },
  Bps:  { id: 'Bps',  name: 'byte per second',           symbol: 'B/s',   categoryId: 'datarate', toSI: x => x * 8,  fromSI: x => x / 8,  precision: 0 },
  KiBps:{ id: 'KiBps',name: 'kibibyte per second (2¹⁰)', symbol: 'KiB/s', categoryId: 'datarate', toSI: x => x * 8 * 1024, fromSI: x => x / (8 * 1024), precision: 0 },
  MiBps:{ id: 'MiBps',name: 'mebibyte per second (2²⁰)', symbol: 'MiB/s', categoryId: 'datarate', toSI: x => x * 8 * 1048576, fromSI: x => x / (8 * 1048576), precision: 0 },

  /* ============= FUEL ECONOMY (base: L/100km) ============= */
  L_100km: { id: 'L_100km', name: 'liters per 100 km',      symbol: 'L/100 km', categoryId: 'fueleconomy',
    toSI: x => x, fromSI: x => x, precision: 2 },
  km_L: { id: 'km_L', name: 'kilometers per liter',         symbol: 'km/L',      categoryId: 'fueleconomy',
    toSI: x => 100 / x, fromSI: x => 100 / x, precision: 2 },
  mpgUS: { id: 'mpgUS', name: 'miles per gallon (US)',      symbol: 'mpg (US)',  categoryId: 'fueleconomy',
    toSI: x => (100 * GAL_US_TO_L) / (x * (MI_TO_M / 1000)), fromSI: x => (100 * GAL_US_TO_L) / (x * (MI_TO_M / 1000)), precision: 2 },
  mpgImp: { id: 'mpgImp', name: 'miles per gallon (Imp)',   symbol: 'mpg (Imp)', categoryId: 'fueleconomy',
    toSI: x => (100 * GAL_IMP_TO_L) / (x * (MI_TO_M / 1000)), fromSI: x => (100 * GAL_IMP_TO_L) / (x * (MI_TO_M / 1000)), precision: 2 },
};

export const CATEGORIES: Record<string, Category> = {
  length:       { id: 'length',       name: 'Length',           baseUnitId: 'm',   units: ['m','km','cm','mm','in','ft','yd','mi'], icon: 'ruler',         color: '#3B82F6' },
  area:         { id: 'area',         name: 'Area',             baseUnitId: 'm2',  units: ['m2','km2','cm2','mm2','ha','ac','ft2','in2'], icon: 'square',  color: '#7C3AED' },
  volume:       { id: 'volume',       name: 'Volume',           baseUnitId: 'm3',  units: ['m3','L','mL','ft3','in3','gal','galImp'], icon: 'beaker',       color: '#06B6D4' },
  mass:         { id: 'mass',         name: 'Mass',             baseUnitId: 'kg',  units: ['kg','g','mg','lb','oz','t','tonUS'],       icon: 'weight',       color: '#10B981' },
  time:         { id: 'time',         name: 'Time',             baseUnitId: 's',   units: ['ms','s','min','h','day'],                 icon: 'clock',        color: '#F59E0B' },
  speed:        { id: 'speed',        name: 'Speed',            baseUnitId: 'mps', units: ['mps','kmh','mph','kn'],                   icon: 'gauge',        color: '#F59E0B' },
  acceleration: { id: 'acceleration', name: 'Acceleration',     baseUnitId: 'ms2', units: ['ms2','fts2','g0'],                        icon: 'activity',     color: '#EF4444' },
  force:        { id: 'force',        name: 'Force',            baseUnitId: 'N',   units: ['N','kN','lbf','kgf'],                     icon: 'arrow-big-down', color: '#F97316' },
  pressure:     { id: 'pressure',     name: 'Pressure',         baseUnitId: 'Pa',  units: ['Pa','kPa','bar','atm','psi','mmHg'],      icon: 'gauge',        color: '#0EA5E9' },
  energy:       { id: 'energy',       name: 'Energy',           baseUnitId: 'J',   units: ['J','kJ','Wh','kWh','cal','kcal','BTU'],   icon: 'bolt',         color: '#EAB308' },
  power:        { id: 'power',        name: 'Power',            baseUnitId: 'W',   units: ['W','kW','MW','hp'],                       icon: 'zap',          color: '#22C55E' },
  temperature:  { id: 'temperature',  name: 'Temperature',      baseUnitId: 'K',   units: ['C','F','K'],                               icon: 'thermometer',  color: '#EF4444' },

  angle:        { id: 'angle',        name: 'Angle',            baseUnitId: 'rad', units: ['rad','deg','grad','arcmin','arcsec'],      icon: 'triangle',     color: '#F472B6' },
  frequency:    { id: 'frequency',    name: 'Frequency',        baseUnitId: 'Hz',  units: ['Hz','kHz','MHz','GHz','rpm'],              icon: 'waveform',     color: '#0EA5E9' },
  torque:       { id: 'torque',       name: 'Torque',           baseUnitId: 'Nm',  units: ['Nm','lbf_ft'],                             icon: 'rotate-ccw',   color: '#F59E0B' },
  density:      { id: 'density',      name: 'Density',          baseUnitId: 'kg_m3', units: ['kg_m3','g_cm3','lb_ft3'],                icon: 'droplets',     color: '#22D3EE' },
  flow:         { id: 'flow',         name: 'Volumetric Flow',  baseUnitId: 'm3_s', units: ['m3_s','L_min','gal_min'],                 icon: 'air-vent',     color: '#60A5FA' },

  storage:      { id: 'storage',      name: 'Digital Storage',  baseUnitId: 'B',   units: ['B','kB','MB','GB','TB','KiB','MiB','GiB','TiB'], icon: 'hard-drive', color: '#8B5CF6' },
  datarate:     { id: 'datarate',     name: 'Data Rate',        baseUnitId: 'bps', units: ['bps','Kbps','Mbps','Gbps','Bps','KiBps','MiBps'], icon: 'wifi',    color: '#06B6D4' },

  fueleconomy:  { id: 'fueleconomy',  name: 'Fuel Economy',     baseUnitId: 'L_100km', units: ['L_100km','km_L','mpgUS','mpgImp'],     icon: 'car',          color: '#16A34A' },
};
