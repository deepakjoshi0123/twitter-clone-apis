const { user } = require("../Config/index");

const BaseService = require("../Services/baseService");

const isUsernameExists = async (username, Meta) => {
  const existingUsername = await user.findOne({ where: { username } });

  if (existingUsername && existingUsername.id !== BaseService.id(Meta.req)) {
    throw Error("username already in use");
  }
  return existingUsername !== null;
};

const isUsernameAvailable = async (username) => {
  const existingUsername = await user.findOne({ where: { username } });

  if (existingUsername) {
    throw Error("username already in use");
  }

  return existingUsername !== null;
};

module.exports = { isUsernameExists, isUsernameAvailable };
