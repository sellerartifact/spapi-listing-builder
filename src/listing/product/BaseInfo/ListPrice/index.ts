import { renderListingArrValue } from '@/help'

export class ListPrice {
  list_price: number
  constructor(list_price: number = 0) {
    this.list_price = list_price
  }

  main() {
    return renderListingArrValue(this.list_price)
  }
}
