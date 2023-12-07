var jwt = require("jsonwebtoken");
const AuthencationError = require("../Error/AuthenticationError");

class BaseService {
  id(req) {
    var token = req.headers.authorization || "";
    token = token.replace("Bearer", "").trim() || "";

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded && decoded.id) {
      return decoded.id;
    }

    throw new AuthencationError("Unauthorized", 401);
  }
}

module.exports = new BaseService();
