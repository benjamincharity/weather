import { LocationAutocomplete } from "@ui/LocationAutocomplete.tsx";
import { CurrentWeatherHero } from "./CurrentWeatherHero.tsx";
import { WeatherGeoLocation } from "@common/types/types.weather.ts";
import { DaysForecast } from "./DaysForecast.tsx";
import { ReactNode, useEffect, useMemo } from "react";
import { useWeather } from "@hooks/useWeather.ts";
import {
  useWeatherAppearance,
  WeatherData,
} from "@hooks/useWeatherAppearance.ts";
import { useGeoToPlace } from "@hooks/useGeoToPlace.tsx";
import { SkyBackground } from "@ui/SkyBackground.tsx";
import { Card } from "@ui/Card.tsx";
import { NoSelectedLocation } from "./NoSelectedLocation.tsx";
import { ForecastDetail } from "./ForecastDetail.tsx";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";

const imageSize = "168px";

interface SingleForecastProps {
  compareLocation?: WeatherGeoLocation | null;
  isCompareRoute?: boolean;
  header?: ReactNode;
  selectedLocation: WeatherGeoLocation | null;
  setSelectedLocation: (location: WeatherGeoLocation) => void;
}

export function SingleForecast({
  compareLocation = null,
  header = null,
  isCompareRoute,
  selectedLocation,
  setSelectedLocation,
}: SingleForecastProps) {
  const navigate = useNavigate({ from: "/forecast" });
  const { data, isLoading, isError, error } = useWeather(selectedLocation);
  const weatherData: WeatherData = useMemo(
    () => ({
      weatherCode: data?.current.weather_code ?? 0,
      isDaytime: !!data?.current ? data?.current?.is_day === 1 : true,
    }),
    [data],
  );
  const { isRain, isDay } = useMemo(() => {
    return {
      isDay: data?.current?.is_day !== 0,
      isRain: !!data?.current?.precipitation,
    };
  }, [data]);
  const { backgroundColor } = useWeatherAppearance(weatherData);
  const { location: place, error: placeError } =
    useGeoToPlace(selectedLocation);
  const cloudColor = useMemo(() => {
    return isDay
      ? !isRain
        ? "#F0F0F0"
        : "#8C9EA3"
      : !isRain
        ? "#323A48"
        : "#8C9EA3";
  }, [isDay, isRain]);
  const opacityClass = useMemo(() => `opacity-${isDay ? "30" : "90"}`, [isDay]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message, {
        id: "weather-error",
      });
    }
  }, [isError, error]);

  useEffect(() => {
    if (!!placeError) {
      toast.error(placeError?.message, {
        id: "place-error",
      });
      navigate({ to: "/forecast" });
    }
  }, [placeError]);

  return (
    <section
      className={
        "text-center px-2 lg:px-6 py-2 relative h-full overflow-y-auto"
      }
      style={{ backgroundColor }}
    >
      {header}
      <div className={"relative z-10  flex flex-col gap-4"}>
        <div className={"w-[500px] max-w-full mx-auto"}>
          <LocationAutocomplete
            onSelection={setSelectedLocation}
            value={place?.label}
          />
        </div>

        {!!selectedLocation && !data && isLoading && (
          <Card className={"bg-slate-900 bg-opacity-70 pb-4"}>
            <figure className={"text-center"}>
              <img
                alt="Weather icon"
                src={`/weather/clear-day-fast.svg`}
                className={"mx-auto"}
                style={{ height: imageSize, width: imageSize }}
              />
              <figcaption className={"block text-white italic"}>
                Loading...
              </figcaption>
            </figure>
          </Card>
        )}

        {!!selectedLocation && !!data && !isLoading && (
          <>
            <div className={"flex flex-col gap-4 justify-center lg:flex-row"}>
              <CurrentWeatherHero
                imageSize={imageSize}
                isLoading={isLoading}
                place={place}
                weather={data}
              />

              <ForecastDetail
                compareLocation={compareLocation}
                weather={data}
              />
            </div>

            <DaysForecast selectedLocation={selectedLocation} />
          </>
        )}

        {!selectedLocation && (
          <NoSelectedLocation isCompareRoute={isCompareRoute} />
        )}
      </div>
      <div className={`${opacityClass} fixed inset-0 z-[1]`}>
        <SkyBackground
          bgColor={backgroundColor}
          cloudColor={cloudColor}
          rain={isRain}
        />
      </div>

      {/*{!!error && <ErrorToast title={error.name} message={error.message} />}*/}
      {/*{!!placeError && (*/}
      {/*  <ErrorToast title={placeError.name} message={placeError.message} />*/}
      {/*)}*/}
    </section>
  );
}
