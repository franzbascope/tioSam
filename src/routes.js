const indexRouter = require("./routes/index");
const productsRouter = require("./routes/products");
const importationsRouter = require("./routes/importations");
const buysRouter = require("./routes/buys");
const sellsRouter = require("./routes/sells");
const authRouter = require("./routes/auth");
const companyRouter = require("./routes/companies");
const passport = require("passport");

// JWT strategy
require("./services/auth/jwt");

const Routes = (app) => {
  //not required auth routes
  app.use("/auth", authRouter);
  app.use("/", indexRouter);

  //requiring auth routes
  app.use("/products", productsRouter);
  app.use("/buys", buysRouter);
  app.use("/importations", importationsRouter);
  app.use(
    "/sells",
    passport.authenticate("jwt", { session: false }),
    sellsRouter
  );
  app.use(
    "/companies",
    passport.authenticate("jwt", { session: false }),
    companyRouter
  );
};

module.exports = Routes;
