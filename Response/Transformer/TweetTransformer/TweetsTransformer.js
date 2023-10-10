class TweetsTransformer {
  static transform(tweets) {
    return tweets.map((tweet) => {
      console.log(tweet);
      return {
        name: tweet["users.name"],
        username: tweet["users.username"],
        date: tweet["createdAt"],
        tweet: tweet["tweet"],
      };
    });
  }
}

module.exports = TweetsTransformer;
