import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import {
  WeatherAPIResponse,
  WeatherGeoLocation,
} from "@common/types/types.weather.ts";

const DELAY = 0;

export const generateWeatherQueryKey = (
  ...geolocations: WeatherGeoLocation[]
): string[] => [
  "weather",
  ...geolocations.map((loc) => `${loc.latitude},${loc.longitude}`),
];

/**
 * Function to fetch weather data.
 *
 * @param geolocation - The geographical location to fetch the weather data for.
 * @returns - The fetched weather data.
 */
async function fetchWeather(
  geolocation: WeatherGeoLocation | null,
): Promise<WeatherAPIResponse> {
  if (!geolocation) {
    return {} as WeatherAPIResponse;
  }
  // TODO: abstract out to app level config
  const params = {
    latitude: geolocation.latitude.toString(),
    longitude: geolocation.longitude.toString(),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "is_day",
      "precipitation",
      "snowfall",
      "weather_code",
      "cloud_cover",
      "wind_speed_10m",
      "wind_direction_10m",
    ].toString(),
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation_probability",
      "precipitation",
      "weather_code",
      "cloud_cover",
      "visibility",
      "wind_speed_10m",
      "wind_direction_10m",
    ].toString(),
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    precipitation_unit: "inch",
  };
  const queryString = new URLSearchParams(params as any).toString();
  const url = `https://api.open-meteo.com/v1/forecast?${queryString}`;

  return new Promise<WeatherAPIResponse>((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          const msg =
            response.status === 400
              ? "Invalid geolocation params."
              : "Network response was not ok";
          throw new Error(msg);
        } else {
          resolve((await response.json()) as WeatherAPIResponse);
        }
      } catch (error) {
        reject(error);
      }
    }, DELAY);
  });
}

export type UseWeatherResponse = QueryObserverResult<WeatherAPIResponse, Error>;

/**
 * Hook to fetch and return weather data.
 *
 * @param geolocation - The geographical location to fetch the weather data for.
 * @returns - The fetched weather data.
 */
export function useWeather(
  geolocation: WeatherGeoLocation | null,
): UseWeatherResponse {
  return useQuery<WeatherAPIResponse, Error>({
    queryKey: [
      "weather",
      { lat: geolocation?.latitude, long: geolocation?.longitude },
    ],
    queryFn: () => fetchWeather(geolocation),
    enabled: !!geolocation,
  });
}
