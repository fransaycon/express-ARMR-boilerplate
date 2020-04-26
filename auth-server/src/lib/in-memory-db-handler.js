import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

const mongod = new MongoMemoryServer();

/**
 * Connect to the in-memory database.
 */
export const connectTestDatabase = async () => {
  const uri = await mongod.getConnectionString();
  await mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeTestDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
export const clearTestDatabase = async () => {
  const { collections } = mongoose.connection;

  Object.keys(collections).forEach(async (key) => {
    await collections[key].deleteMany({});
  });
};
