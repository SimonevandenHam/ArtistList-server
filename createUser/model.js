const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define(
  "user",
  {
    email: {
      type: Sequelize.STRING,
      unique: true,
      notNull: true
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        min: {
          args: [6],
          msg: "Your password must be at least 6 characters long"
        },
        max: {
          args: [100],
          msg: "Your password can only be 100 characters long"
        },
        notNull: true
      }
    }
  },
  {
    tableName: "users"
  }
);
module.exports = User;