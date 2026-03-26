import { SearchComponentProps } from "@/app/types/weather.types";
import { getToday } from "@/app/utils/datetime.utils";
import { useState } from "react";

export function SearchComponent({ onSearch }: SearchComponentProps) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isToday, setIsToday] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: any = {};

    if (!latitude) newErrors.latitude = "Latitude is required";
    if (!longitude) newErrors.longitude = "Longitude is required";

    if (!isToday) {
      if (!startDate) newErrors.startDate = "Start date required";
      if (!endDate) newErrors.endDate = "End date required";

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
          newErrors.endDate = "End date must be after start date";
        }

        const diffDays =
          (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

        if (diffDays > 30) {
          newErrors.endDate = "Date range cannot exceed 30 days";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = () => {
    if (!validate()) return;

    let finalStartDate = startDate;
    let finalEndDate = endDate;

    if (isToday) {
      const today = getToday();
      finalStartDate = today;
      finalEndDate = today;
    }

    onSearch({
      latitude: Number(latitude),
      longitude: Number(longitude),
      start_date: finalStartDate,
      end_date: finalEndDate,
    });
  };

  return (
    <div className="bg-surface border-border-default rounded-2xl shadow-soft p-4 md:p-6">
      <h2 className="text-xl font-semibold text-text-medium mb-4">
        Enter Location & Date Range
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
        {/* Latitude */}
        <div className="flex flex-col">
          <label className="text-xs text-text-medium mb-1">Latitude</label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className={`border rounded-lg px-3 py-2 bg-bg text-text-high focus:outline-none focus:ring-2 focus:ring-primary transition ${
              errors.latitude ? "border-red-500" : "border-border-default"
            }`}
            placeholder="Enter latitude e.g.14.5"
          />
          {errors.latitude && (
            <span className="text-xs text-red-500 mt-1">{errors.latitude}</span>
          )}
        </div>

        {/* Longitude */}
        <div className="flex flex-col">
          <label className="text-xs text-text-medium mb-1">Longitude</label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className={`border rounded-lg px-3 py-2 bg-bg text-text-high focus:outline-none focus:ring-2 focus:ring-primary transition ${
              errors.longitude ? "border-red-500" : "border-border-default"
            }`}
            placeholder="Enter longitude e.g. -93.9"
          />
          {errors.longitude && (
            <span className="text-xs text-red-500 mt-1">
              {errors.longitude}
            </span>
          )}
        </div>

        {/* Start Date */}
        <div className="flex flex-col">
          <label className="text-xs text-text-medium mb-1">Start Date</label>
          <input
            type="date"
            value={isToday ? getToday() : startDate}
            disabled={isToday}
            onChange={(e) => setStartDate(e.target.value)}
            className={`border rounded-lg px-3 py-2 bg-bg text-text-high focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 ${
              errors.startDate ? "border-red-500" : "border-border-default"
            }`}
          />
          {errors.startDate && (
            <span className="text-xs text-red-500 mt-1">
              {errors.startDate}
            </span>
          )}
        </div>

        {/* End Date */}
        <div className="flex flex-col">
          <label className="text-xs text-text-medium mb-1">End Date</label>
          <input
            type="date"
            value={isToday ? getToday() : endDate}
            disabled={isToday}
            onChange={(e) => setEndDate(e.target.value)}
            className={`border rounded-lg px-3 py-2 bg-bg text-text-high focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 ${
              errors.endDate ? "border-red-500" : "border-border-default"
            }`}
          />
          {errors.endDate && (
            <span className="text-xs text-red-500 mt-1">{errors.endDate}</span>
          )}
        </div>

        {/* Today + Button */}
        <div className="flex flex-col items-center gap-3 justify-center">
          {/* Checkbox */}
          <label className="flex items-center gap-2 text-xs text-text-medium">
            <input
              type="checkbox"
              checked={isToday}
              onChange={(e) => setIsToday(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            Today
          </label>

          {/* Button */}
          <button
            type="button"
            onClick={handleSearch}
            className="text-bg px-5 py-2.5 rounded-lg shadow-soft hover:shadow-md hover:brightness-110 active:scale-[0.97] transition-all duration-150 w-full md:w-auto cursor-pointer bg-primary"
          >
            Get Weather
          </button>
        </div>
      </div>
    </div>
  );
}
