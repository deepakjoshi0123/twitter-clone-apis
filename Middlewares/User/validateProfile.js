const { body } = require("express-validator");
const ErrorResponse = require("../../Response/errorResponse");

class ProfileValidator {
  static profile() {
    return [
      body("bio").isLength({ min: 3 }).withMessage("Invalid bio"),
      body("username").isLength({ min: 3 }).withMessage("Invalid username"),
      ErrorResponse.handleValidationErrors,
    ];
  }
}

module.exports = ProfileValidator;
