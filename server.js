require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./Config/index");
const userRoutes = require("./Routes/userRoutes");
const tweetRoutes = require("./Routes/tweetRoutes");
const authRoutes = require("./Routes/authRoutes");

const ApplicationError = require("./Error/ApplicationError");

const errorHandler = require("./Middlewares/errorHandler");
// const errorGlobalHandler = require("./Middlewares/Error/errorHandler");

const app = express();
db.sequelize.sync();

app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", tweetRoutes);
app.use("/api", userRoutes);

app.use(errorHandler.handle.bind(errorHandler));

process.on("unhandledRejection", (reason, promise) => {
  errorHandler.handleUncaughtRejection(
    reason,
    promise,
    new ApplicationError("Unhandled promise rejection encountered", 500)
  );
});

process.on("uncaughtException", (error) => {
  errorHandler.handleUncaught(error);
});

app.listen(8082, () => {
  console.log("server runnnnig at 890");
});
