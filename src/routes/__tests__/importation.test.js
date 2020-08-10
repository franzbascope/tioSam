const request = require("supertest");
const app = require("../../../app");
let { importation } = require("../__mocks__/importation");
const route = "importations"

describe("Importation Router Test", () => {
  it("/POST IMPORTATION", async () => {
    const res = await request(app).post(`/${route}`).send(importation);
    expect(res.statusCode).toEqual(201);
  });
  it("/POST IMPORTATION FAIL", async () => {
    delete importation.date;
    const res = await request(app).post(`/${route}`).send(importation);
    expect(res.statusCode).toEqual(422);
  });
  it("/GET IMPORTATION ", async () => {
    const res = await request(app).get(`/${route}`).send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).not.toBeNull();
    expect(res.body.length).toEqual(1);
    importation = res.body[0];
  });
  it("/PUT IMPORTATION ", async () => {
    const res = await request(app).get(`/${route}/${importation._id}`).send();
    expect(res.statusCode).toEqual(200);
  });
  it("/PUT IMPORTATION  FAIL", async () => {
    const res = await request(app).get(`/${route}/0`).send();
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBeDefined();
  });
  it("/UPDATE IMPORTATION  ", async () => {
    importation.shipping_real_kg = 123;
    const res = await request(app).put(`/${route}/${importation._id}`).send(importation);
    expect(res.statusCode).toEqual(200);
    expect(res.body).not.toBeNull();
    expect(res.body.shipping_real_kg).toEqual(123);
  });
  it("/UPDATE IMPORTATION   FAIL", async () => {
    const res = await request(app).put(`/${route}/0`).send(importation);
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBeDefined();
    //console.log(res.body.message);
  });
  it("/DELETE IMPORTATION  ", async () => {
    const res = await request(app).delete(`/${route}/${importation._id}`).send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).not.toBeNull();
  });
  it("/DELETE IMPORTATION   FAIL", async () => {
    const res = await request(app).delete(`/${route}/0`).send();
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBeDefined();
  });
  
});
