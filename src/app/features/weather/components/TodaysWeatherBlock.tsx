import { TemperatureHeroProps } from "@/app/types/weather.types";
import { getWeatherIcon, getWeatherLabel } from "@/app/utils/weather.utils";

export function TodaysWeatherBlock({
  current,
  daily,
  latitude,
  longitude,
}: TemperatureHeroProps) {
  const dateObj = new Date(current.time);

  const day = dateObj.toLocaleDateString("en-US", { weekday: "long" });
  const date = dateObj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const time = dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const maxTemp = daily.temperature_2m_max[0];
  const minTemp = daily.temperature_2m_min[0];

  return (
    <div className="bg-bg border border-border-subtle rounded-2xl shadow-soft p-4 md:p-8 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-8 transition-colors">
      {/* Left Section: Context & Temperature */}
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4 w-full sm:w-auto">
        {/* Location Badge */}
        <div className="text-[8px] md:text-xs bg-bg text-text-medium px-3 py-1 rounded-full border border-border-default tracking-wide uppercase font-medium">
          {latitude.toFixed(2)}, {longitude.toFixed(2)}
        </div>

        {/* Date & Time */}
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-bold text-text-high tracking-tight">
            {day}
          </h1>
          <p className="text-sm md:text-base text-text-medium opacity-90">
            {date} • {time}
          </p>
        </div>

        {/* Main Temperature Display */}
        <div className="mt-2 sm:mt-4">
          <h2 className="text-4xl md:text-5xl font-black text-text-high tracking-tighter">
            {Math.round(current.temperature_2m)}°
          </h2>
          <p className="text-sm md:text-base font-medium text-text-medium mt-1">
            <span className="text-text-high">H: {Math.round(maxTemp)}°</span>
            <span className="mx-2 opacity-30">•</span>
            <span>L: {Math.round(minTemp)}°</span>
          </p>
        </div>
      </div>

      {/* Right Section: Visual State */}
      <div className="flex flex-col items-center justify-center sm:items-end sm:justify-start gap-3 sm:bg-transparent p-4 sm:p-0 rounded-xl w-full sm:w-auto">
        {/* Weather Icon - Increased size for visual hierarchy */}
        <div className="text-7xl md:text-8xl drop-shadow-sm transform hover:scale-105 transition-transform">
          {getWeatherIcon(current.weather_code)}
        </div>

        {/* Condition & Wind */}
        <div className="text-center sm:text-right">
          <p className="text-lg md:text-xl font-semibold text-text-high capitalize">
            {getWeatherLabel(current.weather_code)}
          </p>
          <p className="text-sm md:text-base text-text-medium flex items-center justify-center sm:justify-end gap-1.5 mt-1">
            <span className="opacity-70">🌬</span> {current.wind_speed_10m}{" "}
            <span className="text-[10px] uppercase font-bold">km/h</span>
          </p>
        </div>
      </div>
    </div>
  );
}
