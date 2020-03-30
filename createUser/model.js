const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define(
  "user",
  {
    email: {
      type: Sequelize.TEXT,
      unique: true,
      allowNull: false,
      isEmail: true
    },
    password: {
      type: Sequelize.TEXT,
      validate: {
        min: {
          args: [6],
          msg: "Your password must be at least 6 characters long"
        },
        max: {
          args: [100],
          msg: "Your password can only be 100 characters long"
        }
      },
      allowNull: false
    }
  },
  {
    tableName: "users"
  }
);
module.exports = User;
