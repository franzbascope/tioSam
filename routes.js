const indexRouter = require("./routes/index");
const productsRouter = require("./routes/products");

const Routes = (app) => {
  app.use("/", indexRouter);
  app.use("/products", productsRouter);
};

module.exports = Routes;
