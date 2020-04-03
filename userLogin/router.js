const { Router } = require("express");
const bcrypt = require("bcrypt");

const { toJWT, toData } = require("./jwt");
const User = require("../createUser/model");

const router = new Router();

router.post("/login", (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  if (!email || !password) {
    response.status(400).send({
      message: "Please supply a valid email and password"
    });
  }
  // find user based on email address
  User.findOne({
    where: {
      email: request.body.email
    }
  })
    .then(user => {
      if (!user) {
        response.status(400).send({
          message: "User with that email does not exist"
        });
      }
      // use bcrypt.compareSync to check the password against the stored hash
      else if (bcrypt.compareSync(request.body.password, user.password)) {
        // if the password is correct, return a JWT with the userId of the user (user.id)
        response.send({
          jwt: toJWT({ userId: user.id })
        });
      } else {
        res.status(400).send({
          message: "Password was incorrect"
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Something went wrong"
      });
    });
});

router.get("/secret-endpoint", (request, response) => {
  // do we have req.headers.authorization && if so: split the header on a space
  const auth =
    request.headers.authorization && request.headers.authorization.split(" ");
  // is auth something && is the first element a string "Bearer" && do we have a token
  if (auth && auth[0] === "Bearer" && auth[1]) {
    // verify the token and get me the information inside (toData(auth[1]))
    const data = toData(auth[1]);
    response.send({
      message: "Thanks for visiting the secret endpoint.",
      data
    });
  } else {
    response.status(401).send({
      message: "Please supply some valid credentials"
    });
  }
});

module.exports = router;
