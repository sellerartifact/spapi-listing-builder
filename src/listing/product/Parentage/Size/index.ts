import { renderListingArrValue } from '@/help'

export class Size {
  size: string
  constructor(size: string = 'normal') {
    this.size = size
  }

  main() {
    return renderListingArrValue(this.size)
  }
}
