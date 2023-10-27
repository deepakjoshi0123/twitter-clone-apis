const { sequelize, Sequelize } = require("../Config/db.js");

module.exports = (sequelize) => {
  const Follow = sequelize.define("Follow", {
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
