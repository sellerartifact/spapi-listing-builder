import { describe, expect, it } from 'vitest'
import { ListingProduct } from '../../../src/index'

import { childListingData1, childListingData2, listingData, parentListingData } from './state'
import type { Recordable } from '../../../src/index'

describe('should', () => {
  it('listing结构', () => {
    const t1 = new ListingProduct({
      marketplace_id: 'ATVPDKIKX0DER',
      data: listingData,
      renderOtherAttributesFn: ({ renderListingArrValue, data }) => {
        return {
          list_price: renderListingArrValue(data.sell_price),
          gpsr_manufacturer_reference: data.gpsr_manufacturer_email_address && renderListingArrValue({
            gpsr_manufacturer_email_address: data.gpsr_manufacturer_email_address,
          }),
        }
      },
    })
    const obj: Recordable = t1.main()
    console.log(JSON.stringify(obj, null, 2))
    expect(obj.attributes.item_name[0].value).toEqual(listingData.title)
    expect(obj.attributes.list_price[0].value).toEqual(String(listingData.sell_price))
    expect(obj.attributes.gpsr_manufacturer_reference).toEqual(undefined)
  })

  it('有变体的父产品', () => {
    const t1 = new ListingProduct({ marketplace_id: 'ATVPDKIKX0DER', data: parentListingData })
    const obj: Recordable = t1.main()
    console.log(JSON.stringify(obj, null, 2))
    expect(obj.attributes.item_name[0].value).toEqual(parentListingData.title)
    expect(obj.attributes.parentage_level[0].value).toEqual('parent')
    expect(obj.attributes.variation_theme[0].name).toEqual('SIZE_NAME/COLOR_NAME')
  })

  it('变体产品', () => {
    const t1 = new ListingProduct({ marketplace_id: 'ATVPDKIKX0DER', data: childListingData1 })
    const t2 = new ListingProduct({ marketplace_id: 'ATVPDKIKX0DER', data: childListingData2 })
    const obj1: Recordable = t1.main()
    const obj2: Recordable = t2.main()
    console.log(JSON.stringify(obj1, null, 2))
    expect(obj1.attributes.parentage_level[0].value).toEqual('child')
    expect(obj2.attributes.parentage_level[0].value).toEqual('child')
    expect(obj1.attributes.variation_theme[0].name).toEqual('SIZE_NAME/COLOR_NAME')
  })

  it('跟卖产品', () => {
    const follow_goods = new ListingProduct({ marketplace_id: 'ATVPDKIKX0DER', data: {
      product_type: 'HOME',
      asin: 'B07Z8Z1VCC',
      condition: 'new_new',
      quantity: 100,
      deal_time: 3,
      sell_price: 88.88,
    }, type: 'FOLLOW_ASIN' }).main()

    console.log(JSON.stringify(follow_goods, null, 2))
    expect(follow_goods.attributes.condition_type[0].value).toEqual('New')
    expect(follow_goods.attributes.merchant_suggested_asin[0].value).toEqual('B07Z8Z1VCC')
    expect(follow_goods.attributes.fulfillment_availability[0].quantity).toEqual(100)
  })
})
