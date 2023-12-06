const UserModel = require("../Models/user.model.js")(sequelize);
const TweetModel = require("../Models/tweet.model.js")(sequelize);
const FollowModel = require("../Models/follow.model.js")(sequelize);

// Define associations

UserModel.hasMany(TweetModel, { foreignKey: "userId", as: "tweets" }); // Alias added here
TweetModel.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "users",
  onDelete: "CASCADE",
});

// Many-to-Many association between users through the Follow model
UserModel.belongsToMany(UserModel, {
  as: "followers",
  through: FollowModel,
  foreignKey: "followingId",
  otherKey: "followerId",
});

UserModel.belongsToMany(UserModel, {
  as: "following",
  through: FollowModel,
  foreignKey: "followerId",
  otherKey: "followingId",
});

FollowModel.belongsTo(UserModel, {
  as: "follower",
  foreignKey: "followerId",
});

FollowModel.belongsTo(UserModel, {
  as: "following", // Add alias here
  foreignKey: "followingId",
});
