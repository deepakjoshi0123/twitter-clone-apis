const logger = require("../Log/logger");
const mailer = require("../Mail/config");

module.exports = {
  TypeError: (error) => {
    logger.error("A TypeError occurred:", error);
    new mailer().sendEmail({ ...error, timestamp: new Date().toISOString() });
  },
  ReferenceError: (error) => {
    logger.error("A ReferenceError occurred:", error);
    new mailer().sendEmail({ ...error, timestamp: new Date().toISOString() });
  },
  default: (error) => {
    logger.error("Exception occurred:", error);
    new mailer().sendEmail({ ...error, timestamp: new Date().toISOString() });
  },
};
