import mongoose from 'mongoose';

const connectDB = async () => {
  // Check if already connected (1 = connected, 2 = connecting)
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export default connectDB;
