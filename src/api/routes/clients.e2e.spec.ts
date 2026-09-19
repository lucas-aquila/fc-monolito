import {app, sequelize} from "../express";
import request from "supertest";

describe("E2E/API tests for client", () => {
  beforeEach(async () => {
    await sequelize.sync({force: true});
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should creates a client", async () => {
    const input = {
      name: 'Ana Paula Costa',
      document: '55566677788',
      email: 'ana@teste.com',
      street: "Rua das Palmeiras",
      number: "742",
      complement: "Bloco B",
      city: "Campinas",
      state: "sp",
      zipCode: "13000-000",
    };
    const response = await request(app)
      .post("/clients")
      .send(input);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(input.name);
    expect(response.body.document).toBe(input.document);
    expect(response.body.email).toBe(input.email);
    expect(response.body.street).toBe(input.street)
    expect(response.body.number).toBe(input.number)
    expect(response.body.complement).toBe(input.complement)
    expect(response.body.city).toBe(input.city)
    expect(response.body.state).toBe(input.state)
    expect(response.body.zipCode).toBe(input.zipCode)
  });
});