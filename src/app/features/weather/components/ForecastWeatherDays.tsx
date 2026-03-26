import { SevenDayForecastProps } from "@/app/types/weather.types";
import { getWeatherIcon, getWeatherLabel } from "@/app/utils/weather.utils";

export function ForecastWeatherDays({ daily }: SevenDayForecastProps) {
  const days = daily.time.map((date, i) => ({
    date,
    max: daily.temperature_2m_max[i],
    min: daily.temperature_2m_min[i],
    wind: daily.wind_speed_10m_max[i],
    code: daily.weather_code[i],
  }));

  return (
    <>
      <div className="bg-bg border border-border-subtle rounded-2xl shadow-soft p-4 md:p-6">
        <h2 className="text-lg font-semibold text-text-high mb-4">
          {`${days.length} Days Forecast`}
        </h2>

        <div className="flex flex-col divide-y divide-border-default">
          {days.map((day) => (
            <div
              key={day.date}
              className="flex items-center justify-between py-3"
            >
              {/* Date */}
              <div className="w-1/4 text-sm text-text-medium">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>

              {/* Weather */}
              <div className="w-1/4 text-sm text-text-muted text-left">
                {getWeatherIcon(day.code)} {getWeatherLabel(day.code)}
              </div>

              {/* Temp */}
              <div className="w-1/4 text-center">
                <span className="text-text-high font-medium">{day.max}°</span>
                <span className="text-text-muted text-sm ml-1">
                  / {day.min}°
                </span>
              </div>

              {/* Wind */}
              <div className="w-1/4 text-sm text-text-muted text-right">
                🌬 {day.wind} km/h
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
