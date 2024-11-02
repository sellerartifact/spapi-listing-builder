import { renderListingArrValue } from '@/help'

export class ItemWeight {
  weight: number
  constructor(weight: number = 0) {
    this.weight = weight
  }

  main() {
    return renderListingArrValue({
      unit: 'kilograms',
      value: this.weight.toFixed(2),
    })
  }
}
