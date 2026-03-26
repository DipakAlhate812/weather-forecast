import { WeatherQueryParams } from "../../../types/weather.types";
import { buildQueryParams } from "../../../utils/api.utils";

/**
 * Fetch weather data from Open-Meteo API
 */
export const fetchAPIData = async (
  url = "https://api.open-meteo.com/v1/forecast",
  searchQueryObject: WeatherQueryParams,
) => {
  try {
    const params = buildQueryParams(searchQueryObject);

    const response = await fetch(`${url}?${params}`);

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    return response.json();
  } catch (e) {
    console.log("Unexpected Error!", e);
  }
};
