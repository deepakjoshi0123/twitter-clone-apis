const ApplicationError = require("../Error/ApplicationError");
const sendErrorMail = require("../Mail/sendErrorMail");

class ErrorHandler {
  dontReport = [];

  handle(err, req, res, next) {
    sendErrorMail(err);
    if (err instanceof ApplicationError) {
      err.render(req, res);
      if (!this.dontReport.includes(err.name)) {
        err.report(req);
      }
    } else {
      this.render(err, req, res);
      this.report(err, req);
    }
  }

  handleUncaught(err) {
    // Logger.error('uncaught error', { message: err.message, trace: err.stack });
    console.log("uncaught exception ---", err);
    process.exit(1);
  }

  handleUncaughtRejection(reason, promise, err) {
    // Logger.error('uncaught promise', {
    //   reason: reason,
    //   message: err.message,
    //   trace: err.stack,
    //   promise: promise,
    // });

    // process.exit(1);
    console.log("unhangle rejection ---", reason, promise, err);
  }

  render(err, req, res) {
    console.log("check me error -------------------------------", err);
    return res.status(500).json({
      statusCode: 500,
      error: err.name || "InternalServerError",
      message: err.message,
    });
  }

  report(err, req) {
    // Logger.error(err.message, {
    //   request: {
    //     url: req.originalUrl,
    //     headers: req.headers,
    //     body: req.body,
    //   },
    //   trace: err.stack,
    // });
  }
}

module.exports = new ErrorHandler();
