const CurrentWeather = ({ weather }) => {
  if (!weather) return null;

  return (
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
  );
};

export default CurrentWeather;