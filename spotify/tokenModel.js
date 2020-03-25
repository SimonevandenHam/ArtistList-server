const Sequelize = require("sequelize");
const db = require("../db");
const moment = require("moment");
const SpotifyWebApi = require("spotify-web-api-node");

const spotifyToken = db.define("spotifyToken", {
  expires_at: {
    type: Sequelize.DATE
  },
  access_token: {
    type: Sequelize.TEXT
  }
});

const getValidAccessToken = async () => {
  const token = await spotifyToken.findByPk(1);
  if (token.expires_at > moment()) {
    return token.access_token;
  } else {
    // Create the api object with the credentials
    const spotifyApi = new SpotifyWebApi({
      clientId: `3939a9d8a4f84057a149d1bd72e67e7c`,
      clientSecret: `0e73ca0c5fe2406bbb983b88ee66cd16`
    });

    // Retrieve an access token.
    spotifyApi.clientCredentialsGrant().then(
      async data => {
        const updatedToken = {
          expires_at: moment().add(data.body["expires_in"], "seconds"),
          access_token: data.body["access_token"]
        };
        const updated = await token.update(updatedToken);
        console.log("The access token expires in " + data.body["expires_in"]);
        console.log("The access token is " + data.body["access_token"]);
        return updated.access_token;
      },
      function(err) {
        console.log(
          "Something went wrong when retrieving an access token",
          err
        );
      }
    );
  }
};

module.exports = { spotifyToken, getValidAccessToken };
