const ErrorMessage = ({ error, onClear }) => {
  if (!error) return null;

  return (
    <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-semibold">Error:</h4>
          <p className="text-sm">{error}</p>
        </div>
        {onClear && (
          <button 
            onClick={onClear}
            className="text-red-500 hover:text-red-700 font-bold text-xl"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;