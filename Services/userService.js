const { user, follow } = require("../Config/index");
const { Op } = require("sequelize");

const FollowingTransformer = require("../Response/Transformer/UserTransformer/FollowingTransformer");
const FollowerTransformer = require("../Response/Transformer/UserTransformer/FollowerTransformer");
const RecommendationTransformer = require("../Response/Transformer/UserTransformer/RecommendationTransformer");
//check if can if can update profile in little diff way
// db constraints
class UserService {
  async getUser(userId, res) {
    const existingUser = await user.findOne({
      where: { id: userId },
      attributes: ["id", "email", "username", "bio", "name", "phone", "DOB"],
    });

    return existingUser ? existingUser : null;
  }

  async updateProfile(req, res) {
    const { username, bio, phone, DOB } = req.body;

    const existingUser = await user.findByPk(req.params.user_id);

    if (existingUser) {
      existingUser.bio = bio ? bio : existingUser.bio;
      existingUser.username = username ? username : existingUser.username;
      existingUser.DOB = DOB ? DOB : existingUser.DOB;
      existingUser.phone = phone ? phone : existingUser.phone;

      await existingUser.save();

      return true;
    }

    return false;
  }

  async follow(req, res) {
    const followerId = req.params.user_id;
    const followingId = req.params.follow_user_id;

    const [fol, created] = await follow.findOrCreate({
      where: {
        followerId,
        followingId,
      },
    });

    return created ? true : false;
  }

  async unFollow(req, res) {
    const followerId = req.params.user_id;
    const followingId = req.params.unfollowed_user_id;

    const deletedCount = await follow.destroy({
      where: {
        followerId,
        followingId,
      },
    });

    return deletedCount > 0 ? true : false;
  }

  async getfollowings(req, res) {
    const followings = await follow.findAll({
      where: {
        followerId: req.params.user_id,
      },
      include: [
        {
          model: user, // Include the User model
          as: "following", // Alias for the following relationship
          // attributes: ["name", "username"], // Specify the attributes to retrieve
        },
      ],
      raw: true,
    });

    return FollowingTransformer.transform(followings);
  }

  async getfollowers(req, res) {
    const followers = await follow.findAll({
      where: {
        followingId: req.params.user_id,
      },
      include: [
        {
          model: user,
          as: "follower",
          // attributes: ["name", "username"],
        },
      ],

      raw: true,
    });
    const followings = await this.getfollowings(req, res);

    return FollowerTransformer.transform(followers, followings);
  }

  async getUserRecommendation(req, res) {
    const followings = await this.getfollowings(req, res);

    const ids = followings.map((following) => following.id);
    ids.push(parseInt(req.params.user_id));

    const recommendations = await user.findAll({
      where: {
        id: {
          [Op.notIn]: ids,
        },
      },
    });

    return RecommendationTransformer.transform(recommendations.slice(0, 7));
  }

  async searchUser(req, res) {
    const searchTerm = req.params.search_query;

    const users = await user.findAll({
      where: {
        [Op.or]: [
          {
            username: {
              [Op.like]: `%${searchTerm}%`, // Case-insensitive search for username
            },
          },
          {
            name: {
              [Op.like]: `%${searchTerm}%`, // Case-insensitive search for name
            },
          },
          {
            email: {
              [Op.like]: `%${searchTerm}%`, // Case-insensitive search for email
            },
          },
        ],
      },
    });

    return users;
  }
}

module.exports = new UserService();
