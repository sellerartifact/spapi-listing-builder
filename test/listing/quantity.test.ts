import { describe, expect, it } from 'vitest'
import { ListingQuantity } from '../../src/index'

describe('should', () => {
  const t1 = new ListingQuantity({ quantity: 3, deal_time: 2 })
  it('t1 message', () => {
    const obj = t1.main()
    console.log(JSON.stringify(obj.patches[0]))
    expect(obj.patches.length).toEqual(1)
  })
})
