import { renderListingArrValue } from '@/help'

export class ItemDimensions {
  height: number
  length: number
  width: number

  constructor(height: number, length: number = 1, width: number = 1) {
    this.height = height
    this.length = length
    this.width = width
  }

  main() {
    return renderListingArrValue({
      height: {
        unit: 'centimeters',
        value: this.height,
      },
      length: {
        unit: 'centimeters',
        value: this.length,
      },
      width: {
        unit: 'centimeters',
        value: this.width,
      },
    })
  }
}
