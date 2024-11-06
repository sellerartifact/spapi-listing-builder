import { describe, expect, it } from 'vitest'
import { ListingRelation } from '../../src/index'

describe('should', () => {
  const t1 = new ListingRelation('parent_sku123')
  it('t1 message', () => {
    const obj = t1.main()
    console.log(JSON.stringify(obj.patches[0], null, 2))
    expect(obj.patches.length).toEqual(1)
  })
})
