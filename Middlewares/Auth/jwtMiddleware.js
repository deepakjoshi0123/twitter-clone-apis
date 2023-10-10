const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }

    req.user = decoded; // just kept this data if it's needed later

    // Continue to the next middleware or route handler
    next();
  });
}

module.exports = validateToken;
