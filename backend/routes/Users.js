const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createToken } = require("./../createTokenAux");

router.post("/register", async (req, res) => {
  const { login, name, password, phone, email, cpf } = req.body;

  bcrypt
    .hash(password, 10)
    .then(async (hash) => {
      await Users.create({
        name,
        password: hash,
        login,
        phone,
        email,
        cpf,
      });

      res.json({
        message: "success",
      });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

router.post("/login", async (req, res) => {
  const { login, password } = req.body;

  const user = await Users.findOne({ where: { login: login } });

  if (user === null || user === undefined) {
    res.status(400).json({
      error: "User doesn't exist",
    });
  } else {
    // console.log(user);
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.status(400).json({
          error: "Wrong login and password combination",
        });
      } else {
        const accessToken = createToken(user);

        // req.session.user = user;
        res.json({
          data: {
            token: accessToken,
            user: {
              id: user.id,
              name: user.name,
              login: user.login,
              email: user.email,
              cpf: user.cpf,
              phone: user.phone,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            },
          },
        });
      }
    });
  }
});

module.exports = router;
