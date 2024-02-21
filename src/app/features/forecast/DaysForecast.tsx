import dayjs from "dayjs";
import {
  WeatherForecast,
  WeatherGeoLocation,
} from "@common/types/types.weather.ts";
import { useMultiDayForecast } from "@hooks/useMultiDayForecast.ts";
import { useEffect, useMemo, useRef } from "react";
import { Card } from "@ui/Card.tsx";
import { useGetWeatherIcon } from "@hooks/useGetWeatherIcon.ts";

export function DayForecastDom({
  day,
  index,
  units,
}: {
  day: any;
  index: number;
  units: any;
}) {
  const icon = useGetWeatherIcon({
    weather_code: day.weatherCode,
    is_day: 1,
  });

  return (
    <Card key={index} className={`snap-center w-20 shrink-0`}>
      <h4 className={"font-bold"}>{dayjs(day.date).format("ddd")}</h4>
      <div>
        L:{Math.round(day.temperatureMin ?? 0)}
        {units?.temperature_2m_min}
      </div>
      <div>
        H:{Math.round(day.temperatureMax ?? 0)}
        {units?.temperature_2m_max}
      </div>
      <div className={"flex justify-center align-middle"}>
        <img
          alt="Weather icon"
          src={`/weather/${icon}`}
          style={{ height: imageSize, width: imageSize }}
        />
      </div>
    </Card>
  );
}

interface DaysForecastProps {
  selectedLocation: WeatherGeoLocation | null;
}

const imageSize = "72px";

export function DaysForecast({ selectedLocation }: DaysForecastProps) {
  const { data: fiveDayForecast } = useMultiDayForecast(selectedLocation);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fiveDayDataForDom = useMemo(() => {
    return fiveDayForecast ? mapWeatherForecastForDOM(fiveDayForecast) : [];
  }, [fiveDayForecast]);

  // NOTE: This prevents swiping to previous page
  useEffect(() => {
    const handleSwipe = (event: WheelEvent) => {
      if (scrollContainerRef.current!.scrollLeft === 0 && event.deltaX < 0) {
        event.preventDefault();
      }
    };

    const scrollContainer = scrollContainerRef.current!;
    scrollContainer.addEventListener("wheel", handleSwipe, { passive: false });

    return () => {
      scrollContainer.removeEventListener("wheel", handleSwipe);
    };
  }, []);

  return !!selectedLocation ? (
    <>
      <h1 className={"text-center"}>5 Day Forecast</h1>
      <div
        className={"snap-x snap-mandatory overflow-x-auto pb-2"}
        ref={scrollContainerRef}
      >
        <div className={`flex gap-2 justify-between w-full lg:justify-center`}>
          {fiveDayDataForDom.map((day, index) => {
            return (
              <DayForecastDom
                day={day}
                index={index}
                key={day.date}
                units={fiveDayForecast?.daily_units}
              />
            );
          })}
        </div>
      </div>
    </>
  ) : (
    "No location"
  );
}

function mapWeatherForecastForDOM(weatherForecast: WeatherForecast) {
  // Extract daily data
  const { daily } = weatherForecast;

  // Map over the first 5 days of the forecast
  return daily.time.slice(0, 5).map((date, index) => {
    return {
      date,
      temperatureMax: daily.temperature_2m_max[index],
      temperatureMin: daily.temperature_2m_min[index],
      weatherCode: daily.weathercode[index],
      // Additional logic can go here to map weather codes to human-readable conditions, etc.
    };
  });
}
