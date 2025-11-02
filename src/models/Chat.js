import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    context_used: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);