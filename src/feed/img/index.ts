import { imageTypeJsonMap } from '../../help/state'

export interface FeedImgData {
  sku: string
  imgs: {
    type: string
    val: string
  }[]
}

export class FeedImg {
  sellerId: string
  list: FeedImgData[]
  constructor(sellerId: string, list: FeedImgData[]) {
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
        patches: this.genPatches(item.imgs),
      }
    })
  }

  genPatches(imgs: FeedImgData['imgs']) {
    return imgs.filter((item) => {
      return imageTypeJsonMap[item.type]
    }).map((item) => {
      return {
        op: 'replace',
        path: `/attributes/${imageTypeJsonMap[item.type]}`,
        value: [
          {
            media_location: item.val,
          },
        ],
      }
    })
  }
}
