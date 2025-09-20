import { useState } from 'react';

const useWeatherData = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStoredWeather = async () => {
    try {
      console.log('Fetching stored current weather...');
      const res = await fetch('/api/weather', {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        const err = await res.json();
        console.error('Current weather fetch failed:', err);
        throw new Error(err.error || 'Failed to fetch stored weather');
      }

      const data = await res.json();
      console.log('Current weather response:', data);
      setWeather(data.weather);
    } catch (err) {
      console.error('Error fetching stored weather:', err);
      setError(prev => prev ? `${prev}; ${err.message}` : err.message);
    }
  };

  const fetchStoredHourlyWeather = async () => {
    try {
      console.log('Fetching stored hourly weather...');
      const res = await fetch('/api/weather/hourly', {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        const err = await res.json();
        console.error('Hourly weather fetch failed:', err);
        throw new Error(err.error || 'Failed to fetch stored hourly weather');
      }

      const data = await res.json();
      console.log('Hourly weather response:', data);
      setHourlyWeather(data.hourlyWeather);
    } catch (err) {
      console.error('Error fetching stored hourly weather:', err);
      setError(prev => prev ? `${prev}; ${err.message}` : err.message);
    }
  };

  const fetchWeatherData = async (coords) => {
    try {
      setDataLoading(true);

      // Fetch current weather data
      console.log('Posting current weather request...');
      const currentWeatherRes = await fetch('/api/weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ lat: coords.lat, lon: coords.lon }),
      });

      if (!currentWeatherRes.ok) {
        const err = await currentWeatherRes.json();
        console.error('Current weather POST failed:', err);
        throw new Error(err.error || 'Failed to fetch current weather');
      }

      const currentWeatherData = await currentWeatherRes.json();
      console.log('Current weather POST response:', currentWeatherData);

      // Fetch hourly weather data
      console.log('Posting hourly weather request...');
      const hourlyWeatherRes = await fetch('/api/weather/hourly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ lat: coords.lat, lon: coords.lon }),
      });

      if (!hourlyWeatherRes.ok) {
        const err = await hourlyWeatherRes.json();
        console.error('Hourly weather POST failed:', err);
        throw new Error(err.error || 'Failed to fetch hourly weather');
      }

      const hourlyWeatherData = await hourlyWeatherRes.json();
      console.log('Hourly weather POST response:', hourlyWeatherData);

      // Fetch stored data after successful API calls
      await Promise.all([
        fetchStoredWeather(),
        fetchStoredHourlyWeather()
      ]);
    } catch (err) {
      console.error('Error in fetchWeatherData:', err);
      setError(err.message);
    } finally {
      setDataLoading(false);
    }
  };

  const getLocationAndWeather = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser. Use a different browser please');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setLocation(coords);
        console.log('Location obtained:', coords);
        await fetchWeatherData(coords);
        setLoading(false);
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError(`Geolocation failed: ${err.message}`);
        setLoading(false);
      }
    );
  };

  const clearError = () => setError(null);

  return {
    location,
    weather,
    hourlyWeather,
    loading,
    dataLoading,
    error,
    getLocationAndWeather,
    clearError
  };
};

export default useWeatherData;