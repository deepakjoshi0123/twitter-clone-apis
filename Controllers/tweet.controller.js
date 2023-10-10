const TweetService = require("../Services/tweetService");

const {
  responsedWithSuccess,
  responsedWithSuccessMessage,
} = require("../Response/response");

class TweetController {
  async addTweet(req, res) {
    await TweetService.addTweet(req);
    responsedWithSuccessMessage(res, 200, "Tweet added Successfully");
  }

  async getTweets(req, res) {
    const tweets = await TweetService.getTweets(req.params.user_id);
    responsedWithSuccess(res, 200, tweets);
  }

  async getTimeline(req, res) {
    const tweets = await TweetService.getTimeline(req.params.user_id);
    responsedWithSuccess(res, 200, tweets);
  }
}

module.exports = new TweetController();
