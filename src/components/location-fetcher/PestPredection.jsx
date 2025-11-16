"use client";

export default function PestPrediction({
  pestPrediction,
  onPredict,
  onFetchStored,
}) {
  const riskColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        🐛 Pest Prediction
      </h2>

      {/* Buttons */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <button
          onClick={onPredict}
          className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
        >
          Predict Now
        </button>

        <button
          onClick={onFetchStored}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Fetch Stored Prediction
        </button>
      </div>

      {/* Prediction Output */}
      {pestPrediction && (
        <div className="space-y-4">
          <div>
            <p className="font-semibold">
              Risk Score:{" "}
              <span className="text-emerald-600 dark:text-emerald-300">
                {pestPrediction.risk_score}
              </span>
            </p>
          </div>

          <div>
            <p className="font-semibold mb-1">Risk Level:</p>
            <span
              className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                riskColors[pestPrediction.risk_level?.toLowerCase()] ||
                riskColors["medium"]
              }`}
            >
              {pestPrediction.risk_level}
            </span>
          </div>

          <div>
            <p className="font-semibold mb-2">Advice:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              {pestPrediction.advice?.map((a, idx) => (
                <li key={idx}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}