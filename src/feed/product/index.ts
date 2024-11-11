import { ListingProduct } from '@/listing/product'
import type { ProductData, RenderOtherAttributesFn } from '@/help/state'
import { FeedHeader } from '../FeedHeader'

export class FeedProduct {
  sellerId: string
  list: ProductData[]
  marketplace_id: string
  renderOtherAttributesFn?: RenderOtherAttributesFn
  constructor(sellerId: string, marketplace_id: string, list: ProductData[], renderOtherAttributesFn?: RenderOtherAttributesFn) {
    this.sellerId = sellerId
    this.marketplace_id = marketplace_id
    this.list = list
    this.renderOtherAttributesFn = renderOtherAttributesFn
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
        ...new ListingProduct({
          marketplace_id: this.marketplace_id,
          data: item,
          renderOtherAttributesFn: this.renderOtherAttributesFn,
        }).main(),
      }
    })
  }
}
