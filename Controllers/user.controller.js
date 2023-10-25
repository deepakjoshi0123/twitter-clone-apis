const {
  responsedWithSuccess,
  responsedWithSuccessMessage,
  responsedWithErrorMessage,
} = require("../Response/response");

const FollowingTransformer = require("../Response/Transformer/UserTransformer/FollowingTransformer");
const FollowerTransformer = require("../Response/Transformer/UserTransformer/FollowerTransformer");

const UserService = require("../Services/userService");

class UserController {
  async getUser(req, res) {
    const user = await UserService.getUser(req.params.user_id, res);

    user
      ? responsedWithSuccess(res, 200, user)
      : responsedWithErrorMessage(res, 400, "user not found");
  }

  async updateProfile(req, res) {
    const isUpdated = await UserService.updateProfile(req, res);

    isUpdated
      ? responsedWithSuccessMessage(res, 200, "Profile updated successfully")
      : responsedWithErrorMessage(res, 400, "User not found");
  }

  async follow(req, res) {
    const isFollowed = await UserService.follow(req, res);

    isFollowed
      ? responsedWithSuccessMessage(res, 200, "Followed successfully")
      : responsedWithErrorMessage(res, 400, "Can't follow this user");
  }
  // this can handle unfollow and and removing follower both
  // handle validation that 1 shouldn't follow 1 itself
  async unFollow(req, res) {
    const isUnfollowed = await UserService.unFollow(req, res);

    isUnfollowed
      ? responsedWithSuccessMessage(res, 200, "UnFollowed successfully")
      : responsedWithErrorMessage(res, 400, "Can't unfollow this user");
  }

  async getfollowings(req, res) {
    const followingsRes = await UserService.getfollowings(req);

    const followings = FollowingTransformer.transform(followingsRes.rows);

    responsedWithSuccess(res, 200, {
      totalCount: followingsRes.count,
      followings: followings,
    });
  }

  async getfollowers(req, res) {
    const followersRes = await UserService.getfollowers(req, res);

    const followers = FollowerTransformer.transform(
      followersRes.followers.rows,
      followersRes.followings.rows
    );

    responsedWithSuccess(res, 200, {
      totalCount: followersRes.followers.count,
      followers: followers,
    });
  }

  async getUserRecommendation(req, res) {
    const users = await UserService.getUserRecommendation(req, res);
    responsedWithSuccess(res, 200, users);
  }

  async searchUser(req, res) {
    const users = await UserService.searchUser(req, res);
    responsedWithSuccess(res, 200, users);
  }
}

module.exports = new UserController();
