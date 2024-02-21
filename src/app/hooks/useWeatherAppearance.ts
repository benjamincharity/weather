export type WeatherData = {
  isDaytime?: boolean;
  weatherCode: number; // Using WMO Weather Interpretation Codes
};

export type WeatherAppearance = {
  icon: string;
  backgroundColor: string;
};

const weatherCodeToAppearanceMap: {
  [key: number]: { day: WeatherAppearance; night: WeatherAppearance };
} = {
  0: {
    day: { icon: "clear-day.svg", backgroundColor: "#87CEEB" },
    night: { icon: "clear-night.svg", backgroundColor: "#2F2F2F" },
  },
  1: {
    day: { icon: "partly-cloudy-day.svg", backgroundColor: "#B0C4DE" },
    night: { icon: "partly-cloudy-night.svg", backgroundColor: "#424242" },
  },
  2: {
    day: { icon: "cloudy.svg", backgroundColor: "#A9A9A9" },
    night: { icon: "cloudy.svg", backgroundColor: "#424242" },
  },
  3: {
    day: { icon: "cloudy.svg", backgroundColor: "#A9A9A9" },
    night: { icon: "cloudy.svg", backgroundColor: "#424242" },
  },
  45: {
    day: { icon: "fog-day.svg", backgroundColor: "#696969" },
    night: { icon: "fog-night.svg", backgroundColor: "#525252" },
  },
  48: {
    day: { icon: "fog-day.svg", backgroundColor: "#696969" },
    night: { icon: "fog-night.svg", backgroundColor: "#525252" },
  },
  51: {
    day: { icon: "drizzle.svg", backgroundColor: "#B0E0E6" },
    night: { icon: "drizzle.svg", backgroundColor: "#3B3B3B" },
  },
  53: {
    day: { icon: "rain.svg", backgroundColor: "#4682B4" },
    night: { icon: "rain.svg", backgroundColor: "#363636" },
  },
  55: {
    day: { icon: "rain.svg", backgroundColor: "#00008B" },
    night: { icon: "rain.svg", backgroundColor: "#2F2F2F" },
  },
  56: {
    day: { icon: "rain.svg", backgroundColor: "#4682B4" },
    night: { icon: "rain.svg", backgroundColor: "#363636" },
  },
  57: {
    day: { icon: "rain.svg", backgroundColor: "#00008B" },
    night: { icon: "rain.svg", backgroundColor: "#2F2F2F" },
  },
  61: {
    day: { icon: "rain.svg", backgroundColor: "#4682B4" },
    night: { icon: "rain.svg", backgroundColor: "#363636" },
  },
  63: {
    day: { icon: "rain.svg", backgroundColor: "#00008B" },
    night: { icon: "rain.svg", backgroundColor: "#2F2F2F" },
  },
  65: {
    day: { icon: "rain.svg", backgroundColor: "#00008B" },
    night: { icon: "rain.svg", backgroundColor: "#2F2F2F" },
  },
  66: {
    day: { icon: "rain.svg", backgroundColor: "#4682B4" },
    night: { icon: "rain.svg", backgroundColor: "#363636" },
  },
  67: {
    day: { icon: "rain.svg", backgroundColor: "#00008B" },
    night: { icon: "rain.svg", backgroundColor: "#2F2F2F" },
  },
  71: {
    day: { icon: "snow.svg", backgroundColor: "#B3E5FC" },
    night: { icon: "snow.svg", backgroundColor: "#2E3B4E" },
  },
  73: {
    day: { icon: "snow.svg", backgroundColor: "#B3E5FC" },
    night: { icon: "snow.svg", backgroundColor: "#2E3B4E" },
  },
  75: {
    day: { icon: "snow.svg", backgroundColor: "#7B68EE" },
    night: { icon: "snow.svg", backgroundColor: "#1C2331" },
  },
  77: {
    day: { icon: "snowflake.svg", backgroundColor: "#AFEEEE" },
    night: { icon: "snowflake.svg", backgroundColor: "#305A72" },
  },
  80: {
    day: { icon: "showers.svg", backgroundColor: "#4682B4" },
    night: { icon: "showers.svg", backgroundColor: "#363636" },
  },
  81: {
    day: { icon: "showers.svg", backgroundColor: "#4682B4" },
    night: { icon: "showers.svg", backgroundColor: "#363636" },
  },
  82: {
    day: { icon: "thunderstorm.svg", backgroundColor: "#0B3D91" },
    night: { icon: "thunderstorm.svg", backgroundColor: "#1E2433" },
  },
  85: {
    day: { icon: "snow.svg", backgroundColor: "#B3E5FC" },
    night: { icon: "snow.svg", backgroundColor: "#2E3B4E" },
  },
  86: {
    day: { icon: "snow.svg", backgroundColor: "#7B68EE" },
    night: { icon: "snow.svg", backgroundColor: "#1C2331" },
  },
  95: {
    day: { icon: "thunderstorm.svg", backgroundColor: "#0B3D91" },
    night: { icon: "thunderstorm.svg", backgroundColor: "#1E2433" },
  },
  96: {
    day: { icon: "thunderstorm.svg", backgroundColor: "#0B3D91" },
    night: { icon: "thunderstorm.svg", backgroundColor: "#1E2433" },
  },
  99: {
    day: { icon: "thunderstorm.svg", backgroundColor: "#0B3D91" },
    night: { icon: "thunderstorm.svg", backgroundColor: "#1E2433" },
  },
};

import { useMemo } from "react";

/**
 * Hook to get the weather appearance based on the weather data.
 *
 * @param weatherData - The weather data.
 * @returns - The weather appearance.
 */
export function useWeatherAppearance({
  weatherCode,
  isDaytime,
}: WeatherData): WeatherAppearance {
  return useMemo(() => {
    const defaultAppearance: WeatherAppearance = {
      icon: "clear-day.svg",
      backgroundColor: "#FFFFFF",
    };

    const appearanceMap = weatherCodeToAppearanceMap[weatherCode] || {
      day: defaultAppearance,
      night: defaultAppearance,
    };
    return isDaytime ? appearanceMap.day : appearanceMap.night;
  }, [isDaytime, weatherCode]);
}
