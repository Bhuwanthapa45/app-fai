"use client";

import {
  LocationButton,
  ErrorMessage,
  LocationDisplay,
  CurrentWeather,
  HourlyForecast,
  useWeatherData
} from "./location-fetcher";

import SoilMoistureDisplay from "./location-fetcher/SoilMoistureDisplay";
import PestPrediction from "./location-fetcher/PestPredection";

export default function LocationFetcher() {
  const {
    location,
    weather,
    hourlyWeather,
    soilMoisture,
    pestPrediction,
    loading,
    dataLoading,
    error,
    getLocationAndWeather,
    clearError,
    fetchStoredPestPrediction,
    sendPestPrediction
  } = useWeatherData();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md p-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Farm Weather & Insights</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Hyper-local weather, soil moisture, and pest risk analysis
          </p>
        </div>

        <div className="flex gap-3">
          <LocationButton
            onClick={getLocationAndWeather}
            loading={loading}
            dataLoading={dataLoading}
          />
        </div>
      </div>

      {/* ERROR MESSAGE */}
      <ErrorMessage error={error} onClear={clearError} />

      {/* LOCATION CARD */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
        <LocationDisplay location={location} />
      </div>

      {/* CURRENT WEATHER CARD */}
      {weather && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 bg-gray-50 dark:bg-gray-900 shadow-sm">
          <CurrentWeather weather={weather} />
        </div>
      )}

      {/* 5-DAY + HOURLY WEATHER */}
      {hourlyWeather && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <HourlyForecast hourlyWeather={hourlyWeather} />
        </div>
      )}

      {/* SOIL MOISTURE */}
      {soilMoisture && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-5">
          <SoilMoistureDisplay soilMoisture={soilMoisture} />
        </div>
      )}

      {/* PEST PREDICTION */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-5">
        <PestPrediction
          pestPrediction={pestPrediction}
          onPredict={sendPestPrediction}
          onFetchStored={fetchStoredPestPrediction}
        />
      </div>
    </div>
  );
}