import { renderListingArrValue } from '@/help'

export class ProductTaxCode {
  product_tax_code?: string
  constructor(product_tax_code?: string) {
    this.product_tax_code = product_tax_code
  }

  main() {
    return renderListingArrValue(this.product_tax_code)
  }
}
