import { FeedProduct } from '@/index'
import { describe, expect, it } from 'vitest'
import { listingData, parentListingData } from '../../listing/product/state'

describe('should', () => {
  const t1 = new FeedProduct('sellerId', 'ATVPDKIKX0DER', [listingData, parentListingData], ({ renderListingArrValue, data }) => {
    return {
      list_price: renderListingArrValue(data.sell_price),
    }
  })
  it('t1 message', () => {
    const obj = t1.main()
    console.log(JSON.stringify(obj, null, 2))
    expect(obj.messages.length).toEqual(2)
  })
})
