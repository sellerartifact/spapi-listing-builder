import { describe, expect, it } from 'vitest'
import { ListingImg } from '../../src/index'

describe('should', () => {
  const t1 = new ListingImg([
    { type: 'Main', url: 'http://main.jpg' },
    { type: 'Swatch', url: 'http://thumb.jpg' },
    { type: 'PS01', url: 'http://PS01.jpg' },
  ])
  it('t1 message', () => {
    const obj = t1.main()
    console.log(JSON.stringify(obj.patches, null, 2))
    expect(obj.patches.length).toEqual(3)
  })
})
