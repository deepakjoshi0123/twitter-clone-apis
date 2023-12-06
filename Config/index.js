// index.js

const db = require("./db.js");
const { Sequelize } = require("sequelize");
const sequelize = require("./dbConnect.js");

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const UserModel = require("../Models/user.model.js")(sequelize);
const TweetModel = require("../Models/tweet.model.js")(sequelize);
const FollowModel = require("../Models/follow.model.js")(sequelize);

db.tweet = TweetModel;
db.user = UserModel;
db.follow = FollowModel;

module.exports = db;
