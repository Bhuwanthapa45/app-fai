// components/location-fetcher/LocationDisplay.jsx
"use client";

export default function LocationDisplay({ location }) {
  if (!location) return null;

  return (
    <div className="w-full rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 p-4 shadow-sm">
      <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
        📍 <span className="font-semibold">Location:</span>{" "}
        {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
      </p>
    </div>
  );
}