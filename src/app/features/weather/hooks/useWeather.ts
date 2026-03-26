import { useEffect, useState, useCallback } from "react";
import {
  UseWeatherReturn,
  WeatherQueryParams,
} from "../../../types/weather.types";
import { fetchAPIData } from "../services/weather.api";

/**
 * useWeather
 *
 * Custom hook to fetch and manage weather data.
 * Handles:
 * - API calls
 * - Loading & error states
 */
export const useWeather = <T = any>(
  params: WeatherQueryParams,
): UseWeatherReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetchAPIData(undefined, params);

      if (!res) throw new Error("No data received");

      setData(res);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return { data, loading, error, refetch: fetchWeather };
};
