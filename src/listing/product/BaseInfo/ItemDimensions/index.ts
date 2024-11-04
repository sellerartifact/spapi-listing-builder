import { renderListingArrValue } from '@/help'

export class ItemDimensions {
  length1: number
  length2: number
  length3: number

  constructor(length1: number, length2: number = 1, length3: number = 1) {
    this.length1 = length1
    this.length2 = length2
    this.length3 = length3
  }

  main() {
    return renderListingArrValue({
      height: {
        unit: 'centimeters',
        value: this.length1,
      },
      length: {
        unit: 'centimeters',
        value: this.length2,
      },
      width: {
        unit: 'centimeters',
        value: this.length3,
      },
    })
  }
}
