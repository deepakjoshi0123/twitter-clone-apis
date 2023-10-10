const { responsedWithError } = require("../../Response/response");

class UserIdValidator {
  static userId() {
    return (req, res, next) => {
      const { user_id } = req.params;

      if (isNaN(user_id) || parseInt(user_id) <= 0) {
        return responsedWithError(res, 400, [
          {
            type: "field",
            value: "user_id",
            msg: "user_id should be integer and greater than 0",
            location: "param",
          },
        ]);
      }

      next();
    };
  }
}

module.exports = UserIdValidator;
