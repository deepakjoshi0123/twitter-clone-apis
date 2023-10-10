class FollowingTransformer {
  static transform(followings) {
    return followings.map((following) => {
      return {
        id: following["following.id"],
        name: following["following.name"],
        username: following["following.username"],
      };
    });
  }
}

module.exports = FollowingTransformer;
