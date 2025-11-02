import mongoose from "mongoose";

const PestPredictSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
  risk_score: Number,
  risk_level: String,
  advice: [String],
  rawResponse: Object, // optional - keep full response from FastAPI
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.PestPredict ||
  mongoose.model("PestPredict", PestPredictSchema);