import { filterUndefinedKeys, renderListingArrValue as renderListingArrValueHelp } from '@/help'
import type { ListingType, ProductData, Recordable, RenderOtherAttributesFn } from '@/help/state'
import { ListingPrice } from '../price'
import { ListingQuantity } from '../quantity'
import { Condition, MaxOrderQuantity, ProductBaseInfo } from './BaseInfo'
import { ProductParentage } from './Parentage'

interface ListingProductConstructor {
  marketplace_id: string
  data: ProductData
  type?: ListingType
  renderOtherAttributesFn?: (RenderOtherAttributesFn)
}

/**
 * @desc FOLLOW_ASIN - 跟卖ASIN
 * @desc LISTING - 刊登
 */

export class ListingProduct {
  data: ProductData
  marketplace_id: string
  type: ListingType
  renderOtherAttributesFn?: RenderOtherAttributesFn

  constructor({ marketplace_id, data, type, renderOtherAttributesFn }: ListingProductConstructor) {
    this.marketplace_id = marketplace_id
    this.type = type || 'LISTING'
    this.data = data
    this.renderOtherAttributesFn = renderOtherAttributesFn
  }

  main() {
    if (this.type === 'FOLLOW_ASIN') {
      return this.renderFollowAsin()
    }
    else if (this.type === 'LISTING') {
      return this.renderListing()
    }
    throw new Error(`Invalid type: ${this.type}`)
  }

  renderFollowAsin() {
    const data = this.data
    const attributes = {
      condition_type: new Condition(data.condition).main(),
      merchant_suggested_asin: [
        {
          value: data.asin,
        },
      ],
      fulfillment_availability: new ListingQuantity({ quantity: data.quantity || 0, deal_time: data.deal_time }).genValue(),
      purchasable_offer: data.sell_price && new ListingPrice({ sell_price: data.sell_price }).genValue(),
      max_order_quantity: new MaxOrderQuantity(data.max_order_quantity).main(),
    }
    Object.assign(attributes, this.callRenderOtherAttributesFn(attributes))
    return {
      productType: data.product_type,
      requirements: 'LISTING_OFFER_ONLY',
      attributes: filterUndefinedKeys(attributes),
    }
  }

  renderListing() {
    const data = this.data
    const attributes: Recordable = {
      ...new ProductBaseInfo(this.marketplace_id, data).main(),
    }
    if (data.parentage) {
      Object.assign(attributes, new ProductParentage(this.marketplace_id, data).main())
    }
    Object.assign(attributes, this.callRenderOtherAttributesFn(attributes))

    return {
      productType: data.product_type,
      requirements: 'LISTING',
      attributes: filterUndefinedKeys(attributes),
    }
  }

  callRenderOtherAttributesFn(attributes: Recordable) {
    if (!this.renderOtherAttributesFn) {
      return {}
    }
    return this.renderOtherAttributesFn({
      attributes,
      data: this.data,
      renderListingArrValue: renderListingArrValueHelp,
    })
  }
}
