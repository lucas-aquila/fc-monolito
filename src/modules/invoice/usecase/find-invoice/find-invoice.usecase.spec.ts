import Address from "../../../@shared/domain/value-object/address"
import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/invoice.entity";
import InvoiceItem from "../../domain/invoice-item.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

const item1 = new InvoiceItem({
  id: new Id("1"),
  name: "Item 1",
  price: 100,
});
const item2 = new InvoiceItem({
  id: new Id("2"),
  name: "Item 2",
  price: 100,
});
const invoice = new Invoice({
  id: new Id("1"),
  name: "Invoice",
  document: "1234-5678",
  items: [item1, item2],
  address: new Address(
    "Rua 123",
    "99",
    "Casa Verde",
    "Criciúma",
    "SC",
    "88888-888",
  )
})

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice))
  }
}

describe("Find Invoice use case unit test", () => {

  it("should find an invoice", async () => {

    const repository = MockRepository()
    const usecase = new FindInvoiceUseCase(repository)

    const input = { id: "1" }

    const result = await usecase.execute(input)

    expect(repository.find).toHaveBeenCalled()
    expect(result.id).toEqual(input.id)
    expect(result.name).toEqual(invoice.name)
    expect(result.address).toEqual(invoice.address)
    expect(result.document).toEqual(invoice.document)
    expect(result.total).toEqual(invoice.total)
    expect(result.createdAt).toEqual(invoice.createdAt)
    expect(result.updatedAt).toEqual(invoice.updatedAt)
    expect(result.items.length).toBe(2)
    result.items.forEach((item: { id: string; name: string; price: number }) => {
      expect(item.id).toBeDefined();
      expect(item.name).toBeDefined();
      expect(item.price).toBeDefined();
    });
  });
});