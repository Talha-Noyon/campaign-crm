import mongoose from 'mongoose'

import {env} from '#shared/schemas/EnvSchema.js'

export async function connectDB() {
  try {
    await mongoose.connect(env.MONGO_URI)
    console.log('MongoDB connected')
  } catch (error) {
    console.error(`Database connection error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
