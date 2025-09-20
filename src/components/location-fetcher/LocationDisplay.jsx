const LocationDisplay = ({ location }) => {
  if (!location) return null;

  return (
    <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
      <p className="text-sm">
        📍 Location: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
      </p>
    </div>
  );
};

export default LocationDisplay;