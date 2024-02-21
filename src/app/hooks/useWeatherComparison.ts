import { useMemo } from "react";
import { CurrentWeather } from "@common/types/types.weather.ts";

/**
 * Hook to compare two sets of weather data.
 *
 * @param data1 - The first set of weather data.
 * @param data2 - The second set of weather data.
 * @returns - An object containing the differences between the two sets of weather data.
 */
export function useWeatherComparison(
  data1: CurrentWeather | null,
  data2: CurrentWeather | null,
) {
  return useMemo(() => {
    // Initialize comparison results with default values
    const comparisonResults = {
      temperatureDifference: 0,
      humidityDifference: 0,
      precipitationDifference: 0,
      cloudCoverDifference: 0,
      snowfallDifference: 0,
      windDirectionDifference: 0,
      windSpeedDifference: 0,
    };

    if (!data1 || !data2) {
      return comparisonResults;
    }

    comparisonResults.temperatureDifference = parseFloat(
      (data1.temperature_2m - data2.temperature_2m).toFixed(1),
    );
    comparisonResults.humidityDifference = parseFloat(
      Math.abs(data1.relative_humidity_2m - data2.relative_humidity_2m).toFixed(
        1,
      ),
    );
    comparisonResults.precipitationDifference = parseFloat(
      Math.abs(data1.precipitation - data2.precipitation).toFixed(1),
    );
    comparisonResults.cloudCoverDifference = parseFloat(
      Math.abs(data1.cloud_cover - data2.cloud_cover).toFixed(1),
    );
    comparisonResults.snowfallDifference = parseFloat(
      Math.abs(data1.snowfall - data2.snowfall).toFixed(1),
    );
    comparisonResults.windDirectionDifference = parseFloat(
      Math.abs(data1.wind_direction_10m - data2.wind_direction_10m).toFixed(1),
    );
    comparisonResults.windSpeedDifference = parseFloat(
      Math.abs(data1.wind_speed_10m - data2.wind_speed_10m).toFixed(1),
    );

    return comparisonResults;
  }, [data1, data2]);
}
