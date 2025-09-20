import { formatDate, getWeatherIcon, groupForecastsByDate } from './weatherUtils';
import DayForecastChart from "./DayForecastChart";

const HourlyForecast = ({ hourlyWeather }) => {
  if (!hourlyWeather) return null;
  
  const dataToRender = Array.isArray(hourlyWeather) ? hourlyWeather[0] : hourlyWeather;
  if (!dataToRender || !dataToRender.list) return null;

  const groupedForecasts = groupForecastsByDate(dataToRender.list);
  const dates = Object.keys(groupedForecasts).slice(0, 5); // Show 5 days

  return (
    <div className="mt-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-black p-4 rounded-lg shadow-lg mb-4">
        <h2 className="text-2xl font-bold mb-2">
          5-Day Weather Forecast for {dataToRender.city?.name}
        </h2>
        <p className="text-blue-100">
          {dataToRender.cnt} detailed forecasts • Updated {new Date(dataToRender.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="space-y-4">
        {dates.map((date, dayIndex) => {
          const dayForecasts = groupedForecasts[date];
          const dayDate = new Date(date);
          
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
                <DayForecastChart forecasts={dayForecasts} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                {dayForecasts.map((forecast, index) => {
                  const { date: formattedDate, time } = formatDate(forecast.dt);
                  
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