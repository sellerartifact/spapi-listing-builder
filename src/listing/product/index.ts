import { renderListingArrValue as renderListingArrValueHelp } from '@/help'
import type { ListingType, ProductData, Recordable } from '@/help/state'
import { Condition, ProductBaseInfo } from './BaseInfo'
import { ProductParentage } from './Parentage'

type RenderOtherAttributesFn = (params: { attributes: Recordable, data: ProductData, renderListingArrValue: typeof renderListingArrValueHelp }) => Recordable

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
    }
    Object.assign(attributes, this.callRenderOtherAttributesFn(attributes))
    return {
      productType: data.product_type,
      requirements: 'LISTING',
      attributes,
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
      attributes,

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
