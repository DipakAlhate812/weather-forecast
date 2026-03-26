import { HourlyWeatherProps } from "@/app/types/weather.types";
import { getWeatherIcon } from "@/app/utils/weather.utils";

export function HourlyWeather({ hourly }: HourlyWeatherProps) {
  const hours = hourly.time.slice(0, 24).map((time, i) => ({
    time,
    temp: hourly.temperature_2m[i],
    weather_code: hourly.weather_code[i],
  }));

  return (
    <>
      <div className="w-full bg-bg border border-border-subtle rounded-2xl p-4 shadow-soft">
        <h2 className="text-lg font-semibold text-text-high mb-4">
          Next 24 Hours
        </h2>

        {/* Horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2 items-center">
          {hours.map((hour) => {
            const date = new Date(hour.time);

            return (
              <div
                key={hour.time}
                className="min-w-[160px] min-h-[180px] bg-bg border border-border-subtle rounded-xl p-6 flex flex-col items-center justify-between shadow-soft flex-shrink-0"
              >
                {/* Time */}
                <p className="text-xl text-text-muted">
                  {date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                {/* Icon */}
                <div className="text-3xl my-1">
                  {getWeatherIcon(hour.weather_code)}
                </div>

                {/* Temp */}
                <p className="text-xl font-semibold text-text-high">
                  {hour.temp}° C
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
