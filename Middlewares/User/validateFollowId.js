const { responsedWithError } = require("../../Response/response");

class FollowIdValidator {
  static followId() {
    return (req, res, next) => {
      const { user_id, follow_user_id } = req.params;
      const validationErrors = [];

      if (isNaN(user_id) || parseInt(user_id) <= 0) {
        validationErrors.push({
          type: "field",
          value: "user_id",
          msg: "user_id should be an integer greater than 0",
          location: "param",
        });
      }

      if (isNaN(follow_user_id) || parseInt(follow_user_id) <= 0) {
        validationErrors.push({
          type: "field",
          value: "follow_user_id",
          msg: "follow_user_id should be an integer greater than 0",
          location: "param",
        });
      }

      if (user_id === follow_user_id) {
        validationErrors.push({
          type: "custom",
          msg: "user_id and follow_user_id cannot be the same",
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

module.exports = FollowIdValidator;
