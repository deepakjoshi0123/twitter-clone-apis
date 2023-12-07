const { responsedWithErrorMessage } = require("../Response/response");
const mailer = require("../Mail/sendErrorMail");

function errorHandler(err, req, res, next) {
  // new mailer().sendEmail({
  //   headers: JSON.stringify(req.headers),
  //   method: req.method,
  //   url: req.url,
  //   body: JSON.stringify(req.body),
  //   message: err.message,
  //   stack: err.stack,
  //   timestamp: err.timestamp,
  // });
  // console.log("check error ---------", err);
  responsedWithErrorMessage(res, 500, "Internal Server Error");
}

module.exports = errorHandler;
