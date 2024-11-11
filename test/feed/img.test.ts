import { describe, expect, it } from 'vitest'
import { FeedImg } from '../../src/index'

describe('should', () => {
  const t1 = new FeedImg('sellerId', [
    {
      sku: 'sku-1',
      imgs: [
        { type: 'Main', url: 'http://main.jpg' },
        { type: 'Swatch', url: 'http://thumb.jpg' },
      ],
    },
  ])
  it('t1 message', () => {
    const obj = t1.main()
    console.log(JSON.stringify(obj, null, 2))
    expect(obj.messages.length).toEqual(1)
  })
})
