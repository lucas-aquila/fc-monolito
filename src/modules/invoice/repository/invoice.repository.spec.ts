import { Sequelize } from "sequelize-typescript"
import {InvoiceModel} from "./invoice.model";
import {InvoiceItemModel} from "./invoice-item.model";
import {InvoiceRepository} from "./invoice.repository";
import InvoiceItem from "../domain/invoice-item.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";
import Invoice from "../domain/invoice.entity";

describe("Invoice repository tests", () => {

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
    const invoice = await InvoiceModel.create({
      id: '1',
      name: 'Invoice 1',
      document: "1234-5678",
      street: "Rua 123",
      number: "99",
      complement: "Casa Verde",
      city: "Criciúma",
      state: "SC",
      zipcode: "88888-888",      
      createdAt: new Date(),
      updatedAt: new Date()
    });
    const item1 = await InvoiceItemModel.create({
      id: '1',
      invoice_id: invoice.id,
      name: 'Item 1',
      price: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const item2 = await InvoiceItemModel.create({
      id: '2',
      invoice_id: invoice.id,
      name: 'Item 2',
      price: 200,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const repository = new InvoiceRepository();
    const result = await repository.find(invoice.id);

    expect(result.id.id).toEqual(invoice.id);
    expect(result.name).toEqual(invoice.name);
    expect(result.address.street).toEqual(invoice.street);
    expect(result.address.number).toEqual(invoice.number);
    expect(result.address.complement).toEqual(invoice.complement);
    expect(result.address.city).toEqual(invoice.city);
    expect(result.address.state).toEqual(invoice.state);
    expect(result.address.zipCode).toEqual(invoice.zipcode);
    expect(result.createdAt).toStrictEqual(invoice.createdAt);
    expect(result.updatedAt).toStrictEqual(invoice.updatedAt);
    expect(result.items.every(item => item instanceof InvoiceItem)).toBe(true);
    expect(result.items.length).toBe(2);
  })

  it("should create an invoice", async () => {

    const item1 = new InvoiceItem({
      id: new Id("1"),
      name: "Item 1",
      price: 100,
    });
    const item2 = new InvoiceItem({
      id: new Id("2"),
      name: "Item 2",
      price: 200,
    })
    const invoice = new Invoice({
      id: new Id("1"),
      name: "Invoice 1",
      document: "1234-5678",
      address: new Address(
        "Rua 123",
        "99",
        "Casa Verde",
        "Criciúma",
        "SC",
        "88888-888"
      ),
      items: [item1, item2]
    });

    const repository = new InvoiceRepository();
    await repository.add(invoice);

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: "1" },
      include: [InvoiceItemModel],
    });

    expect(invoiceDb).toBeDefined();
    expect(invoiceDb.id).toEqual(invoice.id.id);
    expect(invoiceDb.name).toEqual(invoice.name);
    expect(invoiceDb.document).toEqual(invoice.document);
    expect(invoiceDb.street).toEqual(invoice.address.street);
    expect(invoiceDb.number).toEqual(invoice.address.number);
    expect(invoiceDb.complement).toEqual(invoice.address.complement);
    expect(invoiceDb.city).toEqual(invoice.address.city);
    expect(invoiceDb.state).toEqual(invoice.address.state);
    expect(invoiceDb.zipcode).toEqual(invoice.address.zipCode);
    expect(invoiceDb.createdAt).toStrictEqual(invoice.createdAt);
    expect(invoiceDb.updatedAt).toStrictEqual(invoice.updatedAt);
    expect(invoiceDb.items.every(item => item instanceof InvoiceItemModel)).toBe(true);
    expect(invoiceDb.items.length).toBe(2);
  })
})