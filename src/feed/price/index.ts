export interface FeedPriceData { country_code: string, sku: string, sell_price: number, shipping_price?: number }

export class FeedPrice {
  sellerId: string
  list: FeedPriceData[]
  constructor(sellerId: string, list: FeedPriceData[]) {
    this.sellerId = sellerId
    this.list = list
  }

  main() {
    return {
      header: {
        sellerId: this.sellerId,
        version: '2.0',
        issueLocale: 'en_US',
      },
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
            path: '/attributes/purchasable_offer',
            value: [
              {
                audience: 'ALL',
                our_price: [
                  {
                    schedule: [
                      {
                        value_with_tax: item.sell_price,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }
    })
  }
}
