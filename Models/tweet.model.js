const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Tweet = sequelize.define("Tweet", {
    tweet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Tweet;
};
