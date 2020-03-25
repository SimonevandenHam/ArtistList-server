const SpotifyWebApi = require("spotify-web-api-node");
const { Router } = require("express");

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

router.get("/spotify/result", (request, response, next) => {
  try {
    console.log("IM I HEREEE?");
    const credentials = {
      clientId: `3939a9d8a4f84057a149d1bd72e67e7c`,
      clientSecret: `0e73ca0c5fe2406bbb983b88ee66cd16`,
      redirectUri: "http://localhost:4000/spotify/res"
    };

    const spotifyApi = new SpotifyWebApi(credentials);

    // The code that's returned as a query parameter to the redirect URI
    const code = `AQBj_MyNecZn1CqMwoedWTiSHyqpfMprQJgXNOJ0lZ8t3Ne840d_cY5I3AKDDVcKywO5diDA7cUd6iAeSla33h9uqg8tA6z4C4Lsu9x_WUEKzeJ_tZR2J-N2v-SZXLnfzMZh61GL97BSXn9l34E_UYBPXLWEciW8mFpxPuhR2I4MTYLX5jMC3hvAaXVgxFoZ7fjSMa15x9cZYmbmSifRzNPtDjgYsTnRKuLV1lY3mQ4bUCuSnHBFrWVHag`;

    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code).then(
      function(data) {
        console.log("The token expires in " + data.body["expires_in"]);
        console.log("The access token is " + data.body["access_token"]);
        console.log("The refresh token is " + data.body["refresh_token"]);

        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body["access_token"]);
        spotifyApi.setRefreshToken(data.body["refresh_token"]);
      },
      function(err) {
        console.log("Something went wrong!", err);
      }
    );
  } catch (error) {
    next(error);
  }
});

//1. zoekvariabele meegeven in url (artiest)
//2. die variable ook aan de search meegeven
//3. resultaten vanspoitfy teruggeven aan frontend
router.get("/spotify/new", async (request, response, next) => {
  try {
    var spotifyApi = new SpotifyWebApi({
      accessToken:
        "BQBtXl_YP4EFGd9YzA_D72Pv2YPyiYpZqxUsvjtSm--vpwBmLXbrEPS4X8Nlr5si2_Ovt_qqpHe2qM4jYSh1AzE-9oSyzHuWRj2yFTLggZWfu6Dh-m7ttN6SmbKj7c3j07Jg0exYKI-w4Y8_3udELtfX0TbGbqOK_MIRiUpIBqXOerVN4w"
    });
    // const artist = await spotifyApi.searchTracks("artist:Love")(
    //   response.send(artist)
    // );
    // Do search using the access token
    spotifyApi.searchArtists("Love").then(
      function(data) {
        console.log(data.body);
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
