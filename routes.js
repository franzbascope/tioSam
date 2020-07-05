const indexRouter = require("./routes/index");
const productsRouter = require("./routes/products");
const sellsRouter = require("./routes/sells");
const authRouter = require("./routes/auth");

const Routes = (app) => {
  app.use("/", indexRouter);
  app.use("/products", productsRouter);
  app.use("/sells", sellsRouter);
  app.use("/auth", authRouter);
};

module.exports = Routes;
