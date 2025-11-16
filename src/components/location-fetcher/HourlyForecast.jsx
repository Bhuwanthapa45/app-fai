"use client";

import { formatDate, getWeatherIcon, groupForecastsByDate } from "./weatherUtils";
import DayForecastChart from "./DayForecastChart";
import FiveDayForecastChart from "./FiveDayForecastChart";

export default function HourlyForecast({ hourlyWeather }) {
  if (!hourlyWeather) return null;

  const dataToRender = Array.isArray(hourlyWeather)
    ? hourlyWeather[0]
    : hourlyWeather;

  if (!dataToRender || !dataToRender.list) return null;

  const sunriseTime = new Date(dataToRender.city.sunrise * 1000)
    .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const sunsetTime = new Date(dataToRender.city.sunset * 1000)
    .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const groupedForecasts = groupForecastsByDate(dataToRender.list);
  const dates = Object.keys(groupedForecasts).slice(0, 5);

  const getDailyAverages = (grouped) => {
    return dates.map((date) => {
      const day = grouped[date];
      const avgTemp = day.reduce((sum, f) => sum + f.main.temp, 0) / day.length;
      const avgRain =
        (day.reduce((sum, f) => sum + (f.pop || 0), 0) / day.length) * 100;

      return {
        date,
        avgTemp: Math.round(avgTemp * 10) / 10,
        avgRain: Math.round(avgRain),
      };
    });
  };

  const dailyAverages = getDailyAverages(groupedForecasts);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md p-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 mb-8 shadow">
        <h2 className="text-2xl font-bold tracking-tight mb-1">
          5-Day Weather Forecast — {dataToRender.city?.name}
        </h2>

        <p className="text-blue-100 text-sm">
          {dataToRender.cnt} forecasts • Updated{" "}
          {new Date(dataToRender.createdAt).toLocaleString()}
        </p>

        <div className="mt-3 flex gap-5 text-blue-100 text-sm">
          <span>🌅 Sunrise: {sunriseTime}</span>
          <span>🌇 Sunset: {sunsetTime}</span>
        </div>
      </div>

      {/* 5 DAY CHART */}
      <div className="mb-8">
        <FiveDayForecastChart dailyForecasts={dailyAverages} />
      </div>

      {/* DAILY FORECAST LIST */}
      <div className="space-y-8">
        {dates.map((date) => {
          const dayForecasts = groupedForecasts[date];
          const dayDate = new Date(date);

          return (
            <div
              key={date}
              className="border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden bg-gray-50 dark:bg-gray-900"
            >
              {/* DAY HEADER */}
              <div className="px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {dayDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {dayForecasts.length} forecast entries
                </p>
              </div>

              {/* CHART */}
              <DayForecastChart forecasts={dayForecasts} />

              {/* HOURLY CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-6">
                {dayForecasts.map((forecast, i) => {
                  const { time } = formatDate(forecast.dt);

                  return (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-md transition"
                    >
                      {/* Time + Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold text-indigo-700 dark:text-indigo-300 text-sm">
                          {time}
                        </span>
                        <span className="text-2xl">
                          {getWeatherIcon(forecast.weather[0]?.description)}
                        </span>
                      </div>

                      {/* Weather details */}
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Temp:</span>
                          <span className="font-medium">{forecast.main.temp}°C</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Feels like:
                          </span>
                          <span>{forecast.main.feels_like}°C</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Humidity:</span>
                          <span>{forecast.main.humidity}%</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Wind:</span>
                          <span>{forecast.wind.speed} m/s</span>
                        </div>

                        <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                          {forecast.weather[0]?.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}