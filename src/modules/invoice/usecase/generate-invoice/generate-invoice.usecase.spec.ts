import Invoice from "../../domain/invoice.entity";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

describe("GenerateInvoiceUseCase", () => {
  it("should generate an invoice with the total", async () => {
    const repository = {
      save: jest.fn().mockResolvedValue(undefined),
      find: jest.fn(),
    };
    const usecase = new GenerateInvoiceUseCase(repository);

    const result = await usecase.execute({
      name: "Customer",
      document: "123456789",
      street: "Main Street",
      number: "10",
      complement: "Apt 2",
      city: "Sao Paulo",
      state: "SP",
      zipCode: "01000-000",
      items: [
        { id: "item-1", name: "Book", price: 30 },
        { id: "item-2", name: "Pen", price: 5 },
      ],
    });

    expect(result.id).toBeDefined();
    expect(result.total).toBe(35);
    expect(result.items).toHaveLength(2);
    expect(repository.save).toHaveBeenCalledWith(expect.any(Invoice));
  });
});