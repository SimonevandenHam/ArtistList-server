const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define(
  "user",
  {
    email: {
      type: Sequelize.TEXT,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
      notEmpty: true
    }
  },
  {
    tableName: "users"
  }
);
module.exports = User;
