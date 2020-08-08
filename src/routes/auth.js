const express = require("express");
const passport = require("passport");
const boom = require("boom");
const jwt = require("jsonwebtoken");

const { config } = require("../config/index");

// Basic strategy
require("../services/auth/authBasicStrategy");

function apiAuth(app) {
  const api = express.Router();
  app.use("/auth", api);
  api.post("/login", async function (req, res, next) {
    passport.authenticate("basic", function (error, user) {
      try {
        if (error || !user) {
          next(error);
          return;
        }
        req.login(user, { session: false }, async function (error) {
          if (error) {
            next(boom.unauthorized());
          }

          const payload = { email: user.email, name: user.name, id: user._id };
          const token = jwt.sign(payload, config.authJWT, {
            expiresIn: "15m",
          });

          return res.status(200).json({ access_token: token });
        });
      } catch (error) {
        next(boom.badImplementation(error));
      }
    })(req, res, next);
  });
}

module.exports = apiAuth;
