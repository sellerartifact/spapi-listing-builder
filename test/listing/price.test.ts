import { describe, expect, it } from 'vitest'
import { ListingPrice } from '../../src/index'

describe('should', () => {
  const t1 = new ListingPrice({ sku: 'sku-1', sell_price: 100, low_price: 90, max_price: 110 })
  it('t1 message', () => {
    const obj = t1.main()
    console.log(JSON.stringify(obj.patches[0]))
    expect(obj.patches.length).toEqual(1)
  })
})
