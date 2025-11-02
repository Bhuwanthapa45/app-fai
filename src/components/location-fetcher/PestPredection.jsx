'use client'
import React from 'react'

const PestPredection = ({ pestPrediction, onPredict, onFetchStored }) => {
  return (
    <div className="mt-8 bg-white/70 backdrop-blur-lg border border-gray-200 p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        🐛 Pest Prediction
      </h2>

      <div className="flex gap-4 mb-4">
        <button 
          onClick={onPredict} 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Predict Now
        </button>
        <button 
          onClick={onFetchStored} 
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Fetch Stored Prediction
        </button>
      </div>

      {pestPrediction && (
        <div className="mt-4">
          <p><strong>Risk Score:</strong> {pestPrediction.risk_score}</p>
          <p><strong>Risk Level:</strong> {pestPrediction.risk_level}</p>
          <p><strong>Advice:</strong></p>
          <ul className="list-disc pl-5">
            {pestPrediction.advice.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}

export default PestPredection