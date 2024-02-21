import { Card } from "@ui/Card.tsx";
import {
  CurrentWeather,
  WeatherAPIResponse,
  WeatherGeoLocation,
} from "@common/types/types.weather.ts";
import { useWeather } from "@hooks/useWeather.ts";
import {
  Thresholds,
  useGetWeatherDifferenceLevel,
  WeatherEffectLevel,
} from "@hooks/useGetWeatherDifferenceLevel.ts";
import { useMemo } from "react";

export function ForecastDetail({
  weather,
  compareLocation = null,
}: {
  weather: WeatherAPIResponse;
  compareLocation: WeatherGeoLocation | null;
}) {
  const { data: compareData } = useWeather(compareLocation);
  const displayKeys = Object.keys(weather?.current).filter(
    (key) =>
      key !== "time" &&
      key !== "interval" &&
      key !== "is_day" &&
      // NOTE: the direction is combined with speed
      key !== "wind_direction_10m" &&
      key !== "weather_code",
  );

  return (
    <Card>
      <div className="flex text-center flex-col items-center p-4 gap-2 lg:grid lg:grid-cols-3 lg:gap-4">
        {displayKeys.map((key) => {
          return (
            <ForecastDetailCardItem
              compareWeather={compareData?.current ?? null}
              key={key}
              objKey={key}
              tempUnit={
                key.includes("temp")
                  ? weather?.current_units?.temperature_2m
                  : key.includes("wind")
                    ? weather?.current_units?.wind_speed_10m
                    : ""
              }
              weather={weather}
            />
          );
        })}
      </div>
    </Card>
  );
}

function ForecastDetailCardItem({
  compareWeather,
  objKey,
  tempUnit,
  weather,
}: {
  compareWeather: CurrentWeather | null;
  objKey: string;
  tempUnit?: string;
  weather: WeatherAPIResponse;
}) {
  const displayKey = objKey
    .replace(/_/g, " ")
    .replace(/[0-9]+m/g, "") as keyof Thresholds;
  const displayValue = weather?.current[objKey];
  const isWind = displayKey.includes("speed");
  const value1 = weather?.current[objKey];
  const value2 = compareWeather ? compareWeather[objKey] : 0;
  const level = useGetWeatherDifferenceLevel(
    value1,
    value2,
    objKey as keyof Thresholds,
  );

  const scale: string = useMemo(() => {
    if (level === WeatherEffectLevel.Extreme) {
      return "scale-150 drop-shadow-[0_2px_2px_rgba(255,0,0,0.4)]";
    }
    if (level === WeatherEffectLevel.Mild) {
      return "scale-125 drop-shadow-[0_2px_2px_rgba(255,255,0,0.4)]";
    }
    return "scale-100";
  }, [level]);

  return (
    <div className={`flex flex-col items-center ${scale} rounded-lg`}>
      <span className="capitalize">{isWind ? "Wind" : displayKey}:</span>
      {isWind ? (
        <span className={"flex flex-row gap-2"}>
          <span className={"font-bold"}>
            {weather.current.wind_speed_10m}{" "}
            {!!tempUnit && <span>{tempUnit}</span>}
          </span>
          <span
            className={`block font-bold text-xl`}
            style={{ rotate: `${weather.current.wind_direction_10m}deg` }}
          >
            &uarr;
          </span>
        </span>
      ) : (
        <span className={"font-bold"}>
          {displayValue} {!!tempUnit && <span>{tempUnit}</span>}
        </span>
      )}
    </div>
  );
}
