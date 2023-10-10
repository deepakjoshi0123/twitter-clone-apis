const { responsedWithError } = require("../../Response/response");

class UnfollowIdValidator {
  static unfollowId() {
    return (req, res, next) => {
      const { user_id, unfollowed_user_id } = req.params;
      const validationErrors = [];

      if (isNaN(user_id) || parseInt(user_id) <= 0) {
        validationErrors.push({
          type: "field",
          value: "user_id",
          msg: "user_id should be an integer greater than 0",
          location: "param",
        });
      }

      if (isNaN(unfollowed_user_id) || parseInt(unfollowed_user_id) <= 0) {
        validationErrors.push({
          type: "field",
          value: "unfollowed_user_id",
          msg: "follow_user_id should be an integer greater than 0",
          location: "param",
        });
      }

      if (validationErrors.length > 0) {
        return responsedWithError(res, 400, validationErrors);
      }

      next();
    };
  }
}

module.exports = UnfollowIdValidator;
