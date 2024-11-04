import { ListingProduct } from '@/listing/product'
import type { ProductData } from '@/help/state'
import { FeedHeader } from '../FeedHeader'

export class FeedProduct {
  sellerId: string
  list: ProductData[]
  marketplace_id: string
  constructor(sellerId: string, marketplace_id: string, list: ProductData[]) {
    this.sellerId = sellerId
    this.marketplace_id = marketplace_id
    this.list = list
  }

  main() {
    return {
      header: new FeedHeader(this.sellerId).main(),
      messages: this.genMessage(),
    }
  }

  genMessage() {
    return this.list.map((item, idx) => {
      return {
        messageId: idx + 1,
        sku: item.sku,
        operationType: 'UPDATE',
        ...new ListingProduct(this.marketplace_id, item).main(),
      }
    })
  }
}
