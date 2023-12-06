const express = require("express");

const router = express.Router();

const authController = require("../Controllers/auth.controller.js");
const validateRequest = require("../Middlewares/validateRequest.js");

const expressValidator = require("../Bootstrap/expressValidator.js");
const checkSchema = expressValidator.checkSchema;

const RegisterUserSchema = require("../Schemas/Auth/registerUser.js");
const LoginUserSchema = require("../Schemas/Auth/loginUser.js");

router.post(
  "/register",
  checkSchema(RegisterUserSchema),
  validateRequest,
  authController.registerUser
);

router.post(
  "/login",
  checkSchema(LoginUserSchema),
  validateRequest,
  authController.login
);

module.exports = router;
