import { describe, expect, it } from 'vitest'
import { FeedPrice } from '../../src/index'

describe('should', () => {
  const t1 = new FeedPrice('sellerId', [{ country_code: 'us', sku: 'sku-1', sell_price: 100 }])
  it('t1 message', () => {
    const obj = t1.main()
    console.log(JSON.stringify(obj, null, 2))
    expect(obj.messages.length).toEqual(1)
  })
})
