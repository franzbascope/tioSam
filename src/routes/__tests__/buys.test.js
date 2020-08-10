const request = require("supertest");
const app = require("../../../app");
let { buys } = require("../__mocks__/buys");
const connectMongo = require("../../lib/mongo");

describe("Buys Router Test", () => {
  it("/POST BUYS", async () => {
    const res = await request(app).post("/buys").send(buys);
    expect(res.statusCode).toEqual(201);
  });
  it("/POST BUYS FAIL", async () => {
    delete buys.date;
    const res = await request(app).post("/buys").send(buys);
    expect(res.statusCode).toEqual(422);
  });
  it("/GET BUYS", async () => {
    const res = await request(app).get("/buys").send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).not.toBeNull();
    expect(res.body.length).toEqual(1);
    buys = res.body[0];
  });
  it("/PUT BUYS", async () => {
    const res = await request(app).get(`/buys/${buys._id}`).send();
    expect(res.statusCode).toEqual(200);
  });
  it("/PUT BUYS FAIL", async () => {
    const res = await request(app).get(`/buys/0`).send();
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBeDefined();
  });
  it("/UPDATE BUYS", async () => {
    buys.taxes = 123;
    const res = await request(app).put(`/buys/${buys._id}`).send(buys);
    expect(res.statusCode).toEqual(200);
    expect(res.body).not.toBeNull();
    expect(res.body.taxes).toEqual(123);
  });
  it("/UPDATE BUYS FAIL", async () => {
    const res = await request(app).put(`/buys/0`).send(buys);
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBeDefined();
    //console.log(res.body.message);
  });
  it("/DELETE BUYS", async () => {
    const res = await request(app).delete(`/buys/${buys._id}`).send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).not.toBeNull();
  });
  it("/DELETE BUYS FAIL", async () => {
    const res = await request(app).delete(`/buys/0`).send();
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBeDefined();
  });
  
});
