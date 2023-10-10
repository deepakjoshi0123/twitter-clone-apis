const { tweet, follow, user } = require("../Config/index");

const TweetsTransformer = require("../Response/Transformer/TweetTransformer/TweetsTransformer");

class TweetService {
  async addTweet(req) {
    await tweet.create({
      userId: req.params.user_id,
      tweet: req.body.tweet,
    });
  }

  async getTweets(userId, res) {
    const tweets = await tweet.findAll({
      where: { userId },
      include: [
        {
          model: user, // Include the User model
          as: "users", // Use the correct alias defined in your association
          attributes: ["username", "name"], // Select the username and name attributes
        },
      ],
      raw: true,
    });
    return TweetsTransformer.transform(tweets);
  }

  async getTimeline(followerId) {
    const followingIds = await this.getFollowingIds(followerId);

    const tweets = await tweet.findAll({
      where: {
        userId: followingIds.map((item) => item.followingId),
      },
      include: [
        {
          model: user, // Include the User model
          as: "users", // Use the correct alias defined in your association
          attributes: ["username", "name"], // Select the username and name attributes
        },
      ],
      raw: true,
    });

    return TweetsTransformer.transform(tweets);
  }

  async getFollowingIds(followerId) {
    return await follow.findAll({
      where: {
        followerId,
      },
      attributes: ["followingId"],
    });
  }
}

module.exports = new TweetService();
