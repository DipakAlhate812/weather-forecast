// ======================================================
// 🔹 API QUERY PARAMS & HOOK RETURN TYPES
// ======================================================

export interface WeatherQueryParams {
  latitude: number;
  longitude: number;
  current?: CurrentParams[];
  hourly?: HourlyParams[];
  daily?: DailyParams[];
  timezone?: string;
}

export interface UseWeatherReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}


// ======================================================
// 🔹 API RESPONSE DATA STRUCTURES
// ======================================================

export interface Current {
  time: string;
  temperature_2m: number;
  wind_speed_10m: number;
  weather_code: number;
  rain: number;
}

export interface HourlyData {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
}

export interface DailyData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
  rain_sum: number[];
  wind_speed_10m_max: number[];
  sunrise: string[];
  sunset: string[];
}


// ======================================================
// 🔹 SEARCH / USER INPUT TYPES
// ======================================================

export interface SearchParams {
  latitude: number;
  longitude: number;
  start_date?: string;
  end_date?: string;
}


// ======================================================
// 🔹 COMPONENT PROPS
// ======================================================

export interface TemperatureHeroProps {
  daily: DailyData;
  current: Current;
  latitude: number;
  longitude: number;
}

export interface HourlyWeatherProps {
  hourly: HourlyData;
}

export interface SearchComponentProps {
  onSearch: (params: SearchParams) => void;
}

export interface SevenDayForecastProps {
  daily: DailyData;
}

export interface SunCycleSliderProps {
  daily: DailyData;
}

export interface WeatherParametersProps {
  current: Current;
  daily: DailyData;
}


// ======================================================
// 🔹 API FIELD ENUM TYPES (QUERY KEYS)
// ======================================================

export type CurrentParams =
  | "temperature_2m"
  | "wind_speed_10m"
  | "weather_code"
  | "rain"
  | "sunrise"
  | "sunset"
  | "rain_sum"
  | "weather_code"
  | "wind_speed_10m_max";

export type HourlyParams =
  | "temperature_2m"
  | "relative_humidity_2m"
  | "wind_speed_10m"
  | "weather_code"
  | "precipitation";

export type DailyParams =
  | "weather_code"
  | "temperature_2m_max"
  | "temperature_2m_min"
  | "sunrise"
  | "sunset"
  | "rain_sum"
  | "weather_code"
  | "wind_speed_10m_max";


// ======================================================
// 🔹 DEFAULT QUERY CONFIG
// ======================================================

export const DEFAULT_PARAMS: WeatherQueryParams = {
  latitude: 52.52,
  longitude: 13.41,
  current: ["temperature_2m", "wind_speed_10m", "weather_code", "rain"],
  hourly: ["temperature_2m", "weather_code"],
  daily: [
    "temperature_2m_max",
    "temperature_2m_min",
    "weather_code",
    "rain_sum",
    "wind_speed_10m_max",
    "sunrise",
    "sunset",
  ],
  timezone: "auto",
};