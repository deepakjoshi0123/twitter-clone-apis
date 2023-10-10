function responsedWithSuccessMessage(res, status, message) {
  return res.status(status).json({
    status,
    message,
  });
}

function responsedWithSuccess(res, status, data) {
  return res.status(status).json({
    status,
    data,
  });
}

function responsedWithError(res, status, errors) {
  return res.status(status).json({
    status,
    errors,
  });
}

function responsedWithErrorMessage(res, status, message) {
  return res.status(status).json({
    status,
    message,
  });
}

module.exports = {
  responsedWithSuccess,
  responsedWithSuccessMessage,
  responsedWithError,
  responsedWithErrorMessage,
};
