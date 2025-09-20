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

const LocationFetcher = () => {
  const {
    location,
    weather,
    hourlyWeather,
    loading,
    dataLoading,
    error,
    getLocationAndWeather,
    clearError
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
    </div>
  )
}

export default LocationFetcher