//use logger here too
function errorHandler(err, req, res, next) {
  // Log the error for debugging purposes
  console.error("inside global error", err);

  // Customize the error response based on the error type
  // if (err instanceof SyntaxError) {
  //   res.status(400).json({ error: "Bad request" });
  // } else if (err instanceof MyCustomError) {
  //   res.status(500).json({ error: "Custom error occurred" });
  // } else {
  //   res.status(500).json({ error: "Internal server error" });
  // }
}

module.exports = errorHandler;
