const indexRouter = require("./routes/index");
const productsRouter = require("./routes/products");
const sellsRouter = require("./routes/sells");
const authRouter = require("./routes/auth");
const passport = require("passport");

// JWT strategy
require("./services/auth/jwt");

const Routes = (app) => {
  //not required auth routes
  app.use("/auth", authRouter);
  app.use("/", indexRouter);

  //requiring auth routes
  app.use("/products", productsRouter);
  app.use(
    "/sells",
    passport.authenticate("jwt", { session: false }),
    sellsRouter
  );
};

module.exports = Routes;
