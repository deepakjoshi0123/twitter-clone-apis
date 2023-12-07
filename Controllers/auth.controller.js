const AuthService = require("../Services/authService");

class AuthController {
  //unahandled rejection for sequelise dublicate entry for name
  async registerUser(req, res, next) {
    try {
      await AuthService.registerUser(req);
      return res.status(200).json({
        status: 200,
        message: "user registered successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const token = await AuthService.login(req, res);
      return res.status(200).json({
        status: 200,
        data: token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
