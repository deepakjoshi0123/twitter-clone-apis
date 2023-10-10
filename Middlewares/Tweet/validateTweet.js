const { body, validationResult } = require("express-validator");
const { responsedWithError } = require("../../Response/response");

class TweetValidator {
  // try to add if email present or not in in this validator only
  static tweet() {
    return [
      body("tweet")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Tweet can't be empty string"),
      TweetValidator.handleValidationErrors,
    ];
  }

  static handleValidationErrors(req, res, next) {
    console.log();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responsedWithError(res, 400, errors.array());
    }
    next();
  }
}

module.exports = TweetValidator;
