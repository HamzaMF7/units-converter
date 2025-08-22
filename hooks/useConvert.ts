// import { useMemo } from 'react';
// import { UNITS } from '../data/units';
// import { ConversionResult } from '../types';

// export const useConvert = () => {
//   const convert = useMemo(() => {
//     return (value: number, fromUnitId: string, toUnitId: string): number => {
//       const fromUnit = UNITS[fromUnitId];
//       const toUnit = UNITS[toUnitId];
      
//       if (!fromUnit || !toUnit || fromUnit.categoryId !== toUnit.categoryId) {
//         throw new Error('Invalid unit conversion');
//       }
      
//       // Convert to SI base unit, then to target unit
//       const siValue = fromUnit.toSI(value);
//       return toUnit.fromSI(siValue);
//     };
//   }, []);

//   const convertToAll = useMemo(() => {
//     return (value: number, fromUnitId: string, categoryId: string): ConversionResult[] => {
//       if (isNaN(value) || !isFinite(value)) return [];
      
//       const fromUnit = UNITS[fromUnitId];
//       if (!fromUnit || fromUnit.categoryId !== categoryId) return [];
      
//       const siValue = fromUnit.toSI(value);
      
//       return Object.values(UNITS)
//         .filter(unit => unit.categoryId === categoryId)
//         .map(unit => ({
//           value: unit.fromSI(siValue),
//           unit,
//           formatted: formatNumber(unit.fromSI(siValue), unit.precision || 3)
//         }))
//         .sort((a, b) => {
//           // Prioritize the target unit if it exists
//           if (a.unit.id === fromUnitId) return -1;
//           if (b.unit.id === fromUnitId) return 1;
//           return 0;
//         });
//     };
//   }, []);

//   return { convert, convertToAll };
// };

// function formatNumber(value: number, precision: number): string {
//   if (!isFinite(value)) return 'Invalid';
  
//   // Handle very large/small numbers with scientific notation
//   if (Math.abs(value) >= 1e15 || (Math.abs(value) < 1e-6 && value !== 0)) {
//     return value.toExponential(Math.min(precision, 6));
//   }
  
//   // Banking rounding and smart trimming
//   const rounded = Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
//   const formatted = rounded.toFixed(precision);
  
//   // Trim unnecessary trailing zeros
//   return formatted.replace(/\.?0+$/, '') || '0';
// }


import { useAppStore } from '@/store';
import { useMemo } from 'react';
import { UNITS } from '../data/units';
import type { ConversionResult } from '../types';

export const useConvert = () => {
  const { settings } = useAppStore(); // { precision, decimalFormat }

  const formatNumber = useMemo(() => {
    const dec = settings.decimalFormat ?? '.';
    const defaultPrec = settings.precision ?? 3;

    return (value: number, precision = defaultPrec): string => {
      if (!isFinite(value)) return 'Invalid';

      // scientific for extreme magnitudes
      if (Math.abs(value) >= 1e15 || (Math.abs(value) < 1e-6 && value !== 0)) {
        const s = value.toExponential(Math.min(precision, 6));
        return dec === ',' ? s.replace('.', ',') : s;
      }

      const p = Math.pow(10, precision);
      const rounded = Math.round(value * p) / p;
      let str = rounded.toFixed(precision).replace(/\.?0+$/, '') || '0';
      if (dec === ',') str = str.replace('.', ',');
      return str;
    };
  }, [settings.decimalFormat, settings.precision]);

  const convert = useMemo(() => {
    return (value: number, fromUnitId: string, toUnitId: string): number => {
      const fromUnit = UNITS[fromUnitId];
      const toUnit = UNITS[toUnitId];

      if (!fromUnit) throw new Error(`Unknown fromUnit: ${fromUnitId}`);
      if (!toUnit)   throw new Error(`Unknown toUnit: ${toUnitId}`);
      if (fromUnit.categoryId !== toUnit.categoryId) {
        throw new Error(`Cannot convert ${fromUnitId} (${fromUnit.categoryId}) to ${toUnitId} (${toUnit.categoryId})`);
      }

      const baseValue = fromUnit.toSI(value);
      return toUnit.fromSI(baseValue);
    };
  }, []);

  const convertToAll = useMemo(() => {
    return (value: number, fromUnitId: string, categoryId: string): ConversionResult[] => {
      if (isNaN(value) || !isFinite(value)) return [];

      const fromUnit = UNITS[fromUnitId];
      if (!fromUnit || fromUnit.categoryId !== categoryId) return [];

      const baseValue = fromUnit.toSI(value);

      const results = Object.values(UNITS)
        .filter(u => u.categoryId === categoryId)
        .map(u => {
          const v = u.fromSI(baseValue);
          const prec = u.precision ?? settings.precision ?? 3;
          return {
            value: v,
            unit: u,
            formatted: formatNumber(v, prec),
          };
        });

      // Put the source unit first, then stable alphabetical by symbol/name
      results.sort((a, b) => {
        if (a.unit.id === fromUnitId) return -1;
        if (b.unit.id === fromUnitId) return 1;
        const aKey = a.unit.symbol || a.unit.name;
        const bKey = b.unit.symbol || b.unit.name;
        return aKey.localeCompare(bKey);
      });

      return results;
    };
  }, [formatNumber, settings.precision]);

  return { convert, convertToAll };
};
