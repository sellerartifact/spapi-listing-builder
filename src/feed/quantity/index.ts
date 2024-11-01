import { FeedHeader } from '../FeedHeader'

/**
 * @param {string} sku - SKU of the product
 * @param {number} deal_time - 预处理时间 默认2天
 * @param {number} quantity - 数量
 */
export interface FeedQuantityData { sku: string, quantity: number, deal_time: number }

export class FeedQuantity {
  sellerId: string
  list: FeedQuantityData[]
  constructor(sellerId: string, list: FeedQuantityData[]) {
    this.sellerId = sellerId
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
        operationType: 'PATCH',
        productType: 'PRODUCT',
        patches: [
          {
            op: 'replace',
            path: '/attributes/fulfillment_availability',
            value: [
              {
                fulfillment_channel_code: 'DEFAULT',
                quantity: item.quantity,
                lead_time_to_ship_max_days: item.deal_time || 2,
              },
            ],
          },
        ],
      }
    })
  }
}
