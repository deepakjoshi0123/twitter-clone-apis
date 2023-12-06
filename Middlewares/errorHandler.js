const ApplicationError = require("../Error/AuthError");

class ErrorHandler {
  dontReport = [];

  handle(err, req, res, next) {
    console.log("check error ---", err);
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

    process.exit(1);
  }

  handleUncaughtRejection(reason, promise, err) {
    // Logger.error('uncaught promise', {
    //   reason: reason,
    //   message: err.message,
    //   trace: err.stack,
    //   promise: promise,
    // });

    // it is considered a good practice to exit the server on any uncaught errors
    // the process manager must make sure to restart the process after this
    process.exit(1);
  }

  render(err, req, res) {
    console.log("check me error -------------------------------", err.name);
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
