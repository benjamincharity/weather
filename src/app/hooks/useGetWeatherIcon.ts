import { CurrentWeather } from "@common/types/types.weather.ts";

interface WeatherIconMapping {
  [key: string]: { day: string; night: string };
}

const weatherCodeToIconMapping: WeatherIconMapping = {
  clear: { day: "clear-day.svg", night: "clear-night.svg" },
  fog: { day: "fog-day.svg", night: "fog-night.svg" },
  partlyCloudy: {
    day: "partly-cloudy-day.svg",
    night: "partly-cloudy-night.svg",
  },
  rain: { day: "rain.svg", night: "rain.svg" },
  snow: { day: "snow.svg", night: "snow.svg" },
  thunderstorm: {
    day: "thunderstorms-day.svg",
    night: "thunderstorms-night.svg",
  },
};

/**
 * Hook to get the appropriate weather icon based on the weather code and time of day.
 * TODO: We could get even more exact with weather icons.
 *
 * @param weather - The current weather data.
 * @returns - The filename of the appropriate weather icon.
 */
export function useGetWeatherIcon(
  weather: Pick<CurrentWeather, "is_day" | "weather_code">,
): string {
  const timeOfDay = weather.is_day === 1 ? "day" : "night";

  let iconKey = "clear";
  const code = weather.weather_code;

  if (code === 0) iconKey = "clear";
  else if (code >= 1 && code <= 3) iconKey = "partlyCloudy";
  else if (code === 45 || code === 48) iconKey = "fog";
  else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code))
    iconKey = "rain";
  else if ([71, 73, 75, 77, 85, 86].includes(code)) iconKey = "snow";
  else if ([95, 96, 99].includes(code)) iconKey = "thunderstorm";

  const finalMap = weatherCodeToIconMapping[iconKey];
  return finalMap ? finalMap[timeOfDay] : "clear-day.svg";
}
