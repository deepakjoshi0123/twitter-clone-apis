const logger = require("../Log/logger");

module.exports = {
  TypeError: (error) => {
    console.error("A TypeError occurred:", error);
    logger.error("A TypeError occurred:", error);
  },
  ReferenceError: (error) => {
    console.error("A ReferenceError occurred:", error);
    logger.error("A ReferenceError occurred:", error);
  },
  default: (error) => {
    console.error("Exception occurred:", error, "deepak");
    logger.error("Exception occurred:", error);
  },
};
