import { renderListingArrValue } from '@/help'

export class MaxOrderQuantity {
  max_order_quantity: number
  constructor(max_order_quantity: number = 100) {
    this.max_order_quantity = max_order_quantity
  }

  main() {
    return renderListingArrValue(String(this.max_order_quantity))
  }
}
