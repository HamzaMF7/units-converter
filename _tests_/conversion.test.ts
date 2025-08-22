import { UNITS } from '@/data/units';

describe('Conversion Engine', () => {
  describe('Temperature conversions', () => {
    test('Celsius to Fahrenheit', () => {
      const celsius = UNITS['C'];
      const fahrenheit = UNITS['F'];
      
      // 0°C = 32°F
      const celsiusToKelvin = celsius.toSI(0);
      const result = fahrenheit.fromSI(celsiusToKelvin);
      expect(result).toBeCloseTo(32, 2);
    });

    test('Fahrenheit to Celsius', () => {
      const fahrenheit = UNITS['F'];
      const celsius = UNITS['C'];
      
      // 32°F = 0°C
      const fahrenheitToKelvin = fahrenheit.toSI(32);
      const result = celsius.fromSI(fahrenheitToKelvin);
      expect(result).toBeCloseTo(0, 2);
    });

    test('Absolute zero handling', () => {
      const celsius = UNITS['C'];
      const kelvin = UNITS['K'];
      
      // -273.15°C = 0K
      const celsiusToKelvin = celsius.toSI(-273.15);
      expect(celsiusToKelvin).toBeCloseTo(0, 2);
      
      const result = kelvin.fromSI(celsiusToKelvin);
      expect(result).toBeCloseTo(0, 2);
    });
  });

  describe('Length conversions', () => {
    test('Meters to feet', () => {
      const meter = UNITS['m'];
      const foot = UNITS['ft'];
      
      // 1m ≈ 3.28084 ft
      const meterToSI = meter.toSI(1);
      const result = foot.fromSI(meterToSI);
      expect(result).toBeCloseTo(3.28084, 4);
    });

    test('Inches to meters', () => {
      const inch = UNITS['in'];
      const meter = UNITS['m'];
      
      // 12 inches = 1 foot = 0.3048m
      const inchesToSI = inch.toSI(12);
      const result = meter.fromSI(inchesToSI);
      expect(result).toBeCloseTo(0.3048, 4);
    });
  });

  describe('Digital storage conversions', () => {
    test('KB vs KiB difference', () => {
      const kb = UNITS['KB'];
      const kib = UNITS['KiB'];
      
      // 1 KB = 1000 B, 1 KiB = 1024 B
      expect(kb.toSI(1)).toBe(1000);
      expect(kib.toSI(1)).toBe(1024);
    });

    test('MB to MiB conversion', () => {
      const mb = UNITS['MB'];
      const mib = UNITS['MiB'];
      
      // 1 MB = 1,000,000 B
      // 1 MiB = 1,048,576 B
      const mbToBytes = mb.toSI(1);
      const result = mib.fromSI(mbToBytes);
      expect(result).toBeCloseTo(0.953674, 6);
    });
  });

  describe('Edge cases', () => {
    test('Same unit conversion', () => {
      const meter = UNITS['m'];
      const siValue = meter.toSI(5);
      const result = meter.fromSI(siValue);
      expect(result).toBe(5);
    });

    test('Zero value handling', () => {
      const celsius = UNITS['C'];
      const fahrenheit = UNITS['F'];
      
      const celsiusToKelvin = celsius.toSI(0);
      const result = fahrenheit.fromSI(celsiusToKelvin);
      expect(result).toBeCloseTo(32, 2);
    });

    test('Negative values', () => {
      const celsius = UNITS['C'];
      const fahrenheit = UNITS['F'];
      
      // -40°C = -40°F
      const celsiusToKelvin = celsius.toSI(-40);
      const result = fahrenheit.fromSI(celsiusToKelvin);
      expect(result).toBeCloseTo(-40, 2);
    });
  });
});