const { tweet, follow, user } = require("../Config/index");

const BaseService = require("./baseService");
const TweetsTransformer = require("../Response/Transformer/TweetTransformer/TweetsTransformer");

class TweetService {
  constructor() {}
  async addTweet(req) {
    await tweet.create({
      userId: BaseService.id(req),
      tweet: req.body.tweet,
    });
  }

  async getTweets(req) {
    let userId = BaseService.id(req);

    let queryOptions = {
      where: { userId },
      include: [
        {
          model: user,
          as: "users",
          attributes: ["username", "name"],
        },
      ],
      order: [["createdAt", "DESC"]],
      raw: true,
    };

    queryOptions = this.applyPagination(queryOptions, req);

    const tweets = await tweet.findAndCountAll(queryOptions);
    return tweets;
  }

  async getTimeline(req) {
    const followingIds = await this.getFollowingIds(BaseService.id(req));

    let queryOptions = {
      where: {
        userId: followingIds.map((item) => item.followingId),
      },
      include: [
        {
          model: user,
          as: "users",
          attributes: ["username", "name"],
        },
      ],
      order: [["createdAt", "DESC"]],
      raw: true,
    };

    queryOptions = this.applyPagination(queryOptions, req);

    const tweets = await tweet.findAndCountAll(queryOptions);
    return tweets;
  }

  async getFollowingIds(followerId) {
    return await follow.findAll({
      where: {
        followerId,
      },
      attributes: ["followingId"],
    });
  }

  applyPagination(queryOptions, req) {
    if (req.query.limit) {
      const limit = parseInt(req.query.limit);
      if (!isNaN(limit) && limit > 0) {
        queryOptions.limit = limit;
      }
    }

    if (req.query.offset) {
      const offset = parseInt(req.query.offset);
      if (!isNaN(offset) && offset >= 0) {
        queryOptions.offset = offset;
      }
    }

    return queryOptions;
  }
}

module.exports = new TweetService();
