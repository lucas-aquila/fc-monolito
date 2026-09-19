import Address from "../../../@shared/domain/value-object/address";
import {
  FindInvoiceUseCaseInputDto,
  FindInvoiceUseCaseOutputDto,
} from "./find-invoice.dto";
import InvoiceGateway from "../../gateway/invoice.gateway";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";

export default class FindInvoiceUseCase implements UseCaseInterface {

  constructor(private _repository: InvoiceGateway) {}

  async execute(input: FindInvoiceUseCaseInputDto): Promise<FindInvoiceUseCaseOutputDto> {

    const result = await this._repository.find(input.id)
    const items = result.items.map(item => {
      return {
        id: item.id.id,
        name: item.name,
        price: item.price,
      }
    });

    return {
      id: result.id.id,
      name: result.name,
      document: result.document,
      items: items,
      total: result.total,
      address: new Address(
        result.address.street,
        result.address.number,
        result.address.complement,
        result.address.city,
        result.address.state,
        result.address.zipCode,
      ),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    }
  }
}