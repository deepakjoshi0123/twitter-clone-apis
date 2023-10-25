const { validationResult } = require("express-validator");
const { responsedWithError } = require("../Response/response");

class ErrorResponse {
  static handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responsedWithError(res, 400, { errors: errors.array() });
    }
    next();
  }
}

module.exports = ErrorResponse;
