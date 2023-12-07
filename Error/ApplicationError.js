class ApplicationError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    console.log(this.constructor.name);
  }

  get name() {
    return this.constructor.name;
  }

  render(req, res) {
    // console.log("check... me ", this.messages);
    return res.status(this.statusCode).json({
      statusCode: this.statusCode,
      error: this.name,
      message: this.message,
    });
  }

  report(req) {}
}

module.exports = ApplicationError;
