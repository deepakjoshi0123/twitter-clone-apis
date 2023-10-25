const AuthService = require("../Services/authService");

const {
  responsedWithSuccess,
  responsedWithSuccessMessage,
  responsedWithErrorMessage,
} = require("../Response/response");

class AuthController {
  async registerUser(req, res, next) {
    try {
      await AuthService.registerUser(req);
      responsedWithSuccessMessage(res, 200, "User registered successfully");
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const token = await AuthService.login(req, res);
      token
        ? responsedWithSuccess(res, 200, token)
        : responsedWithErrorMessage(res, 401, "Authentication failed");
    } catch (error) {
      next(req, res, error);
    }
  }
}

module.exports = new AuthController();
