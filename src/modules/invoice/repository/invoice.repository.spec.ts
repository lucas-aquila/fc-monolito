import { Sequelize } from "sequelize-typescript";
import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import InvoiceItem from "../domain/invoice-item.entity";
import { InvoiceItemModel, InvoiceModel } from "./invoice.model";
import InvoiceRepository from "./invoice.repository";

describe("InvoiceRepository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({ dialect: "sqlite", storage: ":memory:", logging: false, sync: { force: true } });
    await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should save and find an invoice with its items", async () => {
    const invoice = new Invoice({
      id: new Id("invoice-1"),
      name: "Customer",
      document: "123456789",
      address: new Address("Main Street", "10", "Apt 2", "Sao Paulo", "SP", "01000-000"),
      items: [new InvoiceItem({ id: new Id("item-1"), name: "Book", price: 30 })],
    });
    const repository = new InvoiceRepository();

    await repository.save(invoice);
    const result = await repository.find("invoice-1");

    expect(result.id.id).toBe("invoice-1");
    expect(result.items[0].name).toBe("Book");
    expect(result.total).toBe(30);
  });
});