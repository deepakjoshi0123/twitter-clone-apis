const db = require("./db.js");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(db.DB, db.USER, db.PASSWORD, {
  host: db.HOST,
  dialect: db.dialect,
});

module.exports = sequelize;
