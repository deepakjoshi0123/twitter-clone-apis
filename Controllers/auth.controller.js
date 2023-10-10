const AuthService = require("../Services/authService");

const {
  responsedWithSuccess,
  responsedWithSuccessMessage,
  responsedWithErrorMessage,
} = require("../Response/response");

class AuthController {
  async registerUser(req, res) {
    await AuthService.registerUser(req);
    responsedWithSuccessMessage(res, 200, "User registered successfully");
  }

  async login(req, res) {
    const token = await AuthService.login(req, res);
    token
      ? responsedWithSuccess(res, 200, token)
      : responsedWithErrorMessage(res, 401, "Authentication failed");
  }
}

module.exports = new AuthController();
