class TweetsTransformer {
  static transform(tweets) {
    const timeline = tweets.map((tweet) => {
      return {
        name: tweet["users.name"],
        username: tweet["users.username"],
        date: tweet["createdAt"],
        tweet: tweet["tweet"],
      };
    });

    return timeline;
  }
}

module.exports = TweetsTransformer;
