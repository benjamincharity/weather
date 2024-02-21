export const WeatherEffectLevel = {
  Inconsequential: "Inconsequential",
  Mild: "Mild",
  Extreme: "Extreme",
} as const;

export interface Thresholds {
  cloud_cover: number[];
  precipitation: number[];
  snowfall: number[];
  temperature_2m: number[];
  uvIndex: number[];
  wind_speed_10m: number[];
}

// FIXME: We should determine if there are any industry standards for these thresholds.
export const thresholds: Thresholds = {
  cloud_cover: [20, 50], // percentage
  precipitation: [2, 10], // mm
  snowfall: [2, 5], // cm
  temperature_2m: [3, 6], // degrees
  uvIndex: [2, 5], // index
  wind_speed_10m: [10, 20], // km/h or mp/h
};

type WeatherParameter = keyof Thresholds;

/**
 * Hook to get the level of weather difference.
 *
 * @param value1 - The first value to compare.
 * @param value2 - The second value to compare.
 * @param parameter - The weather parameter to compare.
 * @returns - The level of weather difference.
 */
export function useGetWeatherDifferenceLevel(
  value1: number,
  value2: number,
  parameter: WeatherParameter,
): string {
  if (!parameter || !value1 || !value2) {
    return "";
  }
  const difference = Math.abs(value1 - value2);
  // FIXME: I think we can do better than this. Possibly leverage a type-guard.
  const paramThresholds = thresholds[parameter] as [number, number];

  if (!paramThresholds?.length) {
    return "";
  }

  if (difference <= paramThresholds[0]) {
    return WeatherEffectLevel.Inconsequential;
  } else if (difference <= paramThresholds[1]) {
    return WeatherEffectLevel.Mild;
  } else {
    return WeatherEffectLevel.Extreme;
  }
}
