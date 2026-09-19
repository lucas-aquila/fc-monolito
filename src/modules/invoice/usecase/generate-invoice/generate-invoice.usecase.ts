import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
} from "./generate-invoice.dto";
import Invoice from "../../domain/invoice.entity";
import Address from "../../../@shared/domain/value-object/address";
import InvoiceItem from "../../domain/invoice-item.entity";

export default class GenerateInvoiceUseCase {

  constructor(private _repository: InvoiceGateway) {
  }

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

    const address = new Address(input.street, input.number, input.complement, input.city, input.state, input.zipCode);
    const items = input.items.map(item => new InvoiceItem({
      id: new Id(item.id),
      name: item.name,
      price: item.price,
    }));
    const props = {
      id: new Id(),
      name: input.name,
      document: input.document,
      address: address,
      items: items,
    }

    const invoice = new Invoice(props)
    await this._repository.add(invoice)

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map(item => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: invoice.total,
    }
  }
}