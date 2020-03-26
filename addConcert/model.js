const Sequelize = require("sequelize");
const db = require("../db");

const AddArtist = require("../AddArtist/model");

const AddConcert = db.define(
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


module.exports = AddConcert;

