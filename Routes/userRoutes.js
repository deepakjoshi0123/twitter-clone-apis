const express = require("express");
const router = express.Router();
const userController = require("../Controllers/user.controller");
const validateRequest = require("../Middlewares/validateRequest.js");

const validateToken = require("../Middlewares/Auth/jwtMiddleware");

const UpdateUserSchema = require("../Schemas/Users/updateUser.js");
const userIdSchema = require("../Schemas/Users/userId.js");
const expressValidator = require("../Bootstrap/expressValidator.js");
const checkSchema = expressValidator.checkSchema;

router.get(
  "/user/:userId",
  validateToken,
  validateRequest,
  userController.getUser
);

router.put(
  "/user/:userId",
  // validateToken,
  checkSchema(UpdateUserSchema),
  validateRequest,
  userController.updateProfile
);

router.post(
  "/user/:userId/follow/:follow_user_id",
  // validateToken,
  checkSchema(userIdSchema),
  validateRequest,
  userController.follow
);

router.delete(
  "/user/:userId/unfollow/:unfollowed_user_id",
  // validateToken,
  checkSchema(userIdSchema),
  validateRequest,
  userController.unFollow
);

router.get(
  "/user/:userId/followings",
  // validateToken,
  checkSchema(userIdSchema),
  validateRequest,
  userController.getfollowings
);

router.get(
  "/user/:userId/followers",
  // validateToken,
  checkSchema(userIdSchema),
  validateRequest,
  userController.getfollowers
);

router.get(
  "/user/:userId/recommendation",
  // validateToken,
  checkSchema(userIdSchema),
  validateRequest,
  userController.getUserRecommendation
);

router.get(
  "/user/:userId/search/:search_query",
  // validateToken,
  checkSchema(userIdSchema),
  validateRequest,
  userController.searchUser
);

module.exports = router;
