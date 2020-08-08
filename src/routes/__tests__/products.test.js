const request = require("supertest");
const app = require("../../../app");
let { product } = require("../__mocks__/products");
const connectMongo = require("../../lib/mongo");

describe("Products Router Test", () => {
  it("/POST PRODUCTS", async () => {
    const res = await request(app).post("/products").send(product);
    expect(res.statusCode).toEqual(201);
  });
  it("/POST PRODUCTS FAIL", async () => {
    delete product.name;
    const res = await request(app).post("/products").send(product);
    expect(res.statusCode).toEqual(422);
  });
  it("/GET PRODUCTS", async () => {
    const res = await request(app).get("/products").send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).not.toBeNull();
    expect(res.body.length).toEqual(1);
    product = res.body[0];
  });

  it("/PUT PRODUCTS", async () => {
    const res = await request(app).get(`/products/${product._id}`).send();
    expect(res.statusCode).toEqual(200);
  });
  it("/PUT PRODUCTS FAIL", async () => {
    const res = await request(app).get(`/products/0`).send();
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBeDefined();
  });
  it("/UPDATE PRODUCTS", async () => {
    product.name = "changed_name";
    const res = await request(app)
      .put(`/products/${product._id}`)
      .send(product);
    expect(res.statusCode).toEqual(200);
    expect(res.body).not.toBeNull();
    expect(res.body.name).toEqual("changed_name");
  });
  it("/UPDATE PRODUCTS FAIL", async () => {
    const res = await request(app).put(`/products/0`).send({});
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBeDefined();
  });
  it("/DELETE PRODUCTS", async () => {
    const res = await request(app).delete(`/products/${product._id}`).send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).not.toBeNull();
  });
  it("/DELETE PRODUCTS FAIL", async () => {
    const res = await request(app).delete(`/products/0`).send();
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBeDefined();
  });
  it("/GET PRODUCTS FAIL", async () => {
    let db = connectMongo();
    db.close();
    const res = await request(app).get("/products").send();
    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toBeDefined();
  });
});
