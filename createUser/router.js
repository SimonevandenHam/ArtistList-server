const { Router } = require("express");
const bcrypt = require("bcrypt");

const User = require("./model");

const router = Router();

router.post("/user", async (request, response, next) => {
  try {
    const { name, password } = request.body;

    const scrambled = bcrypt.hashSync(password, 10);

    const entity = { name, password: scrambled };

    const user = await User.create(entity);

    response.send(user);
  } catch (error) {
    next(error);
  }
});

router.get("/user/:id"),
  async (request, response, next) => {
    try {
      const { id } = request.params;

      const query = {
        include: [Tickets, Comment]
      };

      const singleUser = await User.findByPk(id, query);
      response.send(singleUser);
    } catch (eroor) {
      next(error);
    }
  };

module.exports = router;
