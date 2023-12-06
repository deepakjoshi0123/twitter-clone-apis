const { user } = require("../Config/index");
const jwt = require("jsonwebtoken");
const BaseService = require("../Services/baseService");
const expressValidator = require("express-validator");
const Meta = expressValidator.Meta;

const isUsernameExists = async (username) => {
  //check it ...
  const existingUsername = await user.findOne({ where: { username } });

  if (existingUsername && existingUsername.id !== BaseService.id()) {
    throw Error("username already in use");
  } else if (existingUsername) {
    throw Error("username already in use");
  }

  return existingUsername !== null;
};

module.exports = isUsernameExists;
