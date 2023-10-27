const { sequelize, Sequelize } = require("../Config/db.js");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
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
        unique: true, // Add a unique constraint to ensure uniqueness of 'email' values
      },
      username: {
        type: Sequelize.STRING,
        unique: true, // Add a unique constraint to ensure uniqueness of 'username' values
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
    },
    {
      indexes: [
        {
          unique: true, // Ensures uniqueness of the index
          fields: ["name"],
        },
        {
          unique: true,
          fields: ["email"],
        },
        {
          unique: true,
          fields: ["username"],
        },
      ],
    }
  );

  return User;
};
