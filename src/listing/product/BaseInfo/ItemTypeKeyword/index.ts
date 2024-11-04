import { renderListingArrValue } from '@/help'

export class ItemTypeKeyword {
  item_type_keyword?: string
  constructor(item_type_keyword?: string) {
    this.item_type_keyword = item_type_keyword
  }

  main() {
    return renderListingArrValue(this.item_type_keyword)
  }
}
