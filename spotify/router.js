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

    // https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
    console.log(authorizeURL);
    response.send(authorizeURL);
  } catch (error) {
    next(error);
  }
});

//1. zoekvariabele meegeven in url (artiest)
//2. die variable ook aan de search meegeven
//3. resultaten vanspoitfy teruggeven aan frontend
router.get("/spotify/artist", async (request, response, next) => {
  try {
    const accessToken = await getValidAccessToken();
    console.log("accessToken", accessToken);
    const spotifyApi = new SpotifyWebApi({
      accessToken: accessToken
    });
    //NEXTUP change searchArtitst to input from addEvent

    spotifyApi.searchArtists("arctic monkeys").then(
      function(data) {
        console.log(data.body);
      },
      function(err) {
        console.log("Something went wrong!", err);
      }
    );

    console.log(accessToken);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
