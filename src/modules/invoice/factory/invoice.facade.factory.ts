import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import {InvoiceRepository} from "../repository/invoice.repository";
import InvoiceFacade from "../facade/invoice.facade";

export default class InvoiceFacadeFactory {
  static create() {
    const repository = new InvoiceRepository();
    const findUc = new FindInvoiceUseCase(repository);
    const generateUc = new GenerateInvoiceUseCase(repository);
    const facade = new InvoiceFacade({
      findUsecase: findUc,
      generateUsecase: generateUc,
    });

    return facade;
  }
}