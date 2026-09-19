import { Sequelize } from "sequelize-typescript"
import {InvoiceModel} from "../repository/invoice.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import {InvoiceItemModel} from "../repository/invoice-item.model";

describe("Invoice Facade test", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })
    sequelize.addModels([InvoiceModel, InvoiceItemModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should find an invoice", async () => {
    const facade = InvoiceFacadeFactory.create();
    const input = {
      name: "Invoice 1",
      document: "1234-5678",
      street: "Rua 123",
      number: "99",
      complement: "Casa Verde",
      city: "Criciúma",
      state: "SC",
      zipCode: "88888-888",
      items: [
        {
          id: "i1",
          name: "Item 1",
          price: 100
        },
        {
          id: "i2",
          name: "Item 2",
          price: 100
        },
      ]
    };
    const generated = await facade.generate(input);
    const invoice = await facade.find({ id: generated.id });

    expect(invoice.id).toEqual(generated.id)
    expect(invoice.name).toEqual(input.name)
    expect(invoice.document).toEqual(input.document)
    expect(invoice.address.street).toEqual(input.street)
    expect(invoice.address.number).toEqual(input.number)
    expect(invoice.address.complement).toEqual(input.complement)
    expect(invoice.address.city).toEqual(input.city)
    expect(invoice.address.state).toEqual(input.state)
    expect(invoice.address.zipCode).toEqual(input.zipCode)
    expect(invoice.total).toEqual(200)
    expect(invoice.items.length).toBe(2)

    invoice.items.forEach(item => {
      expect(item.id).toBeDefined()
      expect(item.name).toBeDefined()
      expect(item.price).toBeDefined()
    })
  })

  it("should generate an invoice", async () => {
    const facade = InvoiceFacadeFactory.create();
    const input = {
      name: "Invoice 1",
      document: "1234-5678",
      street: "Rua 123",
      number: "99",
      complement: "Casa Verde",
      city: "Criciúma",
      state: "SC",
      zipCode: "88888-888",
      items: [
        {
          id: "i1",
          name: "Item 1",
          price: 100
        },
        {
          id: "i2",
          name: "Item 2",
          price: 100
        },
      ]
    };

    const invoice = await facade.generate(input);

    expect(invoice.id).toBeDefined();
    expect(invoice.name).toEqual(input.name);
    expect(invoice.document).toEqual(input.document);
    expect(invoice.street).toEqual(input.street);
    expect(invoice.number).toEqual(input.number);
    expect(invoice.complement).toEqual(input.complement);
    expect(invoice.city).toEqual(input.city);
    expect(invoice.state).toEqual(input.state);
    expect(invoice.zipCode).toEqual(input.zipCode);
    expect(invoice.total).toEqual(200);
    expect(invoice.items.length).toBe(2);

    invoice.items.forEach(item => {
      expect(item.id).toBeDefined()
      expect(item.name).toBeDefined()
      expect(item.price).toBeDefined()
    })
  })
})