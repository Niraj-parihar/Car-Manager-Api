const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routers/user");
const adminRouter = require("./routers/admin");
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(console.log("Connected to MongoDb"))
  .catch((err) => {
    console.log("connecting problem Error: ", err);
  });

const app = express();
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);

app.listen(3000, () => {
  console.log("Server is up and running on post : ", 3000);
});
