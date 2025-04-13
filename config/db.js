import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `✅ Connected to MongoDB at ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`.bgRed.white);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
