const { body, validationResult } = require("express-validator");
const RegistrationValidator = require("../User/validateRegistration");
const ErrorResponse = require("../../Response/errorResponse");

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
      ErrorResponse.handleValidationErrors,
    ];
  }
}

module.exports = LoginValidator;
