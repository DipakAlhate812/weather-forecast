import { WeatherParametersProps } from "@/app/types/weather.types";
import { formatTime } from "@/app/utils/datetime.utils";
import { getWeatherLabel } from "@/app/utils/weather.utils";

export function WeatherParameters({ current, daily }: WeatherParametersProps) {
  const lastUpdated = formatTime(current.time);

  const stats = [
    {
      label: "Condition",
      value: getWeatherLabel(current.weather_code),
      icon: "☁️",
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Wind",
      value: `${current.wind_speed_10m} km/h`,
      icon: "🌬",
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Rain",
      value: `${current.rain} mm`,
      icon: "🌧",
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Max Temp",
      value: `${daily.temperature_2m_max[0]}°C`,
      icon: "🌡",
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Min Temp",
      value: `${daily.temperature_2m_min[0]}°C`,
      icon: "❄️",
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Sun Cycle",
      value: `${formatTime(daily.sunrise[0])} - ${formatTime(daily.sunset[0])}`,
      icon: "🌅",
      color: "bg-primary/10 text-primary",
    },
  ];

  return (
    <div className="bg-bg border border-border-subtle shadow-medium rounded-2xl p-5 shadow-soft">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-text-high">
          Weather Highlights
        </h2>
        <span className="text-xs text-text-muted">Updated {lastUpdated}</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 p-4 rounded-xl bg-bg border-border-subtle shadow-soft hover:shadow-md transition"
          >
            {/* Icon */}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-lg ${stat.color}`}
            >
              {stat.icon}
            </div>

            {/* Content */}
            <div className="flex flex-col">
              <span className="text-xs text-text-muted">{stat.label}</span>
              <span className="text-sm font-semibold text-text-high">
                {stat.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
