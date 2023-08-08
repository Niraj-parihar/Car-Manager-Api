import { MongoClient } from "mongodb";

let _db;
const databaseName = "car-manager";
const connectToDatabase = async () => {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  try {
    await client.connect({ useNewUrlParser: true });
    _db = client.db(databaseName);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};

const getDb = () => {
  if (!_db) {
    throw new Error("Database not connected");
  }
  return _db;
};

export default {
  connectToDatabase,
  getDb,
};
