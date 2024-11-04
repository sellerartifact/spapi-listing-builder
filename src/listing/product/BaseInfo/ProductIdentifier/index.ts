import { renderListingArrValue } from '@/help'

export class ProductIdentifier {
  product_identifier_type: string
  product_identifier_id: string
  constructor(product_identifier_type: string, product_identifier_id: string = '') {
    this.product_identifier_type = product_identifier_type
    this.product_identifier_id = product_identifier_id
  }

  main() {
    return renderListingArrValue({
      value: this.product_identifier_id,
      type: this.product_identifier_type,
    })
  }
}
