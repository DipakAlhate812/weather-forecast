import { WeatherQueryParams } from "../types/weather.types";

/**
 * buildQueryParams
 *
 * Converts a WeatherQueryParams object into URLSearchParams
 * for API requests.
 * - Handles array values by joining them with commas (e.g., ["temp", "humidity"] → "temp,humidity")
 * @param params - Object containing query parameters for the weather API
 * @returns URLSearchParams instance ready to be appended to a request URL
 */
export const buildQueryParams = (params: WeatherQueryParams) => {
  const query: Record<string, string> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      query[key] = value.join(",");
    } else {
      query[key] = String(value);
    }
  });

  return new URLSearchParams(query);
};
