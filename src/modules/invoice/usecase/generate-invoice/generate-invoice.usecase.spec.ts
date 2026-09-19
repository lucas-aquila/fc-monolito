import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
};

describe("Generate Invoice use case unit test", () => {

  it("should generate an invoice", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);

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

    const result = await usecase.execute(input);

    expect(repository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.total).toEqual(200);
    expect(result.document).toEqual(input.document);
    expect(result.street).toEqual(input.street);
    expect(result.number).toEqual(input.number);
    expect(result.complement).toEqual(input.complement);
    expect(result.city).toEqual(input.city);
    expect(result.state).toEqual(input.state);
    expect(result.zipCode).toEqual(input.zipCode);
    expect(result.items.length).toBe(2);
    result.items.forEach((item: { id: string; name: string; price: number }) => {
      expect(item.id).toBeDefined();
      expect(item.name).toBeDefined();
      expect(item.price).toBeDefined();
    });
  });
});