const { user } = require("../Config/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AuthenticationError = require("../Error/AuthenticationError");

const logger = require("../Log/logger"); // use this

class AuthService {
  async registerUser(req) {
    return await user.create({
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

    if (existingUser == null) {
      throw new AuthenticationError("User with this email not found", 404);
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (passwordMatch) {
      return this.getJwt(existingUser);
    }
    throw new AuthenticationError("UnAuthorised", 401);
  }

  async getJwt(user) {
    return jwt.sign(
      { id: user.id, username: user.username, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_SECRET_EXPIRY,
      }
    );
  }
}

module.exports = new AuthService();
