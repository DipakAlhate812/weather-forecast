
const WEATHER_MAP = [
  {
    codes: [0],
    label: "Clear",
    icon: "☀️",
  },
  {
    codes: [1, 2, 3],
    label: "Cloudy",
    icon: "⛅",
  },
  {
    codes: [45, 48],
    label: "Fog",
    icon: "🌫️",
  },
  {
    codes: [51, 53, 55],
    label: "Drizzle",
    icon: "🌦️",
  },
  {
    codes: [61, 63, 65, 80, 81, 82],
    label: "Rain",
    icon: "🌧",
  },
  {
    codes: [71, 73, 75, 85, 86],
    label: "Snow",
    icon: "❄️",
  },
  {
    codes: [95, 96, 99],
    label: "Thunderstorm",
    icon: "⛈",
  },
];

/** Finds weather configuration matching a given weather code. */
const findWeather = (code: number) => {
  return WEATHER_MAP.find((item) => item.codes.includes(code));
};

/** Returns a human-readable weather label for a given code. */
export const getWeatherLabel = (code: number) => {
  return findWeather(code)?.label || "Weather";
};


/** Returns an icon representation for a given weather code. */
export const getWeatherIcon = (code: number) => {
  return findWeather(code)?.icon || "🌤";
};