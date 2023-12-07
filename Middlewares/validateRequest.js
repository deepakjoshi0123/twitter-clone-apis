const validationResult = require("express-validator").validationResult;

var validateRequest = function (req, res, next) {
  var errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const response = {};

  for (let error of errors.array()) {
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
      // validation errors which are not of type FieldValidationError
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
