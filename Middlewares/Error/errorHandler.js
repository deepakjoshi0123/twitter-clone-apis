const { responsedWithErrorMessage } = require("../../Response/response");
const mailer = require("../../Mail/config");

function errorHandler(err, req, res, next) {
  new mailer().sendEmail({
    headers: JSON.stringify(req.headers),
    method: req.method,
    url: req.url,
    body: JSON.stringify(req.body),
    message: err.message,
    stack: err.stack,
    timestamp: err.timestamp,
  });

  responsedWithErrorMessage(res, 500, "Internal Server Error");
}

module.exports = errorHandler;
