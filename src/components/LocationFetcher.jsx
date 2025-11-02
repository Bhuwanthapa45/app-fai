'use client'
import React from 'react'
import { 
  LocationButton, 
  ErrorMessage, 
  LocationDisplay, 
  CurrentWeather, 
  HourlyForecast, 
  useWeatherData 
} from './location-fetcher'
import SoilMoistureDisplay from './location-fetcher/SoilMoistureDisplay'
import PestPredection from './location-fetcher/PestPredection'


const LocationFetcher = () => {
 const {
  location,
  weather,
  hourlyWeather,
  soilMoisture,
  pestPrediction,       // 🐛 new state
  loading,
  dataLoading,
  error,
  getLocationAndWeather,
  clearError,
  fetchStoredPestPrediction,  // 🐛 new function
  sendPestPrediction          // 🐛 new function
} = useWeatherData();

  return (
    <div className="max-w-7xl mx-auto p-4">
      <LocationButton 
        onClick={getLocationAndWeather} 
        loading={loading} 
        dataLoading={dataLoading} 
      />
      
      <ErrorMessage error={error} onClear={clearError} />
      
      <LocationDisplay location={location} />
      
      <CurrentWeather weather={weather} />
      
      <HourlyForecast hourlyWeather={hourlyWeather} />
      {/* ✅ New soil moisture section */}
      <SoilMoistureDisplay soilMoisture={soilMoisture} />
      <PestPredection 
  pestPrediction={pestPrediction}
  onPredict={sendPestPrediction}
  onFetchStored={fetchStoredPestPrediction}
/>



    </div>
  )
}

export default LocationFetcher