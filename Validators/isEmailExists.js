const { user } = require("../Config/index");

const isEmailExists = async (email) => {
  console.log("check me ..email");
  if (email) {
    const existingUser = await user.findOne({ where: { email } });

    if (existingUser !== null) {
      throw Error("email already in use");
    }
  }
};

module.exports = isEmailExists;
