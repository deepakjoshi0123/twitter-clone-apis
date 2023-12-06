require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./Config/index");
const userRoutes = require("./Routes/userRoutes");
const tweetRoutes = require("./Routes/tweetRoutes");
const authRoutes = require("./Routes/authRoutes");
const exceptionHandlers = require("./Exception/exceptionHandlers");
const errorHandler = require("./Middlewares/errorHandler");

const app = express();
db.sequelize.sync();

app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", tweetRoutes);
app.use("/api", userRoutes);

app.use(errorHandler.handle.bind(errorHandler));

process.on("unhandledRejection", (reason, promise) => {
  const handler = exceptionHandlers[reason.name] || exceptionHandlers.default;
  handler(reason);
});

process.on("uncaughtException", (error) => {
  const handler = exceptionHandlers[error.name] || exceptionHandlers.default;
  handler(error);
});

app.listen(8082, () => {
  console.log("server runnnnig at 890");
});
