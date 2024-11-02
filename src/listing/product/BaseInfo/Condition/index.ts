import { renderListingArrValue } from '@/help'

export class Condition {
  condition: string
  constructor(condition?: string) {
    this.condition = condition || 'new_new'
  }

  main() {
    return renderListingArrValue(this.condition)
  }
}
