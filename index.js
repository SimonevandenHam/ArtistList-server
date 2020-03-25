const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const spotifyRouter = require("./spotify/router");

const app = express();

const corsMiddleware = cors();
app.use(corsMiddleware);

const parserMiddleware = bodyParser.json();
app.use(parserMiddleware);

app.get("/", (req, res) => res.send());

app.use(spotifyRouter);

const port = process.env.PORT || 4000;

function confirm() {
  console.log(`Listening on :${port}`);
}

app.listen(port, confirm);
