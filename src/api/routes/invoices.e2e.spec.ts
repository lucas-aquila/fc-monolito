import {app} from "../express";
import request from "supertest";
import {Sequelize} from 'sequelize-typescript';
import {InvoiceModel} from '../../modules/invoice/repository/invoice.model';
import {InvoiceItemModel} from '../../modules/invoice/repository/invoice-item.model';

describe("E2E/API tests for invoice", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: {force: true},
    });

    sequelize.addModels([InvoiceModel, InvoiceItemModel]);

    await sequelize.sync({force: true});
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should creates and gets an invoice", async () => {
    const invoiceCreated = await request(app)
      .post("/invoice")
      .send({
        name: "Nota Fiscal 2026",
        document: "11122233344",
        street: "Rua das Flores",
        number: "321",
        complement: "Apartamento 8",
        city: "Vitória",
        state: "ES",
        zipCode: "29000-000",
        items: [
          {
            id: "1",
            name: "Teclado Mecânico",
            price: 15
          },
          {
            id: "2",
            name: "Mouse Gamer",
            price: 35
          }
        ]
      });

    expect(invoiceCreated.status).toBe(200);

    expect(invoiceCreated.body.name).toBe("Nota Fiscal 2026");
    expect(invoiceCreated.body.document).toBe("11122233344");
    expect(invoiceCreated.body.items[0].name).toBe("Teclado Mecânico");
    expect(invoiceCreated.body.items[0].price).toBe(15);
    expect(invoiceCreated.body.items[1].name).toBe("Mouse Gamer");
    expect(invoiceCreated.body.items[1].price).toBe(35);
    expect(invoiceCreated.body.street).toBe("Rua das Flores")
    expect(invoiceCreated.body.number).toBe("321")
    expect(invoiceCreated.body.complement).toBe("Apartamento 8")
    expect(invoiceCreated.body.city).toBe("Vitória")
    expect(invoiceCreated.body.state).toBe("ES")
    expect(invoiceCreated.body.zipCode).toBe("29000-000")

    const response = await request(app).get(`/invoice/${invoiceCreated.body.id}`)
    expect(response.status).toBe(200);
  });
});