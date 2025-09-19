// 'use client'
// import React, { useState } from 'react'

// const LocationFetcher = () => {
//   const [location, setLocation] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [dataLoading, setDataLoading] = useState(false)
//   const [weather, setWeather] = useState(null)
//   const [hourlyWeather, setHourlyWeather] = useState(null)
//   const [error, setError] = useState(null)

//   const fetchStoredWeather = async () => {
//     try {
//       console.log('Fetching stored current weather...')
//       const res = await fetch('/api/weather', {
//         method: 'GET',
//         credentials: 'include',
//       })

//       if (!res.ok) {
//         const err = await res.json()
//         console.error('Current weather fetch failed:', err)
//         throw new Error(err.error || 'Failed to fetch stored weather')
//       }

//       const data = await res.json()
//       console.log('Current weather response:', data)
//       setWeather(data.weather)
//     } catch (err) {
//       console.error('Error fetching stored weather:', err)
//       setError(prev => prev ? `${prev}; ${err.message}` : err.message)
//     }
//   }

//   const fetchStoredHourlyWeather = async () => {
//     try {
//       console.log('Fetching stored hourly weather...')
//       const res = await fetch('/api/weather/hourly', {
//         method: 'GET',
//         credentials: 'include',
//       })

//       if (!res.ok) {
//         const err = await res.json()
//         console.error('Hourly weather fetch failed:', err)
//         throw new Error(err.error || 'Failed to fetch stored hourly weather')
//       }

//       const data = await res.json()
//       console.log('Hourly weather response:', data)
//       console.log('Type of hourlyWeather:', typeof data.hourlyWeather)
//       console.log('Is array:', Array.isArray(data.hourlyWeather))
      
//       setHourlyWeather(data.hourlyWeather)
//     } catch (err) {
//       console.error('Error fetching stored hourly weather:', err)
//       setError(prev => prev ? `${prev}; ${err.message}` : err.message)
//     }
//   }

//   const fetchLocation = () => {
//     if (!navigator.geolocation) {
//       alert('Geolocation is not supported by your browser. Use a different browser please')
//       return
//     }
    
//     setLoading(true)
//     setError(null)
    
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const coords = {
//           lat: position.coords.latitude,
//           lon: position.coords.longitude,
//         }
//         setLocation(coords)
//         console.log('Location obtained:', coords)

//         try {
//           setDataLoading(true)

//           // Fetch current weather data
//           console.log('Posting current weather request...')
//           const currentWeatherRes = await fetch('/api/weather', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             credentials: 'include',
//             body: JSON.stringify({ lat: coords.lat, lon: coords.lon }),
//           })

//           if (!currentWeatherRes.ok) {
//             const err = await currentWeatherRes.json()
//             console.error('Current weather POST failed:', err)
//             throw new Error(err.error || 'Failed to fetch current weather')
//           }

//           const currentWeatherData = await currentWeatherRes.json()
//           console.log('Current weather POST response:', currentWeatherData)

//           // Fetch hourly weather data
//           console.log('Posting hourly weather request...')
//           const hourlyWeatherRes = await fetch('/api/weather/hourly', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             credentials: 'include',
//             body: JSON.stringify({ lat: coords.lat, lon: coords.lon }),
//           })

//           if (!hourlyWeatherRes.ok) {
//             const err = await hourlyWeatherRes.json()
//             console.error('Hourly weather POST failed:', err)
//             throw new Error(err.error || 'Failed to fetch hourly weather')
//           }

//           const hourlyWeatherData = await hourlyWeatherRes.json()
//           console.log('Hourly weather POST response:', hourlyWeatherData)

//           // Fetch stored data after successful API calls
//           await Promise.all([
//             fetchStoredWeather(),
//             fetchStoredHourlyWeather()
//           ])

//         } catch (err) {
//           console.error('Error in fetchLocation:', err)
//           setError(err.message)
//         } finally {
//           setDataLoading(false)
//           setLoading(false)
//         }
//       },
//       (err) => {
//         console.error('Geolocation error:', err)
//         setError(`Geolocation failed: ${err.message}`)
//         setLoading(false)
//       }
//     )
//   }

//   // Helper function to render forecast data
//   const renderForecastData = (forecastData) => {
//     if (!forecastData) return null
    
//     // Handle both single object and array cases
//     const dataToRender = Array.isArray(forecastData) ? forecastData[0] : forecastData
    
//     if (!dataToRender || !dataToRender.list) return null

//     return (
//       <div className="mt-4 bg-blue-100 p-4 rounded shadow">
//         <h2 className="text-lg font-semibold mb-2">
//           5-Day Forecast {dataToRender.city?.name ? `for ${dataToRender.city.name}` : ''}
//         </h2>
        
//         <p className="mb-3">
//           📊 {dataToRender.cnt || dataToRender.list.length || 0} forecast entries
//         </p>
        
//         {/* Debug info - you can remove this once everything works */}
//         <details className="mb-3">
//           <summary className="cursor-pointer text-sm text-gray-600">Debug Info (click to expand)</summary>
//           <pre className="text-xs bg-gray-200 p-2 mt-2 rounded overflow-auto max-h-32">
//             Data type: {Array.isArray(forecastData) ? 'Array' : 'Object'}
//             {Array.isArray(forecastData) && `Array length: ${forecastData.length}`}
//             {JSON.stringify(dataToRender, null, 2).substring(0, 500)}...
//           </pre>
//         </details>
        
//         <div className="grid gap-2 max-h-60 overflow-y-auto">
//           {dataToRender.list.slice(0, 8).map((forecast, index) => (
//             <div key={index} className="bg-white p-2 rounded border">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm font-medium">
//                   {new Date(forecast.dt * 1000).toLocaleDateString()} {' '}
//                   {new Date(forecast.dt * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//                 </span>
//                 <span className="text-sm">
//                   {forecast.main?.temp}°C - {forecast.weather?.[0]?.description}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {dataToRender.list.length > 8 && (
//           <p className="text-sm text-gray-600 mt-2">
//             Showing 8 of {dataToRender.list.length} forecasts
//           </p>
//         )}
//       </div>
//     )
//   }

//   return (
//     <div className="p-4">
//       <button 
//         onClick={fetchLocation} 
//         disabled={loading || dataLoading}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
//       >
//         {loading ? 'Getting Location...' : dataLoading ? 'Fetching Weather Data...' : 'Get Location and Weather Data'}
//       </button>

//       {error && (
//         <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <h4 className="font-semibold">Error:</h4>
//           <p className="text-sm">{error}</p>
//         </div>
//       )}

//       {location && (
//         <div className="mt-4 bg-green-100 p-3 rounded">
//           <p className="text-sm">📍 Location: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}</p>
//         </div>
//       )}

//       {weather && (
//         <div className="mt-4 bg-gray-100 p-4 rounded shadow">
//           <h2 className="text-lg font-semibold mb-2">
//             Current Weather in {weather.name}
//           </h2>
//           <p>🌡️ Temp: {weather.main?.temp}°C (feels like {weather.main?.feels_like}°C)</p>
//           <p>💧 Humidity: {weather.main?.humidity}%</p>
//           <p>🌬️ Wind: {weather.wind?.speed} m/s</p>
//           <p>☁️ Condition: {weather.weather?.[0]?.description}</p>
//         </div>
//       )}

//       {hourlyWeather && renderForecastData(hourlyWeather)}
//     </div>
//   )
// }

// export default LocationFetcher


//imporved UI

'use client'
import React, { useState } from 'react'

const LocationFetcher = () => {
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(false)
  const [weather, setWeather] = useState(null)
  const [hourlyWeather, setHourlyWeather] = useState(null)
  const [error, setError] = useState(null)

  const fetchStoredWeather = async () => {
    try {
      console.log('Fetching stored current weather...')
      const res = await fetch('/api/weather', {
        method: 'GET',
        credentials: 'include',
      })

      if (!res.ok) {
        const err = await res.json()
        console.error('Current weather fetch failed:', err)
        throw new Error(err.error || 'Failed to fetch stored weather')
      }

      const data = await res.json()
      console.log('Current weather response:', data)
      setWeather(data.weather)
    } catch (err) {
      console.error('Error fetching stored weather:', err)
      setError(prev => prev ? `${prev}; ${err.message}` : err.message)
    }
  }

  const fetchStoredHourlyWeather = async () => {
    try {
      console.log('Fetching stored hourly weather...')
      const res = await fetch('/api/weather/hourly', {
        method: 'GET',
        credentials: 'include',
      })

      if (!res.ok) {
        const err = await res.json()
        console.error('Hourly weather fetch failed:', err)
        throw new Error(err.error || 'Failed to fetch stored hourly weather')
      }

      const data = await res.json()
      console.log('Hourly weather response:', data)
      setHourlyWeather(data.hourlyWeather)
    } catch (err) {
      console.error('Error fetching stored hourly weather:', err)
      setError(prev => prev ? `${prev}; ${err.message}` : err.message)
    }
  }

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser. Use a different browser please')
      return
    }
    
    setLoading(true)
    setError(null)
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }
        setLocation(coords)
        console.log('Location obtained:', coords)

        try {
          setDataLoading(true)

          // Fetch current weather data
          console.log('Posting current weather request...')
          const currentWeatherRes = await fetch('/api/weather', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ lat: coords.lat, lon: coords.lon }),
          })

          if (!currentWeatherRes.ok) {
            const err = await currentWeatherRes.json()
            console.error('Current weather POST failed:', err)
            throw new Error(err.error || 'Failed to fetch current weather')
          }

          const currentWeatherData = await currentWeatherRes.json()
          console.log('Current weather POST response:', currentWeatherData)

          // Fetch hourly weather data
          console.log('Posting hourly weather request...')
          const hourlyWeatherRes = await fetch('/api/weather/hourly', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ lat: coords.lat, lon: coords.lon }),
          })

          if (!hourlyWeatherRes.ok) {
            const err = await hourlyWeatherRes.json()
            console.error('Hourly weather POST failed:', err)
            throw new Error(err.error || 'Failed to fetch hourly weather')
          }

          const hourlyWeatherData = await hourlyWeatherRes.json()
          console.log('Hourly weather POST response:', hourlyWeatherData)

          // Fetch stored data after successful API calls
          await Promise.all([
            fetchStoredWeather(),
            fetchStoredHourlyWeather()
          ])

        } catch (err) {
          console.error('Error in fetchLocation:', err)
          setError(err.message)
        } finally {
          setDataLoading(false)
          setLoading(false)
        }
      },
      (err) => {
        console.error('Geolocation error:', err)
        setError(`Geolocation failed: ${err.message}`)
        setLoading(false)
      }
    )
  }

  // Helper function to get weather icon
  const getWeatherIcon = (condition) => {
    const icons = {
      'clear sky': '☀️',
      'few clouds': '🌤️',
      'scattered clouds': '⛅',
      'broken clouds': '☁️',
      'shower rain': '🌦️',
      'rain': '🌧️',
      'thunderstorm': '⛈️',
      'snow': '❄️',
      'mist': '🌫️'
    }
    return icons[condition.toLowerCase()] || '🌤️'
  }

  // Helper function to format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return {
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        weekday: 'short'
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      })
    }
  }

  // Group forecasts by date
  const groupForecastsByDate = (forecasts) => {
    const grouped = {}
    forecasts.forEach(forecast => {
      const date = new Date(forecast.dt * 1000).toDateString()
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(forecast)
    })
    return grouped
  }

  // Render comprehensive forecast data
  const renderForecastData = (forecastData) => {
    if (!forecastData) return null
    
    const dataToRender = Array.isArray(forecastData) ? forecastData[0] : forecastData
    if (!dataToRender || !dataToRender.list) return null

    const groupedForecasts = groupForecastsByDate(dataToRender.list)
    const dates = Object.keys(groupedForecasts).slice(0, 5) // Show 5 days

    return (
      <div className="mt-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg shadow-lg mb-4">
          <h2 className="text-2xl font-bold mb-2">
            5-Day Weather Forecast for {dataToRender.city?.name}
          </h2>
          <p className="text-blue-100">
            {dataToRender.cnt} detailed forecasts • Updated {new Date(dataToRender.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="space-y-4">
          {dates.map((date, dayIndex) => {
            const dayForecasts = groupedForecasts[date]
            const dayDate = new Date(date)
            
            return (
              <div key={date} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {dayDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  <p className="text-sm text-gray-600">{dayForecasts.length} forecasts</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                  {dayForecasts.map((forecast, index) => {
                    const { date: formattedDate, time } = formatDate(forecast.dt)
                    
                    return (
                      <div key={index} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-blue-600">{time}</span>
                          <span className="text-2xl">{getWeatherIcon(forecast.weather[0]?.description)}</span>
                        </div>
                        
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Temperature:</span>
                            <span className="font-semibold">{forecast.main?.temp}°C</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">Feels like:</span>
                            <span>{forecast.main?.feels_like}°C</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">Humidity:</span>
                            <span>{forecast.main?.humidity}%</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">Pressure:</span>
                            <span>{forecast.main?.pressure} hPa</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">Wind:</span>
                            <span>{forecast.wind?.speed} m/s</span>
                          </div>
                          
                          {forecast.wind?.deg && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Wind Dir:</span>
                              <span>{forecast.wind.deg}°</span>
                            </div>
                          )}
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">Clouds:</span>
                            <span>{forecast.clouds?.all}%</span>
                          </div>
                          
                          {forecast.pop > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Rain Chance:</span>
                              <span>{Math.round(forecast.pop * 100)}%</span>
                            </div>
                          )}
                          
                          <div className="pt-1 mt-2 border-t border-gray-200">
                            <p className="text-xs text-gray-600 capitalize">
                              {forecast.weather[0]?.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="text-center mb-6">
        <button 
          onClick={fetchLocation} 
          disabled={loading || dataLoading}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed font-semibold shadow-lg transition-all duration-200"
        >
          {loading ? 'Getting Location...' : dataLoading ? 'Fetching Weather Data...' : 'Get Weather Forecast'}
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <h4 className="font-semibold">Error:</h4>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {location && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          <p className="text-sm">
            📍 Location: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
          </p>
        </div>
      )}

      {weather && (
        <div className="mb-6 bg-gradient-to-r from-orange-400 to-red-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            Current Weather in {weather.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold">{weather.main?.temp}°C</p>
              <p className="text-orange-100">Temperature</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{weather.main?.feels_like}°C</p>
              <p className="text-orange-100">Feels Like</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{weather.main?.humidity}%</p>
              <p className="text-orange-100">Humidity</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{weather.wind?.speed} m/s</p>
              <p className="text-orange-100">Wind Speed</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xl capitalize">{weather.weather?.[0]?.description}</p>
          </div>
        </div>
      )}

      {hourlyWeather && renderForecastData(hourlyWeather)}
    </div>
  )
}

export default LocationFetcher