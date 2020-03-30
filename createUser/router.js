const { Router } = require("express");
const bcrypt = require("bcrypt");

const User = require("./model");

const router = Router();

router.post("/user", async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (password === "") {
      response.status(400).send({
        message: "password can not be empty"
      });
    } else {
      const scrambled = bcrypt.hashSync(password, 10);
      const entity = { email, password: scrambled };
<<<<<<< HEAD
      const user = await User.create(entity);
      response.send(user);
=======

      try {
        const user = await User.create(entity);

        response.send(user);
      } catch (error) {
        response.send({ error: "values not valid" });
      }
>>>>>>> 5d4cbd46b09523e0c5ebe61daf2e5c42e221ad8e
    }
  } catch (error) {
    next(error);
  }
});

router.get("/user/:id"),
  async (request, response, next) => {
    try {
      const { id } = request.params;

      const singleUser = await User.findByPk(id);
      response.send(singleUser);
    } catch (eroor) {
      next(error);
    }
  };

module.exports = router;
