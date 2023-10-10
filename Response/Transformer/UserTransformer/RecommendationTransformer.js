class RecommendationTransformer {
  static transform(followings) {
    return followings.map((following) => {
      return {
        id: following["id"],
        name: following["name"],
        username: following["username"],
      };
    });
  }
}

module.exports = RecommendationTransformer;
