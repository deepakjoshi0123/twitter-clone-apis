const { body, validationResult } = require("express-validator");
// change res.json from validator and use responseWithError
class ProfileValidator {
  // try to add if email present or not in in this validator only
  static profile() {
    // does needs username validation that hasn't picked yet
    return [
      body("bio").isLength({ min: 3 }).withMessage("Invalid bio"),
      body("username").isLength({ min: 3 }).withMessage("Invalid username"),
      ProfileValidator.handleValidationErrors,
    ];
  }

  static handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
}

module.exports = ProfileValidator;
