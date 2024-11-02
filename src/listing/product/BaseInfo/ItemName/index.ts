import { renderListingArrValue } from '@/help'

export class ItemName {
  title: string
  constructor(title: string) {
    this.title = title
  }

  main() {
    return renderListingArrValue(this.title)
  }
}
