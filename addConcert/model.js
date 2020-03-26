const Sequelize = require("sequelize");
const db = require("../db");

const Artist = require("../AddArtist/model");
const User = require("../createUser/model");

const Concert = db.define(
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
Artist.belongsTo(Concert);
Concert.hasMany(Artist);

Concert.belongsTo(User);
User.hasMany(Concert);

module.exports = Concert;
