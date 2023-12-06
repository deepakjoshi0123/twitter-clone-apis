const expressValidator = require("express-validator");

const isEmailExists = require("../Validators/isEmailExists");
const isUserPresent = require("../Validators/isUserPresent");
const isUsernameExists = require("../Validators/isUserNameExists");

const CustomExpressValidator = new expressValidator.ExpressValidator({
  isUsernameExists,
  isEmailExists,
  isUserPresent,
});

module.exports = {
  body: CustomExpressValidator.body,
  checkSchema: CustomExpressValidator.checkSchema,
};
