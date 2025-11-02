'use client'
import React from 'react'

const SoilMoistureDisplay = ({ soilMoisture }) => {
  if (!soilMoisture || !soilMoisture.data || soilMoisture.data.length === 0) {
    return null
  }

  return (
    <div className="mt-8 bg-white/70 backdrop-blur-lg border border-gray-200 p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        🌱 Soil Moisture (0–10 cm)
      </h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-blue-100 text-gray-800">
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Moisture Value (m³/m³)</th>
              <th className="py-2 px-4 text-left">Condition</th>
            </tr>
          </thead>
          <tbody>
            {soilMoisture.data.map((entry, idx) => (
              <tr 
                key={idx} 
                className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
              >
                <td className="py-2 px-4">
                  {new Date(entry.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">{entry.numericValue}</td>
                <td className="py-2 px-4">{entry.interpretedValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SoilMoistureDisplay