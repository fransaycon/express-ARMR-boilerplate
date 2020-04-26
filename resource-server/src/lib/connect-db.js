import mongoose from "mongoose";

/**
 * Connect to mongodb database through mongoose
 * @return {Promise<void>}
 */
const connectDb = async () => {
  await mongoose.connect(process.env.DATABASE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDb;
