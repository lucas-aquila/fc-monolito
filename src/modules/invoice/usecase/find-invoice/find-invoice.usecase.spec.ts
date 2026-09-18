import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import InvoiceItem from "../../domain/invoice-item.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

describe("FindInvoiceUseCase", () => {
  it("should return an invoice and its total", async () => {
    const invoice = new Invoice({
      id: new Id("invoice-1"),
      name: "Customer",
      document: "123456789",
      address: new Address("Main Street", "10", "Apt 2", "Sao Paulo", "SP", "01000-000"),
      items: [new InvoiceItem({ id: new Id("item-1"), name: "Book", price: 30 })],
    });
    const repository = {
      save: jest.fn(),
      find: jest.fn().mockResolvedValue(invoice),
    };
    const usecase = new FindInvoiceUseCase(repository);

    const result = await usecase.execute({ id: "invoice-1" });

    expect(repository.find).toHaveBeenCalledWith("invoice-1");
    expect(result.id).toBe("invoice-1");
    expect(result.address.street).toBe("Main Street");
    expect(result.items[0].price).toBe(30);
    expect(result.total).toBe(30);
    expect(result.createdAt).toBe(invoice.createdAt);
  });
});