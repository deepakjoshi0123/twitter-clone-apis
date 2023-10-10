const { sequelize, Sequelize } = require("../Config/db.js");

module.exports = (sequelize) => {
  const Follow = sequelize.define("Follow", {
    // No need to define 'id' here, as Sequelize will automatically create it as an auto-incrementing primary key
    // 'followerId' and 'followingId' will reference the 'id' of User model
    followerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    followingId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Follow;
};
