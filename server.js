require("dotenv").config();

const express = require("express");
const timeout = require("connect-timeout");
const cors = require("cors");

const db = require("./Config/index");
const userRoutes = require("./Routes/userRoutes");
const tweetRoutes = require("./Routes/tweetRoutes");
const authRoutes = require("./Routes/authRoutes");
const exceptionHandlers = require("./Exception/exceptionHandlers");

const errorGlobalHandler = require("./Middlewares/Error/errorHandler");

const app = express();
db.sequelize.sync();

app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", tweetRoutes);
app.use("/api", userRoutes);

app.use(errorGlobalHandler);
app.use(timeout("5s")); // Set a timeout of 5 seconds

//prominse rejection un handled will not go in this

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at: --> ", promise);
  console.error("Reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.log("check...");
  const handler = exceptionHandlers[error.name] || exceptionHandlers.default;
  handler(error);
  //send few errors to developer
});

app.listen(8082, () => {
  console.log("server runnnnig at 8082");
});
