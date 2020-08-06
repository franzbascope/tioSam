const request = require("supertest");
const app = require("../../../app");

describe("Products Router Test", () => {
  it("/GET PRODUCTS", async () => {
    const res = await request(app).get("/products").send();
    expect(res.statusCode).toEqual(200);
  });
});
