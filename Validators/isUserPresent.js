const { user } = require("../Config/index");

const isUserPresent = async (userId) => {
  const existingUser = await user.findOne({ where: { id: userId } });

  if (existingUser === null) {
    throw new Error("User not found for given id");
  }
};

module.exports = isUserPresent;
