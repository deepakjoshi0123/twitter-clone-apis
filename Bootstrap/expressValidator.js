const expressValidator = require("express-validator");

const isEmailExists = require("../Validators/isEmailExists");
const isUserPresent = require("../Validators/isUserPresent");
const {
  isUsernameExists,
  isUsernameAvailable,
} = require("../Validators/isUserNameExists");

const isValidUserId = require("../Validators/isValidUserId");

const CustomExpressValidator = new expressValidator.ExpressValidator({
  isUsernameExists,
  isEmailExists,
  isUserPresent,
  isUsernameAvailable,
  isValidUserId,
});

module.exports = {
  body: CustomExpressValidator.body,
  checkSchema: CustomExpressValidator.checkSchema,
};
