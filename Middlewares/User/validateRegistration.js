const { body } = require("express-validator");
const { user } = require("../../Config/index");
const ErrorResponse = require("../../Response/errorResponse");

class RegistrationValidator {
  static async emailExists(email) {
    const existingUser = await user.findOne({ where: { email } });
    return existingUser !== null;
  }

  static async usernameExists(username, id) {
    const existingUsername = await user.findOne({ where: { username } });

    if (existingUsername && existingUsername.id === parseInt(id)) {
      return false;
    }

    return existingUsername !== null;
  }

  static registration() {
    return [
      body("name")
        .matches(/[a-zA-Z]+(\s+[a-zA-Z]+)*/)
        .withMessage(
          "Name should contain at least one letter and may include spaces"
        )
        .isLength({ min: 7, max: 30 })
        .withMessage("name must be between 7 and 30 characters long")
        .custom((value) => {
          // Remove spaces and check the length
          const effectiveLength = value.replace(/\s+/g, "").length;
          if (effectiveLength < 3) {
            throw new Error(
              "Effective name length (after removing spaces) should be at least 3 characters"
            );
          }
          return true;
        }),
      body("email")
        .isEmail()
        .withMessage("Invalid email address")
        .isLength({ max: 30 })
        .withMessage("email should not exceed 30 characters long")
        .custom(async (email, { req }) => {
          if (await RegistrationValidator.emailExists(email, req)) {
            throw new Error("Email already exists");
          }
        }),
      body("username")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(
          "Username should contain only letters, numbers, and underscores"
        )
        .isLength({ min: 3, max: 30 })
        .withMessage("Username must be between 3 and 30 characters long")
        .custom(async (username, { req }) => {
          if (await RegistrationValidator.usernameExists(username, req)) {
            throw new Error("username already exists");
          }
        }),
      body("phone")
        .isLength({ min: 10, max: 10 })
        .isNumeric()
        .withMessage("Phone must be exactly 10 digits"),
      body("password")
        .isLength({ min: 6, max: 30 })
        .withMessage("Password must be between 6 and 30 characters long"),

      ErrorResponse.handleValidationErrors,
    ];
  }
}

module.exports = RegistrationValidator;
