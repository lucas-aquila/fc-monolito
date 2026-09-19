import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";
import {InvoiceModel} from "./invoice.model";
import {InvoiceItemModel} from "./invoice-item.model";
import InvoiceItem from "../domain/invoice-item.entity";

export class InvoiceRepository implements InvoiceGateway {
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: {id},
      include: [InvoiceItemModel]
    })

    if (!invoice) {
      throw new Error("Invoice not found")
    }

    const items = invoice.items.map(
      item => new InvoiceItem({
        id: new Id(item.id),
        name: item.name,
        price: item.price
      })
    );

    const address = new Address(
      invoice.street,
      invoice.number,
      invoice.complement,
      invoice.city,
      invoice.state,
      invoice.zipcode,
    );

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: address,
      items: items,
      createdAt: invoice.createdAt,
      updatedAt: invoice.createdAt
    })
  }

  async add(entity: Invoice): Promise<void> {
    await InvoiceModel.create({
      id: entity.id.id,
      name: entity.name,
      document: entity.document,
      street: entity.address.street,
      number: entity.address.number,
      complement: entity.address.complement,
      city: entity.address.city,
      state: entity.address.state,
      zipcode: entity.address.zipCode,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
    for (const item of entity.items) {
      await InvoiceItemModel.create({
        id: item.id.id,
        invoice_id: entity.id.id,
        name: item.name,
        price: item.price,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })
    }
  }
}