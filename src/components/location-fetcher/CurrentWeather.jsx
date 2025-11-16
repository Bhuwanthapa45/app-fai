// components/location-fetcher/CurrentWeather.jsx
"use client";

export default function CurrentWeather({ weather }) {
  if (!weather) return null;

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Current Weather — <span className="text-emerald-600">{weather.name}</span>
        </h2>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {/* Temperature */}
        <div className="flex flex-col items-center bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl">
          <p className="text-4xl font-bold text-emerald-700 dark:text-emerald-300">
            {weather.main?.temp}°C
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Temperature</p>
        </div>

        {/* Feels Like */}
        <div className="flex flex-col items-center bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
          <p className="text-4xl font-bold text-orange-600 dark:text-orange-300">
            {weather.main?.feels_like}°C
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Feels Like</p>
        </div>

        {/* Humidity */}
        <div className="flex flex-col items-center bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-300">
            {weather.main?.humidity}%
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Humidity</p>
        </div>

        {/* Wind */}
        <div className="flex flex-col items-center bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
          <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-300">
            {weather.wind?.speed} m/s
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Wind Speed</p>
        </div>
      </div>

      {/* WEATHER DESCRIPTION */}
      <div className="text-center mt-6">
        <p className="text-lg font-medium capitalize text-gray-700 dark:text-gray-300">
          {weather.weather?.[0]?.description}
        </p>
      </div>
    </div>
  );
}