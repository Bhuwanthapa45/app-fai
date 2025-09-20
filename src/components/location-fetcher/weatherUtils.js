// Helper function to get weather icon
export const getWeatherIcon = (condition) => {
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
  };
  return icons[condition?.toLowerCase()] || '🌤️';
};

// Helper function to format date
export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
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
  };
};

// Group forecasts by date
export const groupForecastsByDate = (forecasts) => {
  const grouped = {};
  forecasts.forEach(forecast => {
    const date = new Date(forecast.dt * 1000).toDateString();
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(forecast);
  });
  return grouped;
};