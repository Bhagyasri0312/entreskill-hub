import mongoose from 'mongoose';

const connectDb = async () => {
  const mongoUri = process.env.MONGODB_URI ?? process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('Missing MongoDB connection string. Set MONGODB_URI in the environment.');
  }

  try {
    await mongoose.connect(mongoUri);
    await mongoose.connection.db.admin().ping();
    console.log('MongoDB connection verified');

    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection failed');
    console.error(error.message);
    throw error;
  }
};

export default connectDb;