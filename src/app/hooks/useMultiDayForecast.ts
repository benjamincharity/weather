import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import {
  WeatherForecast,
  WeatherGeoLocation,
} from "@common/types/types.weather.ts";

/**
 * Function to fetch multi-day weather forecast.
 *
 * @param location - The geographical location to fetch the forecast for.
 * @param days - The number of days to fetch the forecast for.
 * @returns - The fetched weather forecast.
 */
async function fetchMultiDayForecast(
  location: WeatherGeoLocation | null,
  days = 5,
): Promise<WeatherForecast> {
  if (!location) {
    throw new Error("Location is required to fetch the forecast");
  }

  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&forecast_days=${days}&temperature_unit=fahrenheit&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error("Failed to fetch forecast data");

  return (await response.json()) as WeatherForecast;
}

export type UseMultiDayForecastResponse = QueryObserverResult<
  WeatherForecast,
  Error
>;

/**
 * Hook to fetch and return multi-day weather forecast.
 *
 * @param location - The geographical location to fetch the forecast for.
 * @returns - The fetched weather forecast.
 */
export function useMultiDayForecast(
  location: WeatherGeoLocation | null,
): UseMultiDayForecastResponse {
  return useQuery<WeatherForecast, Error>({
    queryKey: [
      "weather",
      "multiDayForecast",
      { lat: location?.latitude, long: location?.longitude },
    ],
    queryFn: () => fetchMultiDayForecast(location),
    enabled: !!location,
  });
}
