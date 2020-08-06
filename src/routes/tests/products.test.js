const request = require("supertest");
const app = require("../../../app");

describe("Products Router Test", () => {
  it("/GET PRODUCTS", async () => {
    const res = await request(app).get("/products").send();
    expect(res.statusCode).toEqual(200);
  });
});

describe("Products Router Test", () => {
  it("/POST PRODUCTS", async () => {
    const res = await request(app).post("/products").send({
      name: "test",
      cost_dollars: "12",
      cost_bs: 12,
      weight: 11,
      price_bs: 1,
      company: "5f2be3ddce8fd4a76e32dc5d",
    });
    expect(res.statusCode).toEqual(201);
  });
});
