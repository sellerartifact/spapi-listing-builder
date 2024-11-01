import { describe, expect, it } from 'vitest'
import { FeedQuantity } from '../../src/index'

describe('should', () => {
  const t1 = new FeedQuantity('sellerId', [{ sku: 'sku-1', quantity: 100, deal_time: 3 }])
  it('t1 message', () => {
    const obj = t1.main()
    console.log(obj)
    expect(obj.messages.length).toEqual(1)
  })
})
