export function speedConverter(value, fromUnit, toUnit) {
  console.log("From " + fromUnit + " To " + toUnit);
  const conversionFactors = {
    knots: { knots: 1, mph: 1.15078, fps: 1.68781, kmh: 1.852, mps: 0.514444 },
    mph: { knots: 0.868976, mph: 1, fps: 1.46667, kmh: 1.60934, mps: 0.44704 },
    fps: { knots: 0.592484, mph: 0.681818, fps: 1, kmh: 1.09728, mps: 0.3048 },
    kmh: {
      knots: 0.539957,
      mph: 0.621371,
      fps: 0.911344,
      kmh: 1,
      mps: 0.277778,
    },
    mps: { knots: 1.94384, mph: 2.23694, fps: 3.28084, kmh: 3.6, mps: 1 },
  };

  if (!(fromUnit in conversionFactors) || !(toUnit in conversionFactors)) {
    return "Invalid units. Units should be one of: knots, mph, fps, kmh, mps";
  }

  const conversionFactor = conversionFactors[fromUnit][toUnit];
  const convertedValue = value * conversionFactor;
  return convertedValue.toFixed(4);
}

export function pressureConverter(value, fromUnit, toUnit) {
  const conversionFactors = {
    Pa: {
      Pa: 1,
      mbar: 0.01,
      bar: 0.00001,
      mmHg: 0.00750062,
      atm: 0.00000986923,
    },
    mbar: { Pa: 100, mbar: 1, bar: 0.001, mmHg: 0.750062, atm: 0.000986923 },
    bar: { Pa: 100000, mbar: 1000, bar: 1, mmHg: 750.062, atm: 0.986923 },
    mmHg: {
      Pa: 133.322,
      mbar: 1.33322,
      bar: 0.00133322,
      mmHg: 1,
      atm: 0.00131579,
    },
    atm: { Pa: 101325, mbar: 1013.25, bar: 1.01325, mmHg: 760, atm: 1 },
  };

  if (!(fromUnit in conversionFactors) || !(toUnit in conversionFactors)) {
    return "Invalid units. Units should be one of: Pa, mbar, bar, mmHg, atm";
  }

  const conversionFactor = conversionFactors[fromUnit][toUnit];
  const convertedValue = value * conversionFactor;
  return convertedValue.toFixed(4);
}

export function speedConversionFactor(fromUnit, toUnit) {
  console.log("From " + fromUnit + " To " + toUnit);
  const conversionFactors = {
    knots: { knots: 1, mph: 1.15078, fps: 1.68781, kmh: 1.852, mps: 0.514444 },
    mph: { knots: 0.868976, mph: 1, fps: 1.46667, kmh: 1.60934, mps: 0.44704 },
    fps: { knots: 0.592484, mph: 0.681818, fps: 1, kmh: 1.09728, mps: 0.3048 },
    kmh: {
      knots: 0.539957,
      mph: 0.621371,
      fps: 0.911344,
      kmh: 1,
      mps: 0.277778,
    },
    mps: { knots: 1.94384, mph: 2.23694, fps: 3.28084, kmh: 3.6, mps: 1 },
  };

  if (!(fromUnit in conversionFactors) || !(toUnit in conversionFactors)) {
    return "Invalid units. Units should be one of: knots, mph, fps, kmh, mps";
  }

  const conversionFactor = conversionFactors[fromUnit][toUnit];
  return conversionFactor;
}

export function pressureConversionFactor(fromUnit, toUnit) {
  const conversionFactors = {
    Pa: {
      Pa: 1,
      mbar: 0.01,
      bar: 0.00001,
      mmHg: 0.00750062,
      atm: 0.00000986923,
    },
    mbar: { Pa: 100, mbar: 1, bar: 0.001, mmHg: 0.750062, atm: 0.000986923 },
    bar: { Pa: 100000, mbar: 1000, bar: 1, mmHg: 750.062, atm: 0.986923 },
    mmHg: {
      Pa: 133.322,
      mbar: 1.33322,
      bar: 0.00133322,
      mmHg: 1,
      atm: 0.00131579,
    },
    atm: { Pa: 101325, mbar: 1013.25, bar: 1.01325, mmHg: 760, atm: 1 },
  };

  if (!(fromUnit in conversionFactors) || !(toUnit in conversionFactors)) {
    return "Invalid units. Units should be one of: Pa, mbar, bar, mmHg, atm";
  }

  const conversionFactor = conversionFactors[fromUnit][toUnit];
  return conversionFactor;
}
