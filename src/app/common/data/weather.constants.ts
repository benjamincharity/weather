export const DAY_CLEAR = "day-clear";
export const DAY_CLOUDY = "day-cloudy";
export const DAY_RAIN = "day-rain";
export const DAY_THUNDERSTORM = "day-thunderstorm";
export const DAY_SNOW = "day-snow";
export const DAY_MIST = "day-mist";
export const NIGHT_CLEAR = "night-clear";
export const NIGHT_CLOUDY = "night-cloudy";
export const NIGHT_RAIN = "night-rain";
export const NIGHT_THUNDERSTORM = "night-thunderstorm";
export const NIGHT_SNOW = "night-snow";
export const NIGHT_MIST = "night-mist";

export type WeatherConditionKey =
  | typeof DAY_CLEAR
  | typeof DAY_CLOUDY
  | typeof DAY_RAIN
  | typeof DAY_THUNDERSTORM
  | typeof DAY_SNOW
  | typeof DAY_MIST
  | typeof NIGHT_CLEAR
  | typeof NIGHT_CLOUDY
  | typeof NIGHT_RAIN
  | typeof NIGHT_THUNDERSTORM
  | typeof NIGHT_SNOW
  | typeof NIGHT_MIST;

export const WeatherConditionColors: { [key in WeatherConditionKey]: string } =
  {
    [DAY_CLEAR]: "#FFD700",
    [DAY_CLOUDY]: "#C0C0C0",
    [DAY_RAIN]: "#0E6EB8",
    [DAY_THUNDERSTORM]: "#483D8B",
    [DAY_SNOW]: "#FFFFFF",
    [DAY_MIST]: "#F5F5F5",
    [NIGHT_CLEAR]: "#000080",
    [NIGHT_CLOUDY]: "#696969",
    [NIGHT_RAIN]: "#27408B",
    [NIGHT_THUNDERSTORM]: "#4B0082",
    [NIGHT_SNOW]: "#E8E8E8",
    [NIGHT_MIST]: "#A9A9A9",
  };
