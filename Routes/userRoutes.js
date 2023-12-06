const express = require("express");
const router = express.Router();
const userController = require("../Controllers/user.controller");
const validateRequest = require("../Middlewares/validateRequest.js");

const validateToken = require("../Middlewares/Auth/jwtMiddleware");
const UserIdValidator = require("../Middlewares/User/validateUserId");
const FollowIdValidator = require("../Middlewares/User/validateFollowId");

const UnfollowIdValidator = require("../Middlewares/User/validateUnfollowId");
const EditProfileValidator = require("../Middlewares/User/validateEditProfile");

const UpdateUserSchema = require("../Schemas/Users/updateUser.js");

const expressValidator = require("../Bootstrap/expressValidator.js");
const checkSchema = expressValidator.checkSchema;

router.get(
  "/user/:user_id",
  validateToken,
  UserIdValidator.userId(),
  userController.getUser
);

router.put(
  "/user/:user_id",
  // validateToken,
  checkSchema(UpdateUserSchema),
  validateRequest,
  userController.updateProfile
);

router.post(
  "/user/:user_id/follow/:follow_user_id",
  // validateToken,
  FollowIdValidator.followId(),
  userController.follow
);

router.delete(
  "/user/:user_id/unfollow/:unfollowed_user_id",
  // validateToken,
  UnfollowIdValidator.unfollowId(),
  userController.unFollow
);

router.get(
  "/user/:user_id/followings",
  // validateToken,
  UserIdValidator.userId(),
  userController.getfollowings
);

router.get(
  "/user/:user_id/followers",
  // validateToken,
  UserIdValidator.userId(),
  userController.getfollowers
);

router.get(
  "/user/:user_id/recommendation",
  // validateToken,
  UserIdValidator.userId(),
  userController.getUserRecommendation
);

router.get(
  "/user/:user_id/search/:search_query",
  // validateToken,
  UserIdValidator.userId(),
  userController.searchUser
);

module.exports = router;
