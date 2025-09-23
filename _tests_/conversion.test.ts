// tests/conversion.test.ts
import { UNITS } from '@/data/units';

describe('Conversion Engine', () => {
  /* -------------------- Temperature -------------------- */
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
      expect(celsiusToKelvin).toBeCloseTo(0, 6);

      const result = kelvin.fromSI(celsiusToKelvin);
      expect(result).toBeCloseTo(0, 6);
    });
  });

  /* -------------------- Length -------------------- */
  describe('Length conversions', () => {
    test('Meters to feet', () => {
      const meter = UNITS['m'];
      const foot = UNITS['ft'];

      // 1m ≈ 3.28084 ft
      const meterToSI = meter.toSI(1);
      const result = foot.fromSI(meterToSI);
      expect(result).toBeCloseTo(3.28084, 5);
    });

    test('Inches to meters', () => {
      const inch = UNITS['in'];
      const meter = UNITS['m'];

      // 12 inches = 1 foot = 0.3048m
      const inchesToSI = inch.toSI(12);
      const result = meter.fromSI(inchesToSI);
      expect(result).toBeCloseTo(0.3048, 6);
    });
  });

  /* -------------------- Area -------------------- */
  describe('Area conversions', () => {
    test('Acre to square meters', () => {
      const acre = UNITS['ac'];
      const m2 = UNITS['m2'];

      const acToSI = acre.toSI(1);
      const result = m2.fromSI(acToSI);
      expect(result).toBeCloseTo(4046.8564224, 6);
    });

    test('Hectare to acres', () => {
      const ha = UNITS['ha'];
      const ac = UNITS['ac'];

      const haToSI = ha.toSI(1);
      const result = ac.fromSI(haToSI);
      expect(result).toBeCloseTo(2.47105381, 5);
    });
  });

  /* -------------------- Volume -------------------- */
  describe('Volume conversions', () => {
    test('US gallon to liters', () => {
      const gal = UNITS['gal'];
      const L = UNITS['L'];

      const galToSI = gal.toSI(1);
      const result = L.fromSI(galToSI);
      expect(result).toBeCloseTo(3.785411784, 9);
    });

    test('Imperial gallon to liters', () => {
      const galImp = UNITS['galImp'];
      const L = UNITS['L'];

      const galImpToSI = galImp.toSI(1);
      const result = L.fromSI(galImpToSI);
      expect(result).toBeCloseTo(4.54609, 5);
    });

    test('Cubic foot to liters', () => {
      const ft3 = UNITS['ft3'];
      const L = UNITS['L'];

      const ft3ToSI = ft3.toSI(1);
      const result = L.fromSI(ft3ToSI);
      expect(result).toBeCloseTo(28.316846592, 9);
    });
  });

  /* -------------------- Mass -------------------- */
  describe('Mass conversions', () => {
    test('Pound to kilogram', () => {
      const lb = UNITS['lb'];
      const kg = UNITS['kg'];

      const lbToSI = lb.toSI(1);
      const result = kg.fromSI(lbToSI);
      expect(result).toBeCloseTo(0.45359237, 8);
    });

    test('Ounce to gram', () => {
      const oz = UNITS['oz'];
      const g = UNITS['g'];

      const ozToSI = oz.toSI(1);
      const result = g.fromSI(ozToSI);
      expect(result).toBeCloseTo(28.349523125, 6);
    });
  });

  /* -------------------- Time -------------------- */
  describe('Time conversions', () => {
    test('Hours to seconds', () => {
      const h = UNITS['h'];
      const s = UNITS['s'];

      const hToSI = h.toSI(1);
      const result = s.fromSI(hToSI);
      expect(result).toBe(3600);
    });

    test('Milliseconds to seconds', () => {
      const ms = UNITS['ms'];
      const s = UNITS['s'];

      const msToSI = ms.toSI(1500);
      const result = s.fromSI(msToSI);
      expect(result).toBeCloseTo(1.5, 6);
    });
  });

  /* -------------------- Speed -------------------- */
  describe('Speed conversions', () => {
    test('m/s to km/h', () => {
      const mps = UNITS['mps'];
      const kmh = UNITS['kmh'];

      const si = mps.toSI(10);
      const result = kmh.fromSI(si);
      expect(result).toBeCloseTo(36, 6);
    });

    test('mph to km/h', () => {
      const mph = UNITS['mph'];
      const kmh = UNITS['kmh'];

      const si = mph.toSI(60);
      const result = kmh.fromSI(si);
      expect(result).toBeCloseTo(96.56064, 5);
    });

    test('knots to m/s', () => {
      const kn = UNITS['kn'];
      const mps = UNITS['mps'];

      const si = kn.toSI(10);
      const result = mps.fromSI(si);
      expect(result).toBeCloseTo(5.14444, 5);
    });
  });

  /* -------------------- Acceleration -------------------- */
  describe('Acceleration conversions', () => {
    test('g0 to m/s²', () => {
      const g0 = UNITS['g0'];
      const ms2 = UNITS['ms2'];

      const si = g0.toSI(1);
      const result = ms2.fromSI(si);
      expect(result).toBeCloseTo(9.80665, 5);
    });
  });

  /* -------------------- Force -------------------- */
  describe('Force conversions', () => {
    test('lbf to N', () => {
      const lbf = UNITS['lbf'];
      const N = UNITS['N'];

      const si = lbf.toSI(1);
      const result = N.fromSI(si);
      expect(result).toBeCloseTo(4.4482216153, 6);
    });
  });

  /* -------------------- Pressure -------------------- */
  describe('Pressure conversions', () => {
    test('atm to kPa', () => {
      const atm = UNITS['atm'];
      const kPa = UNITS['kPa'];

      const si = atm.toSI(1);
      const result = kPa.fromSI(si);
      expect(result).toBeCloseTo(101.325, 3);
    });

    test('bar to psi', () => {
      const bar = UNITS['bar'];
      const psi = UNITS['psi'];

      const si = bar.toSI(1);
      const result = psi.fromSI(si);
      expect(result).toBeCloseTo(14.5037738, 5);
    });
  });

  /* -------------------- Energy -------------------- */
  describe('Energy conversions', () => {
    test('kWh to J', () => {
      const kWh = UNITS['kWh'];
      const J = UNITS['J'];

      const si = kWh.toSI(1);
      const result = J.fromSI(si);
      expect(result).toBe(3600000);
    });

    test('cal to J', () => {
      const cal = UNITS['cal'];
      const J = UNITS['J'];

      const si = cal.toSI(500);
      const result = J.fromSI(si);
      expect(result).toBeCloseTo(2092, 0); // 500 * 4.184
    });
  });

  /* -------------------- Power -------------------- */
  describe('Power conversions', () => {
    test('hp to W', () => {
      const hp = UNITS['hp'];
      const W = UNITS['W'];

      const si = hp.toSI(1);
      const result = W.fromSI(si);
      expect(result).toBeCloseTo(745.6998716, 4);
    });

    test('kW to hp', () => {
      const kW = UNITS['kW'];
      const hp = UNITS['hp'];

      const si = kW.toSI(2);
      const result = hp.fromSI(si);
      expect(result).toBeCloseTo(2.682, 3);
    });
  });

  /* -------------------- Angle -------------------- */
  describe('Angle conversions', () => {
    test('deg to rad', () => {
      const deg = UNITS['deg'];
      const rad = UNITS['rad'];

      const si = deg.toSI(180);
      const result = rad.fromSI(si);
      expect(result).toBeCloseTo(Math.PI, 10);
    });

    test('rad to deg', () => {
      const rad = UNITS['rad'];
      const deg = UNITS['deg'];

      const si = rad.toSI(1);
      const result = deg.fromSI(si);
      expect(result).toBeCloseTo(57.2957795, 6);
    });
  });

  /* -------------------- Frequency -------------------- */
  describe('Frequency conversions', () => {
    test('rpm to Hz', () => {
      const rpm = UNITS['rpm'];
      const Hz = UNITS['Hz'];

      const si = rpm.toSI(60);
      const result = Hz.fromSI(si);
      expect(result).toBeCloseTo(1, 10);
    });

    test('Hz to kHz', () => {
      const Hz = UNITS['Hz'];
      const kHz = UNITS['kHz'];

      const si = Hz.toSI(1000);
      const result = kHz.fromSI(si);
      expect(result).toBeCloseTo(1, 10);
    });
  });

  /* -------------------- Torque -------------------- */
  describe('Torque conversions', () => {
    test('lb·ft to N·m', () => {
      const lbf_ft = UNITS['lbf_ft'];
      const Nm = UNITS['Nm'];

      const si = lbf_ft.toSI(10); // 10 lb·ft
      const result = Nm.fromSI(si);
      expect(result).toBeCloseTo(13.558, 3);
    });
  });

  /* -------------------- Density -------------------- */
  describe('Density conversions', () => {
    test('g/cm³ to kg/m³', () => {
      const g_cm3 = UNITS['g_cm3'];
      const kg_m3 = UNITS['kg_m3'];

      const si = g_cm3.toSI(1);   // 1 g/cm³
      const result = kg_m3.fromSI(si);
      expect(result).toBeCloseTo(1000, 6);
    });

    test('lb/ft³ water ≈ 62.42796 → kg/m³ ≈ 1000', () => {
      const lb_ft3 = UNITS['lb_ft3'];
      const kg_m3 = UNITS['kg_m3'];

      const si = lb_ft3.toSI(62.42796);
      const result = kg_m3.fromSI(si);
      expect(result).toBeCloseTo(1000, 0);
    });
  });

  /* -------------------- Volumetric Flow -------------------- */
  describe('Volumetric flow conversions', () => {
    test('gal/min (US) to L/min', () => {
      const gal_min = UNITS['gal_min'];
      const L_min = UNITS['L_min'];

      const si = gal_min.toSI(1);
      const result = L_min.fromSI(si);
      expect(result).toBeCloseTo(3.785411784, 6);
    });
  });

  /* -------------------- Digital storage -------------------- */
  describe('Digital storage conversions', () => {
    test('kB vs KiB difference (decimal vs binary)', () => {
      const kB = UNITS['kB'];
      const KiB = UNITS['KiB'];

      // 1 kB = 1000 B, 1 KiB = 1024 B
      expect(kB.toSI(1)).toBe(1000);
      expect(KiB.toSI(1)).toBe(1024);
    });

    test('MB to MiB', () => {
      const MB = UNITS['MB'];
      const MiB = UNITS['MiB'];

      const mbToBytes = MB.toSI(1); // 1,000,000 B
      const result = MiB.fromSI(mbToBytes); // / 1,048,576
      expect(result).toBeCloseTo(0.953674, 6);
    });
  });

  /* -------------------- Data rate -------------------- */
  describe('Data rate conversions', () => {
    test('MiB/s to Mb/s', () => {
      const MiBps = UNITS['MiBps'];
      const Mbps = UNITS['Mbps'];

      const si = MiBps.toSI(1); // 8 * 1,048,576 = 8,388,608 bit/s
      const result = Mbps.fromSI(si);
      expect(result).toBeCloseTo(8.388608, 6);
    });

    test('B/s to kb/s', () => {
      const Bps = UNITS['Bps'];
      const Kbps = UNITS['Kbps'];

      const si = Bps.toSI(125); // 125 B/s = 1000 bit/s
      const result = Kbps.fromSI(si);
      expect(result).toBeCloseTo(1, 6);
    });
  });

  /* -------------------- Fuel economy -------------------- */
  describe('Fuel economy conversions', () => {
    test('8 L/100 km to mpg (US) ≈ 29.4', () => {
      const L_100km = UNITS['L_100km'];
      const mpgUS = UNITS['mpgUS'];

      const si = L_100km.toSI(8);
      const result = mpgUS.fromSI(si);
      // 235.214583 ÷ 8 L/100 km = 29.4018229 mpg (US)
      expect(result).toBeCloseTo(29.4018, 3);
    });

    test('km/L to L/100 km (5 km/L → 20 L/100 km)', () => {
      const km_L = UNITS['km_L'];
      const L_100km = UNITS['L_100km'];

      const si = km_L.toSI(5);
      const result = L_100km.fromSI(si);
      expect(result).toBeCloseTo(20, 6);
    });
  });

  /* -------------------- Edge cases -------------------- */
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

    test('Negative values (-40°C = -40°F)', () => {
      const celsius = UNITS['C'];
      const fahrenheit = UNITS['F'];

      const celsiusToKelvin = celsius.toSI(-40);
      const result = fahrenheit.fromSI(celsiusToKelvin);
      expect(result).toBeCloseTo(-40, 2);
    });
  });
});
