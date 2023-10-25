const TweetService = require("../Services/tweetService");
const TweetsTransformer = require("../Response/Transformer/TweetTransformer/TweetsTransformer");

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
    const tweetsRes = await TweetService.getTweets(req);

    const tweets = TweetsTransformer.transform(tweetsRes.rows);

    responsedWithSuccess(res, 200, {
      totalCount: tweetsRes.count,
      tweets: tweets,
    });
  }

  async getTimeline(req, res) {
    const tweetsRes = await TweetService.getTimeline(req);
    const tweets = TweetsTransformer.transform(tweetsRes.rows);

    responsedWithSuccess(res, 200, {
      totalCount: tweetsRes.count,
      tweets: tweets,
    });
  }
}

module.exports = new TweetController();
