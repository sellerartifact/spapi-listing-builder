import { renderListingArrValue } from '@/help'

export class PartNumber {
  manufactuer_id: string
  constructor(manufactuer_id: string) {
    this.manufactuer_id = manufactuer_id
  }

  main() {
    return renderListingArrValue(this.manufactuer_id)
  }
}
