import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface from "./invoice.facade.interface";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "../usecase/generate-invoice/generate-invoice.dto";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "../usecase/find-invoice/find-invoice.dto";

export default class InvoiceFacade implements InvoiceFacadeInterface {
  constructor(
    private readonly generateInvoiceUseCase: UseCaseInterface,
    private readonly findInvoiceUseCase: UseCaseInterface
  ) {}

  generate(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    return this.generateInvoiceUseCase.execute(input);
  }

  find(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    return this.findInvoiceUseCase.execute(input);
  }
}