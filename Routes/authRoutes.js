const express = require("express");
const router = express.Router();
const authController = require("../Controllers/auth.controller.js");

const RegistrationValidator = require("../Middlewares/User/validateRegistration.js");
const LoginValidator = require("../Middlewares/User/validateLogin.js");

// Define the registration route
router.post(
  "/register",
  RegistrationValidator.registration(),
  authController.registerUser
);

router.post("/login", LoginValidator.login(), authController.login);

module.exports = router;
