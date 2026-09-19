import express, {Request, Response} from 'express';
import FindInvoiceUseCase from '../../modules/invoice/usecase/find-invoice/find-invoice.usecase';
import {InvoiceRepository} from '../../modules/invoice/repository/invoice.repository';
import GenerateInvoiceUseCase from '../../modules/invoice/usecase/generate-invoice/generate-invoice.usecase';

export const InvoiceRoutes = express.Router();

InvoiceRoutes.post("/", async (req: Request, res: Response) => {
  const usecase = new GenerateInvoiceUseCase(new InvoiceRepository());
  const output = await usecase.execute({
    name: req.body.name,
    document: req.body.document,
    street: req.body.street,
    number: req.body.number,
    complement: req.body.complement,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    items: req.body.items
  });
  res.send(output);
});

InvoiceRoutes.get('/:invoiceId', async (req: Request, res: Response) => {
  const usecase = new FindInvoiceUseCase(new InvoiceRepository());
  const invoiceId = String(req.params.invoiceId);
  const output = await usecase.execute({id: invoiceId});
  res.send(output);
});