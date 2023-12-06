const validationResult = require("express-validator").validationResult;

var validateRequest = function (req, res, next) {
  var errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  var response = {};
  for (var i = 0, a = errors.array(); i < a.length; i++) {
    var error = a[i];
    if ("path" in error) {
      if (error.path in response) {
        response[error.path]["messages"].push(error.msg);
      } else {
        response[error.path] = {
          type: error.type,
          location: error.location,
          value: error.value,
          messages: [error.msg],
        };
      }
    } else {
      if ("others" in response) {
        response["others"].push(error.msg);
      } else {
        response["others"] = [error.msg];
      }
    }
  }

  return res.status(422).json(response);
};

module.exports = validateRequest;
