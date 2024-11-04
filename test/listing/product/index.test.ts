import { describe, expect, it } from 'vitest'
import { ListingProduct } from '../../../src/index'

import { childListingData1, childListingData2, listingData, parentListingData } from './state'
import type { Recordable } from '../../../src/index'

describe('should', () => {
  it('listing结构', () => {
    const t1 = new ListingProduct('ATVPDKIKX0DER', listingData)
    const obj: Recordable = t1.main()
    console.log(JSON.stringify(obj, null, 2))
    expect(obj.attributes.item_name[0].value).toEqual(listingData.title)
  })

  it('有变体的父产品', () => {
    const t1 = new ListingProduct('ATVPDKIKX0DER', parentListingData)
    const obj: Recordable = t1.main()
    console.log(JSON.stringify(obj, null, 2))
    expect(obj.attributes.item_name[0].value).toEqual(parentListingData.title)
    expect(obj.attributes.parentage_level[0].value).toEqual('parent')
    expect(obj.attributes.variation_theme[0].value).toEqual('SIZE_NAME/COLOR_NAME')
  })

  it('变体产品', () => {
    const t1 = new ListingProduct('ATVPDKIKX0DER', childListingData1)
    const t2 = new ListingProduct('ATVPDKIKX0DER', childListingData2)
    const obj1: Recordable = t1.main()
    const obj2: Recordable = t2.main()
    console.log(JSON.stringify(obj1, null, 2))
    expect(obj1.attributes.parentage_level[0].value).toEqual('child')
    expect(obj2.attributes.parentage_level[0].value).toEqual('child')
    expect(obj1.attributes.variation_theme[0].value).toEqual('SIZE_NAME/COLOR_NAME')
  })
})
