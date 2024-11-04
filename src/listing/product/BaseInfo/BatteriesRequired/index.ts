import { renderListingArrValue } from '@/help'

export class BatteriesRequired {
  batteries_required: number
  constructor(batteries_required: number = 0) {
    this.batteries_required = batteries_required
  }

  main() {
    return renderListingArrValue(Boolean(this.batteries_required))
  }
}
