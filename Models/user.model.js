const { sequelize, Sequelize } = require("../Config/db.js");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    // User model attributes
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true, // This makes the 'id' field auto-incrementing
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    bio: {
      type: Sequelize.STRING,
    },
    DOB: {
      type: Sequelize.DATE,
    },
    phone: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
