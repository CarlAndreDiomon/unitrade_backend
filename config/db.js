import mongoose from 'mongoose';

const connectDB = async () => {
  // Check if already connected (1 = connected, 2 = connecting)
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  console.log(`Connecting to MongoDB... (URI starts with: ${process.env.MONGO_URI.substring(0, 15)}...)`);

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // Increased to 30s for Vercel cold starts
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export default connectDB;
