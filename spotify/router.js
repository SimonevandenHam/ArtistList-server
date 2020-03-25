const SpotifyWebApi = require("spotify-web-api-node");
const { Router } = require("express");
const spotifyToken = require("./tokenModel");
const { getValidAccessToken } = require("./tokenModel");

const router = Router();

router.get("/spotify", async (request, response, next) => {
  try {
    const scopes = ["user-read-private", "user-read-email"],
      redirectUri = "http://localhost:4000/spotify/res",
      clientId = `3939a9d8a4f84057a149d1bd72e67e7c`,
      state = "someState";
    // Create the api object with the credentials
    const spotifyApi = new SpotifyWebApi({
      redirectUri: redirectUri,
      clientId: clientId
    });
    // Create the authorization URL
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
    response.send(authorizeURL);
  } catch (error) {
    next(error);
  }
});

router.get("/spotify/:artist", async (request, response, next) => {
  try {
    const { artist } = request.params;
    const accessToken = await getValidAccessToken();
    const spotifyApi = new SpotifyWebApi({
      accessToken: accessToken
    });

    spotifyApi.searchArtists(artist).then(
      function(data) {
        console.log("which artist info am i getting?", data.body.artists);
      },
      function(err) {
        console.log("Something went wrong!", err);
      }
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
