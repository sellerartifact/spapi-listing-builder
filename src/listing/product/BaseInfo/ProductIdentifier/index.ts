import { renderListingArrValue } from '@/help'

export class ProductIdentifier {
  product_type: string
  product_id: string
  constructor(product_type: string, product_id: string) {
    this.product_type = product_type
    this.product_id = product_id
  }

  main() {
    return renderListingArrValue({
      value: this.product_id,
      type: this.product_type,
    })
  }
}
