import { Card } from "@ui/Card.tsx";
import {
  WeatherAPIResponse,
  WeatherLabeledGeo,
} from "@common/types/types.weather.ts";
import { useGetWeatherIcon } from "@hooks/useGetWeatherIcon.ts";

interface CurrentWeatherHeroProps {
  imageSize?: string;
  isLoading?: boolean;
  place?: WeatherLabeledGeo | null;
  weather: WeatherAPIResponse;
}

export function CurrentWeatherHero({
  imageSize = "72px",
  isLoading,
  place,
  weather,
}: CurrentWeatherHeroProps) {
  const icon = useGetWeatherIcon(weather?.current);
  const tempString = `${weather?.current?.temperature_2m} ${weather?.current_units?.temperature_2m}`;

  return (
    <Card className={"pb-6"}>
      {isLoading ? (
        "LOADING"
      ) : (
        <div className={"flex justify-center align-middle"}>
          <img
            alt="Weather icon"
            src={`/weather/${icon}`}
            style={{ height: imageSize, width: imageSize }}
          />
        </div>
      )}

      <div className={"w-full text-3xl font-bold"}>{tempString}</div>
      {(!!place?.city || !!place?.state) && (
        <div className={"w-full text-base font-bold opacity-80"}>
          {place?.city}
          {!!place?.city ? "," : ""} {place?.state}
        </div>
      )}
    </Card>
  );
}
