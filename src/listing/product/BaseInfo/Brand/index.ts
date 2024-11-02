import { renderListingArrValue } from '@/help'

export class Brand {
  brand_name?: string
  constructor(brand_name?: string) {
    this.brand_name = brand_name
  }

  main() {
    return renderListingArrValue(this.brand_name)
  }
}
