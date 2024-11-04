import { renderListingArrValue } from '@/help'

export class BatteriesRequired {
  is_electric: number
  constructor(is_electric: number = 0) {
    this.is_electric = is_electric
  }

  main() {
    return renderListingArrValue(Boolean(this.is_electric))
  }
}
