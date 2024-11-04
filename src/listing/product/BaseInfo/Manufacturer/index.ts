import { renderListingArrValue } from '@/help'

export class Manufacturer {
  manufacturer?: string
  constructor(manufacturer?: string) {
    this.manufacturer = manufacturer
  }

  main() {
    return renderListingArrValue(this.manufacturer)
  }
}
