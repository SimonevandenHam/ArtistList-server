const Sequelize = require("sequelize");
const db = require("../db");

const AddArist = db.define(
  "artist",
  {
    artist: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    tableName: "artist"
  }
);

//RELATIONS

module.exports = AddArist;
