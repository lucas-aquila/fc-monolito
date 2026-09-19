import Address from "../../../@shared/domain/value-object/address";

export interface FindInvoiceUseCaseInputDto {
  id: string
}

export interface FindInvoiceUseCaseOutputDto {
  id: string
  name: string
  document: string
  address: Address
  items: {
    id: string
    name: string
    price: number
  }[]
  total: number
  createdAt: Date
  updatedAt: Date
}