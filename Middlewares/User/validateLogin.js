const { body, validationResult } = require("express-validator");
const RegistrationValidator = require("../User/validateRegistration");
const { responsedWithError } = require("../../Response/response");

class LoginValidator {
  static login() {
    return [
      body("email")
        .isEmail()
        .withMessage("Invalid email address")
        .custom(async (email) => {
          if (!(await RegistrationValidator.emailExists(email))) {
            throw new Error("Invalid email ");
          }
        }),
      LoginValidator.handleValidationErrors,
    ];
  }

  static handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responsedWithError(res, 400, errors.array());
    }
    next();
  }
}

module.exports = LoginValidator;
