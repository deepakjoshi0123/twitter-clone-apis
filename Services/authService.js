const { user } = require("../Config/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  responsedWithErrorMessage,
  responsedWithError,
} = require("../Response/response");

const logger = require("../Log/logger");

class AuthService {
  async registerUser(req) {
    await user.create({
      name: req.body.name,
      email: req.body.email,
      DOB: req.body.DOB,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
    });
  }

  async login(req, res) {
    const { email, password } = req.body;

    const existingUser = await user.findOne({ where: { email } });
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    return passwordMatch ? this.getJwt(existingUser) : null;
  }

  async getJwt(user) {
    return jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_SECRET_EXPIRY,
    });
  }
}

module.exports = new AuthService();
