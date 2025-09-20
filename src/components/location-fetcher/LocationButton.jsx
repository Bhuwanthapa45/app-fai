const LocationButton = ({ onClick, loading, dataLoading }) => (
  <div className="text-center mb-6">
    <button 
      onClick={onClick} 
      disabled={loading || dataLoading}
      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed font-semibold shadow-lg transition-all duration-200"
    >
      {loading ? 'Getting Location...' : dataLoading ? 'Fetching Weather Data...' : 'Get Weather Forecast'}
    </button>
  </div>
);

export default LocationButton;