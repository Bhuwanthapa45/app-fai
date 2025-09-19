import mongoose from 'mongoose'
const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

// Global variable to store the connection
let isConnected = false

export async function connectDB() {
  // Check if the connection is already established
  if (isConnected) {
    console.log('MongoDB is already connected')
    return
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI)
    isConnected = true
    console.log('MongoDB connected successfully')
    return
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error
  }
}
