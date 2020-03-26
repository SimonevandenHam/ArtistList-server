const { Router } = require("express");

const Artist = require("../addArtist/model");
const Concert = require("./model");
const auth = require("../userLogin/loginMiddelware");

const router = new Router();

router.post(
  "/concert",
  /*auth,*/ async (request, response, next) => {
    try {
      // Creating concert
      const { date, endDate, location, venue } = request.body.concert;
      const enity = { date, endDate, location, venue };
      const newConcert = await Concert.create(enity);

      //creating, and remembering artistis
      let databaseArtists = await Promise.all(
        request.body.artist.map(async artist => {
          return await Artist.create(artist);
        })
      );

      //add artists to concert
      databaseArtists.map(dbArtist => {
        newConcert.addArtist(dbArtist.id);
      });

      response.send(newConcert);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
