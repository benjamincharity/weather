export type WeatherGeoLocation = {
  latitude: number;
  longitude: number;
};

export interface WeatherLabeledGeo extends WeatherGeoLocation {
  label: string;
  city?: string;
  state?: string;
}

export interface WeatherUnits {
  [key: string]: any;
  apparent_temperature?: string;
  cloud_cover?: string;
  interval?: string;
  is_day?: string;
  precipitation?: string;
  precipitation_probability?: string;
  relative_humidity_2m?: string;
  snowfall?: string;
  temperature_2m?: string;
  time: string;
  visibility?: string;
  weather_code?: string;
  wind_direction_10m?: string;
  wind_speed_10m?: string;
}

export interface CurrentWeather {
  [key: string]: any;
  cloud_cover: number;
  interval: number;
  is_day: number;
  precipitation: number;
  relative_humidity_2m: number;
  snowfall: number;
  temperature_2m: number;
  time: string;
  weather_code: number;
  wind_direction_10m: number;
  wind_speed_10m: number;
}

export interface HourlyWeather {
  apparent_temperature?: number[];
  cloud_cover?: number[];
  precipitation?: number[];
  precipitation_probability?: number[];
  relative_humidity_2m?: number[];
  temperature_2m?: number[];
  time: string[];
  visibility?: number[];
  weather_code?: number[];
  wind_direction_10m?: number[];
  wind_speed_10m?: number[];
}

export interface WeatherAPIResponse extends WeatherGeoLocation {
  current: CurrentWeather;
  current_units: WeatherUnits;
  elevation: number;
  generationtime_ms: number;
  hourly: HourlyWeather;
  hourly_units: WeatherUnits;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

export interface DailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  weathercode: string;
}

export interface DailyData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
}

export interface WeatherForecast {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: DailyUnits;
  daily: DailyData;
}
