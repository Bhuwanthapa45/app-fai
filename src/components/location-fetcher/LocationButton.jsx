// components/location-fetcher/LocationButton.jsx
"use client";

export default function LocationButton({ onClick, loading, dataLoading }) {
  const isDisabled = loading || dataLoading;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center gap-2 
        px-5 py-2.5 rounded-lg font-semibold
        transition shadow-sm
        text-white
        ${isDisabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-emerald-600 hover:bg-emerald-700"
        }
      `}
    >
      {loading
        ? "Getting Location..."
        : dataLoading
        ? "Fetching Weather..."
        : "Get Weather Forecast"}
    </button>
  );
}