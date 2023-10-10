const { body, validationResult } = require("express-validator");
const { user } = require("../../Config/index");
const { responsedWithError } = require("../../Response/response");

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
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
      body("DOB")
        .optional()
        .isISO8601()
        .withMessage("Invalid date format (YYYY-MM-DD)"),

      RegistrationValidator.handleValidationErrors,
    ];
  }

  // base class for this handleerrors
  // validation class for custom valiators
  // keep it in one seprate class
  static handleValidationErrors(req, res, next) {
    console.log(req.body.DOB);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responsedWithError(res, 400, { errors: errors.array() });
    }
    next();
  }
}

module.exports = RegistrationValidator;
