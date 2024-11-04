import { renderListingArrValue } from '@/help'

export class Description {
  product_description?: string
  constructor(product_description?: string) {
    this.product_description = product_description
  }

  main() {
    return renderListingArrValue(this.product_description)
  }
}
