const { user, follow } = require("../Config/index");
const { Op } = require("sequelize");

const BaseService = require("./baseService");

const RecommendationTransformer = require("../Response/Transformer/UserTransformer/RecommendationTransformer");

class UserService {
  async getUser(userId, res) {
    const existingUser = await user.findOne({
      where: { id: BaseService.id(req) },
      attributes: ["id", "email", "username", "bio", "name", "phone", "DOB"],
    });

    return existingUser ? existingUser : null;
  }

  async updateProfile(req, res) {
    const { username, bio, phone, DOB } = req.body;

    const existingUser = await user.findByPk(BaseService.id(req));

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
    const followerId = BaseService.id(req);
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
    const followerId = BaseService.id(req);
    const followingId = req.params.unfollowed_user_id;

    const deletedCount = await follow.destroy({
      where: {
        followerId,
        followingId,
      },
    });

    return deletedCount > 0 ? true : false;
  }

  async getfollowings(req) {
    const followings = await follow.findAndCountAll({
      where: {
        followerId: BaseService.id(req),
      },
      include: [
        {
          model: user, // Include the User model
          as: "following", // Alias for the following relationship
        },
      ],
      raw: true,
    });

    return followings;
  }

  async getfollowers(req, res) {
    const followers = await follow.findAndCountAll({
      where: {
        followingId: req.params.user_id,
      },
      include: [
        {
          model: user,
          as: "follower",
        },
      ],

      raw: true,
    });
    const followings = await this.getfollowings(req);

    return { followers, followings };
  }

  async getUserRecommendation(req, res) {
    const followings = await this.getfollowings(req, res);

    const ids = followings.rows.map((following) => {
      return following.followingId;
    });

    ids.push(parseInt(BaseService.id(req)));

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

    console.log(searchTerm);
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
