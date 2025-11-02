"use client"

import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

export default function FiveDayForecastChart({ dailyForecasts }) {
  if (!dailyForecasts || dailyForecasts.length === 0) return null


  

  // Color mapping for temperature
  const getTempColor = (temp) => {
    if (temp >= 35) return "#ef4444" // hot
    if (temp >= 25) return "#f59e0b" // warm
    return "#3b82f6" // cool
  }

  // Color mapping for rain
  const getRainColor = (rain) => (rain >= 50 ? "#1e40af" : "#3b82f6")

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 mb-6 w-full">
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">5-Day Forecast</h2>
        <p className="text-gray-500 text-sm sm:text-base">Temperature & Rain Chance 🌡️☔</p>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailyForecasts} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", { weekday: "short" })
              }
            />
            <YAxis yAxisId="left" label={{ value: "Temp °C", angle: -90, position: "insideLeft" }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: "Rain %", angle: -90, position: "insideRight" }} />
            <Tooltip
              formatter={(value, name) => {
                if (name === "avgTemp") return [`${value}°C 🌡️`, "Temperature"]
                if (name === "avgRain") return [`${value}% ☔`, "Rain Chance"]
                return value
              }}
            />
            {/* Temperature bars */}
            <Bar
              yAxisId="left"
              dataKey="avgTemp"
              fill="#f59e0b"
              radius={[4, 4, 0, 0]}
              // dynamic color based on value
              shape={(props) => {
                const { x, y, width, height, payload } = props
                return <rect x={x} y={y} width={width} height={height} fill={getTempColor(payload.avgTemp)} rx={4} ry={4} />
              }}
              barSize={20}
            />
            {/* Rain bars */}
            <Bar
              yAxisId="right"
              dataKey="avgRain"
              radius={[4, 4, 0, 0]}
              shape={(props) => {
                const { x, y, width, height, payload } = props
                return <rect x={x} y={y} width={width} height={height} fill={getRainColor(payload.avgRain)} rx={4} ry={4} />
              }}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}