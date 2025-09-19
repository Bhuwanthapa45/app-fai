import mongoose from 'mongoose'
const UserScheam = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select:false,
    },
  },
  { timestamps: true }
)
export default mongoose.models.User || mongoose.model('User', UserScheam)
