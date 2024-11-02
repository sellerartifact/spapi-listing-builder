import { renderListingArrValue } from '@/help'

export class Manufacturer {
  vendor: string
  constructor(vendor: string) {
    this.vendor = vendor
  }

  main() {
    return renderListingArrValue(this.vendor)
  }
}
