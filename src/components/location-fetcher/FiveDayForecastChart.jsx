"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function FiveDayForecastChart({ dailyForecasts }) {
  if (!dailyForecasts || dailyForecasts.length === 0) return null;

  const getTempColor = (temp) => {
    if (temp >= 35) return "#ef4444"; // red
    if (temp >= 25) return "#f59e0b"; // warm yellow
    return "#3b82f6"; // cool blue
  };

  const getRainColor = (rain) => (rain >= 50 ? "#1e40af" : "#3b82f6");

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        5-Day Forecast
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
        Temperature & Rain Probability
      </p>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailyForecasts}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-40" />

            <XAxis
              dataKey="date"
              tickFormatter={(d) =>
                new Date(d).toLocaleDateString("en-US", { weekday: "short" })
              }
            />

            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
              }}
            />

            {/* Temperature */}
            <Bar
              yAxisId="left"
              dataKey="avgTemp"
              barSize={20}
              shape={(props) => {
                const { x, y, width, height, payload } = props;
                return (
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={getTempColor(payload.avgTemp)}
                    rx={4}
                    ry={4}
                  />
                );
              }}
            />

            {/* Rain */}
            <Bar
              yAxisId="right"
              dataKey="avgRain"
              barSize={20}
              shape={(props) => {
                const { x, y, width, height, payload } = props;
                return (
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={getRainColor(payload.avgRain)}
                    rx={4}
                    ry={4}
                  />
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}