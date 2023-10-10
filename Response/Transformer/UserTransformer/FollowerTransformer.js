class FollowerTransformer {
  static transform(followers, followings) {
    // return [followers, followings];
    const followMap = {};
    followings.forEach((item) => {
      followMap[item.id] = true;
    });

    return followers.map((follower) => {
      return {
        id: follower["follower.id"],
        name: follower["follower.name"],
        username: follower["follower.username"],
        isFollow: follower["follower.id"] in followMap,
      };
    });
  }
}

module.exports = FollowerTransformer;
