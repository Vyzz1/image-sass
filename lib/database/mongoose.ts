import mongoose, { Mongoose } from "mongoose";

const URL = process.env.MONGODB_URI;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!URL) throw new Error("MONGODB_URI is not defined");
  cached.promise =
    cached.promise ||
    mongoose.connect(URL, {
      dbName: "image-sass",
      bufferCommands: false,
    });
  cached.conn = await cached.promise;
  return cached.conn;
};
