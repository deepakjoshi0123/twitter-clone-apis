const { body, validationResult } = require("express-validator");
const ErrorResponse = require("../../Response/errorResponse");

class TweetValidator {
  // try to add if email present or not in in this validator only
  static tweet() {
    return [
      body("tweet")
        .trim()
        .isLength({ min: 1, max: 100 }) // Set the maximum length to 100 characters
        .withMessage("Tweet must be between 1 and 100 characters"),
      ErrorResponse.handleValidationErrors,
    ];
  }
}

module.exports = TweetValidator;
