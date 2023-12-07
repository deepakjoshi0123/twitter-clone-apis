const logger = require("../Log/logger");
const mailer = require("../Mail/sendErrorMail");

module.exports = {
  // TypeError: (error) => {
  //   logger.error("A TypeError occurred:", error);
  //   new mailer().sendEmail(error);
  // },
  // ReferenceError: (error) => {
  //   logger.error("A ReferenceError occurred:", error);
  //   new mailer().sendEmail(error);
  // },
  // default: (error) => {
  //   logger.error("Exception occurred:", error);
  //   new mailer().sendEmail(error);
  // },
};
