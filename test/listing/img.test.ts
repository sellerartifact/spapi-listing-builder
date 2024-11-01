import { describe, expect, it } from 'vitest'
import { ListingImg } from '../../src/index'

describe('should', () => {
  const t1 = new ListingImg([
    { type: 'Main', val: 'http://main.jpg' },
    { type: 'Swatch', val: 'http://thumb.jpg' },
  ])
  it('t1 message', () => {
    const obj = t1.main()
    console.log(JSON.stringify(obj.patches, null, 2))
    expect(obj.patches.length).toEqual(2)
  })
})
