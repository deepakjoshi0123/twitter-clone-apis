const express = require("express");
const router = express.Router();
const tweetController = require("../Controllers/tweet.controller");

const validateToken = require("../Middlewares/Auth/jwtMiddleware");

const TweetValidator = require("../Middlewares/Tweet/validateTweet");

router.post(
  "/user/:user_id/tweet",
  validateToken,
  TweetValidator.tweet(),
  tweetController.addTweet
);

router.get("/user/:user_id/tweets", validateToken, tweetController.getTweets);
router.get(
  "/user/:user_id/timeline",
  validateToken,
  tweetController.getTimeline
);

module.exports = router;
