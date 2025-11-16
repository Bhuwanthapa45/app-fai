// components/location-fetcher/ErrorMessage.jsx
"use client";

export default function ErrorMessage({ error, onClear }) {
  if (!error) return null;

  return (
    <div className="rounded-xl border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-red-700 dark:text-red-300">Error</h4>
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
        </div>

        {onClear && (
          <button
            onClick={onClear}
            className="text-red-500 dark:text-red-300 hover:text-red-700 dark:hover:text-red-200 font-bold text-lg px-2"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}