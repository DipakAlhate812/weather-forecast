import { SunCycleSliderProps } from "@/app/types/weather.types";
import { formatTime } from "@/app/utils/datetime.utils";

export function SunCycleSlider({ daily }: SunCycleSliderProps) {
  const sunrise = daily.sunrise[0];
  const sunset = daily.sunset[0];
  const nextSunrise = daily.sunrise[1] || daily.sunrise[0]; // next day

  const now = new Date().getTime();

  const sunriseTime = new Date(sunrise).getTime();
  const sunsetTime = new Date(sunset).getTime();
  const nextSunriseTime = new Date(nextSunrise).getTime();

  const isDay = now >= sunriseTime && now <= sunsetTime;

  let progress = 0;

  if (isDay) {
    progress = (now - sunriseTime) / (sunsetTime - sunriseTime);
  } else {
    // night: sunset → next sunrise
    progress = (now - sunsetTime) / (nextSunriseTime - sunsetTime);
  }

  progress = Math.max(0, Math.min(progress, 1));

  return (
    <>
      <div className="bg-bg border border-border-subtle  rounded-2xl p-4 shadow-soft">
        <h2 className="text-lg font-semibold text-text-high mb-4">
          {isDay ? "Sun Progress" : "Night Progress"}
        </h2>

        {/* Labels */}
        <div className="flex justify-between text-xs text-text-muted mb-2">
          <span>
            {isDay ? "🌅 " + formatTime(sunrise) : "🌇 " + formatTime(sunset)}
          </span>
          <span>
            {isDay
              ? "🌇 " + formatTime(sunset)
              : "🌅 " + formatTime(nextSunrise)}
          </span>
        </div>

        {/* Track */}
        <div className="relative h-2 bg-bg border border-border-default rounded-full">
          {/* Progress */}
          <div
            className={`absolute h-2 rounded-full transition-all duration-500 ${
              isDay
                ? "bg-gradient-to-r from-yellow-300 to-orange-400"
                : "bg-gradient-to-r from-indigo-500 to-blue-900"
            }`}
            style={{ width: `${progress * 100}%` }}
          />

          {/* Indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-surface border-2 border-primary rounded-full shadow-soft"
            style={{ left: `calc(${progress * 100}% - 8px)` }}
          />
        </div>

        {/* Status */}
        <p className="text-xs text-text-muted mt-2 text-center">
          {isDay ? "☀️ Daytime" : "🌙 Nighttime"}
        </p>
      </div>
    </>
  );
}
