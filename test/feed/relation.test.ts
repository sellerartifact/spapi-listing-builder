import { describe, expect, it } from 'vitest'
import { FeedRelation } from '../../src/index'

describe('should', () => {
  const t1 = new FeedRelation('sellerId', [{ sku: 'child-sku', parent_sku: 'parent_sku-123' }])
  it('t1 message', () => {
    const obj = t1.main()
    console.log(JSON.stringify(obj, null, 2))
    expect(obj.messages.length).toEqual(1)
  })
})
