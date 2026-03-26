"use client";

import { useWeather } from "@/app/features/weather/hooks/useWeather";

import { useState, useEffect } from "react";
import { DEFAULT_PARAMS, WeatherQueryParams } from "@/app/types/weather.types";
import { ForecastWeatherDays } from "./components/ForecastWeatherDays";
import { SunCycleSlider } from "./components/SunCycleSlider";
import LoaderComp from "@/app/shared-components/Loader";
import ErrorState from "@/app/shared-components/ErrorState";
import { SearchComponent } from "./components/SearchComponent";
import { TodaysWeatherBlock } from "./components/TodaysWeatherBlock";
import { HourlyWeather } from "./components/HourlyWeather";
import { WeatherParameters } from "./components/WeatherParameters";

/**
 * WeatherDashboard
 *
 * Main container for weather feature.
 * - Fetches data using useWeather hook
 * - Manages loading and error states
 * - Renders all weather-related components
 */
export function WeatherDashboardLayout() {
  const [params, setParams] = useState<WeatherQueryParams>(DEFAULT_PARAMS);
  const [isDark, setIsDark] = useState(false);

  const { data, loading, error } = useWeather(params);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    const isNowDark = html.classList.contains("dark");
    setIsDark(isNowDark);
    localStorage.setItem("theme", isNowDark ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-bg text-text-high p-4 md:p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Weather Dashboard
          </h1>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-2 bg-primary text-bg px-5 py-2 rounded-xl shadow-soft hover:brightness-110 active:scale-95 transition-all font-medium"
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Search */}
        <SearchComponent
          onSearch={(searchParams) =>
            setParams((prev) => ({ ...prev, ...searchParams }))
          }
        />

        {/* DATA SECTION */}
        <div className="min-h-[400px]">
          {loading && (
            <div className="flex items-center justify-center h-[400px]">
              <LoaderComp />
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center h-[400px]">
              <ErrorState message={error} />
            </div>
          )}

          {!loading && !error && data && (
            <div className="w-full space-y-6">
              {/* ROW 1: Hero + Hourly (Equal Heights) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                <div className="lg:col-span-1 h-full">
                  <TodaysWeatherBlock
                    current={data.current}
                    daily={data.daily}
                    latitude={params.latitude}
                    longitude={params.longitude}
                  />
                </div>

                <div className="lg:col-span-2 h-full">
                  <HourlyWeather hourly={data.hourly} />
                </div>
              </div>

              {/* ROW 2: Details Grid (Equal Heights) */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 ">
                {/* Left Column of Row 2: Parameters Stack */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  <SunCycleSlider daily={data.daily} />
                  <WeatherParameters
                    current={data.current}
                    daily={data.daily}
                  />
                </div>

                {/* Right Column of Row 2: 7-Day Forecast */}
                <div className="lg:col-span-2 h-full">
                  <ForecastWeatherDays daily={data.daily} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
