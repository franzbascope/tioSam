const productsRouter = require("./routes/products");
const importationsRouter = require("./routes/importations");
const buysRouter = require("./routes/buys");
const sellsRouter = require("./routes/sells");
const clientsRouter = require("./routes/clients");
const authRouter = require("./routes/auth");
const passport = require("passport");
const companiesApi = require("./routes/companies");
const express = require("express");

// JWT strategy
require("./services/auth/jwt");

const Routes = (app) => {
  //not required auth routes
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Hello Samuel",
    });
  });
  productsRouter(app);
  importationsRouter(app);
  buysRouter(app);
  authRouter(app);

  // needs authentication routes
  authenticatedRoutes(app);
};

const authenticatedRoutes = (app) => {
  const router = express.Router();
  app.use("/", passport.authenticate("jwt", { session: false }), router);
  //requiring auth routes
  companiesApi(app);
  sellsRouter(app);
  clientsRouter(app);
};

module.exports = Routes;
