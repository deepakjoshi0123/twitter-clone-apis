const isValidUserId = require("../../Validators/isValidUserId");

userIdSchema = {
  userId: {
    in: ["params"],
    custom: {
      options: isValidUserId,
      bail: true,
    },
    isUserPresent: true,
  },
};

module.exports = userIdSchema;
