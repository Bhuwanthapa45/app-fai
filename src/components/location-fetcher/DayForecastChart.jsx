"use client";

import {
  LineChart,
  Line,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
} from "recharts";

const DayForecastChart = ({ forecasts }) => {
  if (!forecasts || forecasts.length === 0) return null;

  // Prepare data for chart
  const chartData = forecasts.map(f => {
    const dt = new Date(f.dt * 1000);
    return {
      time: dt.toLocaleTimeString("en-US", { hour: "2-digit", hour12: true }),
      temp: f.main?.temp,
      rainChance: Math.round((f.pop || 0) * 100),
    };
  });

  return (
    <div className="w-full h-64 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis
            yAxisId="left"
            label={{ value: "Temp °C", angle: -90, position: "insideLeft" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: "Rain %", angle: -90, position: "insideRight" }}
          />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} />
          <Bar yAxisId="right" dataKey="rainChance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DayForecastChart;