import { describe, expect, it } from 'vitest'
import { FeedImg } from '../../src/index'

describe('should', () => {
  const t1 = new FeedImg('sellerId', [{ sku: 'sku-1', imgs: [
    { type: 'Main', val: 'http://main.jpg' },
    { type: 'Swatch', val: 'http://thumb.jpg' },
  ] }])
  it('t1 message', () => {
    const obj = t1.main()
    console.log(obj.messages[0].patches)
    expect(obj.messages.length).toEqual(1)
  })
})
