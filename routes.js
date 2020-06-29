const indexRouter = require("./routes/index");
const productsRouter = require("./routes/products");
const sellsRouter = require("./routes/sells");

const Routes = (app) => {
  app.use("/", indexRouter);
  app.use("/products", productsRouter);
  app.use("/sells", sellsRouter);
};

module.exports = Routes;
