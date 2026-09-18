import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import { InvoiceItemModel, InvoiceModel } from "../repository/invoice.model";

describe("InvoiceFacade", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({ dialect: "sqlite", storage: ":memory:", logging: false, sync: { force: true } });
    await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate and find an invoice", async () => {
    const facade = InvoiceFacadeFactory.create();
    const input = {
      name: "Customer",
      document: "123456789",
      street: "Main Street",
      number: "10",
      complement: "Apt 2",
      city: "Sao Paulo",
      state: "SP",
      zipCode: "01000-000",
      items: [{ id: "item-1", name: "Book", price: 30 }],
    };

    const generated = await facade.generate(input);
    const found = await facade.find({ id: generated.id });

    expect(found.id).toBe(generated.id);
    expect(found.name).toBe(input.name);
    expect(found.address.zipCode).toBe(input.zipCode);
    expect(found.items).toEqual(input.items);
    expect(found.total).toBe(30);
  });
});