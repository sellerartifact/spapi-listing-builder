import { renderListingArrValue } from '@/help'
import { combineObjAttr } from '../../help'

export interface ListingPriceData { sell_price: number, low_price?: number, max_price?: number }

export class ListingPrice {
  priceData: ListingPriceData
  constructor(priceData: ListingPriceData) {
    this.priceData = priceData
  }

  main() {
    return {
      productType: 'PRODUCT',
      patches: [
        {
          op: 'replace',
          path: '/attributes/purchasable_offer',
          value: [
            this.genPatche(),
          ],
        },
      ],
    }
  }

  genPatche() {
    const sendData: any = {
      audience: 'ALL',
    }
    combineObjAttr(this.priceData.sell_price, sendData, 'our_price', [
      {
        schedule: [
          {
            value_with_tax: this.priceData.sell_price,
          },
        ],
      },
    ])

    combineObjAttr(this.priceData.low_price, sendData, 'minimum_seller_allowed_price', [
      {
        schedule: [
          {
            value_with_tax: this.priceData.low_price,
          },
        ],
      },
    ])

    combineObjAttr(this.priceData.max_price, sendData, 'maximum_seller_allowed_price', [
      {
        schedule: [
          {
            value_with_tax: this.priceData.max_price,
          },
        ],
      },
    ])

    return sendData
  }

  genValue() {
    return renderListingArrValue(
      {
        our_price: [
          {
            schedule: [
              {
                value_with_tax: this.priceData.sell_price,
              },
            ],
          },
        ],
      },
    )
  }
}
