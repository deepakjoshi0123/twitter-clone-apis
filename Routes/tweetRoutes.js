const express = require("express");
const router = express.Router();
const tweetController = require("../Controllers/tweet.controller");

const validateRequest = require("../Middlewares/validateRequest.js");

const validateToken = require("../Middlewares/Auth/jwtMiddleware");
const CreateTweetSchema = require("../Schemas/Tweets/createTweet.js");

const expressValidator = require("../Bootstrap/expressValidator.js");
const checkSchema = expressValidator.checkSchema;

router.post(
  "/user/tweet",
  // validateToken,
  checkSchema(CreateTweetSchema),
  validateRequest,
  tweetController.addTweet
);

router.get("/user/tweets", validateToken, tweetController.getTweets);
router.get(
  "/user/timeline",
  // validateToken,
  validateRequest,
  tweetController.getTimeline
);

module.exports = router;
