import express from "express";
import { connectToDb, getDb } from "./db/database";

const app = express();

let db;
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
    db = getDb();
  }
});
