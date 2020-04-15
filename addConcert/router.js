const { Router } = require("express");

const Artist = require("../addArtist/model");
const User = require("../createUser/model");
const Concert = require("./model");
const auth = require("../userLogin/loginMiddelware");

const router = new Router();

router.post("/concert", auth, async (request, response, next) => {
  try {
    // Creating concert
    const { date, endDate, location, venue } = request.body.concert;
    const enity = { date, endDate, location, venue };
    const newConcert = await Concert.create(enity);

    //creating, and remembering artistis
    let databaseArtists = await Promise.all(
      request.body.artist.map(async (artist) => {
        return await Artist.create(artist);
      })
    );

    //add artists to concert
    databaseArtists.map((dbArtist) => {
      newConcert.addArtist(dbArtist.id);
    });

    //DO NEXT use actual user id of signed in user
    const dbUser = await User.findByPk(request.user.id);
    dbUser.addConcert(newConcert.id);
    response.send(newConcert);
  } catch (error) {
    next(error);
  }
});

router.get("/concert/:concertId", auth, async (request, response, next) => {
  try {
    const { concertId } = request.params;

    const query = {
      include: [Artist],
    };
    const getConcert = await Concert.findByPk(concertId, query);
    response.send(getConcert);
  } catch (error) {
    next(error);
  }
});

router.get("/concerts/", auth, async (request, response, next) => {
  try {
    const userId = request.user.id;

    await Concert.findAll({
      where: {
        userId: userId,
      },
      include: [Artist],
    }).then((concerts) => {
      console.log(concerts);
      response.send(concerts);
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/concert/:concertId", (request, response, next) => {
  try {
    Concert.destroy({
      where: { id: request.params.concertId },
    }).then((concert) => response.send({ concert }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
