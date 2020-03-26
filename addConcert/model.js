const Sequelize = require("sequelize");
const db = require("../db");

const addConcert = db.define(
  "concert",
  {
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    venue: {
      type: Sequelize.STRING,
      allowNull: false
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    tableName: "concert"
  }
);

//RELATIONS

module.exports = addConcert;
