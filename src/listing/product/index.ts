import type { ListingType, ProductData } from '@/help/state'
import { Condition, ProductBaseInfo } from './BaseInfo'

/**
 * @desc FOLLOW_ASIN - 跟卖ASIN
 * @desc LISTING - 刊登
 */

export class ListingProduct {
  data: ProductData
  marketplace_id: string
  type: ListingType
  constructor(marketplace_id: string, type: ListingType, data: ProductData) {
    this.marketplace_id = marketplace_id
    this.type = type
    this.data = data
  }

  main() {
    if (this.type === 'FOLLOW_ASIN') {
      return this.renderFollowAsin()
    }
    else if (this.type === 'LISTING') {
      return this.renderListing()
    }
  }

  renderFollowAsin() {
    const data = this.data
    return {
      productType: data.product_type,
      requirements: 'LISTING',
      attributes: {
        condition_type: new Condition(data.condition).main(),
        merchant_suggested_asin: [
          {
            value: data.asin,
          },
        ],
      },
    }
  }

  renderListing() {
    const data = this.data
    return {
      productType: data.product_type,
      requirements: 'LISTING',
      attributes: {
        ...new ProductBaseInfo(this.marketplace_id, data).main(),
      },
    }
  }
}
