

import { formatDate, getWeatherIcon, groupForecastsByDate } from './weatherUtils';
import DayForecastChart from "./DayForecastChart";
import FiveDayForecastChart from "./FiveDayForecastChart"

const HourlyForecast = ({ hourlyWeather }) => {
  if (!hourlyWeather) return null;

  const dataToRender = Array.isArray(hourlyWeather) ? hourlyWeather[0] : hourlyWeather;
  if (!dataToRender || !dataToRender.list) return null;
  const sunriseTime = new Date(dataToRender.city.sunrise * 1000).toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
});
const sunsetTime = new Date(dataToRender.city.sunset * 1000).toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
});
  const groupedForecasts = groupForecastsByDate(dataToRender.list);
  const dates = Object.keys(groupedForecasts).slice(0, 5); // Show 5 days
  const getDailyAverages = (groupedForecasts) => {
  const dates = Object.keys(groupedForecasts).slice(0, 5);

  return dates.map((date) => {
    const day = groupedForecasts[date];
    const avgTemp =
      day.reduce((sum, f) => sum + f.main.temp, 0) / day.length;
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
    <div className="mt-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5 rounded-2xl shadow-lg mb-6">
        <h2 className="text-3xl font-bold mb-2 tracking-tight">
          5-Day Weather Forecast for {dataToRender.city?.name}
        </h2>
        <p className="text-blue-100 text-sm sm:text-base">
          {dataToRender.cnt} detailed forecasts • Updated {new Date(dataToRender.createdAt).toLocaleString()}
        </p>
         <div className="mt-2 text-sm sm:text-base flex gap-4">
    <span>🌅 Sunrise: {sunriseTime}</span>
    <span>🌇 Sunset: {sunsetTime}</span>
  </div>
      </div>
          <FiveDayForecastChart dailyForecasts={dailyAverages} />

      {/* Daily Forecasts */}
      <div className="space-y-8">
        {dates.map((date) => {
          const dayForecasts = groupedForecasts[date];
          const dayDate = new Date(date);

          return (
            <div key={date} className="bg-white rounded-2xl shadow-md overflow-hidden">
              {/* Day Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  {dayDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h3>
                <p className="text-sm text-gray-500">{dayForecasts.length} forecasts</p>
              </div>

              {/* Chart */}
              <DayForecastChart forecasts={dayForecasts} />

              {/* Hourly Forecast Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-6">
                {dayForecasts.map((forecast, index) => {
                  const { time } = formatDate(forecast.dt);

                  return (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between"
                    >
                      {/* Time & Icon */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-blue-700 text-sm sm:text-base">{time}</span>
                        <span className="text-2xl">{getWeatherIcon(forecast.weather[0]?.description)}</span>
                      </div>

                      {/* Weather Details */}
                      <div className="space-y-1 text-sm sm:text-base">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Temperature:</span>
                          <span className="font-medium">{forecast.main?.temp}°C</span>
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

                        <div className="pt-2 mt-2 border-t border-gray-200">
                          <p className="text-xs sm:text-sm text-gray-500 capitalize">
                            {forecast.weather[0]?.description}
                          </p>
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
};

export default HourlyForecast;