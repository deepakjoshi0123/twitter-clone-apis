var jwt = require("jsonwebtoken");

class BaseService {
  id(req) {
    var token = req.headers.authorization || "";
    token = token.replace("Bearer", "").trim() || "";

    var decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded && decoded.id) {
      return decoded.id;
    }

    throw new Error("Unauthorized", 401);
  }
}

module.exports = new BaseService();
