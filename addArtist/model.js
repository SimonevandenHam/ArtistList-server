const Sequelize = require("sequelize");
const db = require("../db");

const Arist = db.define(
  "artist",
  {
    artist: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    spotifyArtistId: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    artistPicture: {
      type: Sequelize.TEXT,
    },
    spotifyLink: {
      type: Sequelize.TEXT,
    },
  },
  {
    tableName: "artist",
  }
);

module.exports = Arist;
