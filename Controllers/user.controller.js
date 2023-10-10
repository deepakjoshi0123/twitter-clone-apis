// code structrue ----> check

const {
  responsedWithSuccess,
  responsedWithSuccessMessage,
  responsedWithErrorMessage,
} = require("../Response/response");

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
    const followings = await UserService.getfollowings(req, res);
    responsedWithSuccess(res, 200, followings);
  }
  async getfollowers(req, res) {
    const followers = await UserService.getfollowers(req, res);
    responsedWithSuccess(res, 200, followers);
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
