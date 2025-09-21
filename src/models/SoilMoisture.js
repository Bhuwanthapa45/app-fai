import mongoose from 'mongoose';

// Reference User schema
const SoilMoistureSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  farmLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    elevation: { type: Number },
  },
  data: [
    {
      date: { type: Date, required: true },
      numericValue: { type: Number, required: true }, // 0-1 value
      interpretedValue: { type: String, required: true }, // RAG-friendly description
    },
  ],
}, { timestamps: true });

export default mongoose.models.SoilMoisture || mongoose.model('SoilMoisture', SoilMoistureSchema);