const { body, validationResult } = require("express-validator");
const RegistrationValidator = require("../User/validateRegistration");
const ErrorResponse = require("../../Response/errorResponse");

class EditProfileValidator {
  static EditProfile() {
    return [
      body("username")
        .optional()
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(
          "Username should contain only letters, numbers, and underscores"
        )
        .custom(async (username, { req }) => {
          if (
            await RegistrationValidator.usernameExists(
              username,
              req.params.user_id
            )
          ) {
            throw new Error("username already exists");
          }
        }),

      body("phone")
        .optional()
        .isLength({ min: 10, max: 10 })
        .isNumeric()
        .withMessage("Phone must be exactly 10 digits"),

      body("DOB")
        .optional()
        .isISO8601()
        .withMessage("Invalid date format (YYYY-MM-DD)"),

      ErrorResponse.handleValidationErrors,
    ];
  }
}

module.exports = EditProfileValidator;
