const express = require("express");
const router = express.Router();
const userController = require("../Controllers/user.controller");

const validateToken = require("../Middlewares/Auth/jwtMiddleware");
const UserIdValidator = require("../Middlewares/User/validateUserId");
const FollowIdValidator = require("../Middlewares/User/validateFollowId");

const UnfollowIdValidator = require("../Middlewares/User/validateUnfollowId");
const EditProfileValidator = require("../Middlewares/User/validateEditProfile");

router.get(
  "/user/:user_id",
  validateToken,
  UserIdValidator.userId(), //same custom class for all
  userController.getUser
);

router.put(
  "/user/:user_id",
  validateToken,
  UserIdValidator.userId(),
  EditProfileValidator.EditProfile(),
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
  validateToken,
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
  validateToken,
  UserIdValidator.userId(),
  userController.searchUser
);

module.exports = router;
