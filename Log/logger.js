const winston = require("winston");

// Define log levels and corresponding log file names
const logLevels = {
  error: "error.log",
  warn: "warn.log",
  info: "info.log",
};

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

const logger = winston.createLogger({
  level: "info", // Set the default log level
  format: logFormat,
  transports: [
    // Log to files
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

module.exports = logger;
