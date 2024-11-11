import { describe, expect, it } from 'vitest'
import { renderListingArrValue } from '../../src/index'

describe('help should', () => {
  it('renderListingArrValue string should', () => {
    const res = renderListingArrValue('test')
    expect(res).toEqual([
      {
        value: 'test',
      },
    ])
  })

  it('renderListingArrValue boolean should', () => {
    const res = renderListingArrValue(true)
    expect(res).toEqual([{ value: 'true' }])
  })

  it('renderListingArrValue obj should', () => {
    const res = renderListingArrValue({
      height: {
        unit: 'centimeters',
        value: 1,
      },
      length: {
        unit: 'centimeters',
        value: 2,
      },
      width: {
        unit: 'centimeters',
        value: 3,
      },
    })
    expect(res).toEqual([
      {
        height: {
          unit: 'centimeters',
          value: 1,
        },
        length: {
          unit: 'centimeters',
          value: 2,
        },
        width: {
          unit: 'centimeters',
          value: 3,
        },
      },
    ])
  })
})
