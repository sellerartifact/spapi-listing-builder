import { renderListingArrValue } from '@/help'

export class Color {
  color: string
  constructor(color: string = 'normal') {
    this.color = color
  }

  main() {
    return renderListingArrValue(this.color)
  }
}
