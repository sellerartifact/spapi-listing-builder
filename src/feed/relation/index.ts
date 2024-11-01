export interface FeedRelationData { sku: string, parent_sku: string }

export class FeedRelation {
  sellerId: string
  list: FeedRelationData[]
  constructor(sellerId: string, list: FeedRelationData[]) {
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
        productType: 'LUGGAGE',
        patches: [
          {
            op: 'replace',
            path: '/attributes/child_parent_sku_relationship',
            value: [
              {
                child_relationship_type: 'variation',
                parent_sku: item.parent_sku,
              },
            ],
          },
        ],
      }
    })
  }
}
