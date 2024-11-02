import { combineObjAttr, renderListingArrValue } from '../../help'

export interface ListingQuantityData {
  quantity: number
  deal_time?: number
}

export class ListingQuantity {
  quantityData: ListingQuantityData
  constructor(quantityData: ListingQuantityData) {
    this.quantityData = quantityData
  }

  main() {
    return {
      productType: 'PRODUCT',
      patches: [
        {
          op: 'replace',
          path: '/attributes/fulfillment_availability',
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
    combineObjAttr(this.quantityData.quantity, sendData, 'quantity', this.quantityData.quantity)

    combineObjAttr(Boolean(this.quantityData.deal_time), sendData, 'lead_time_to_ship_max_days', this.quantityData.deal_time)

    return sendData
  }

  genValue() {
    return renderListingArrValue({
      fulfillment_channel_code: 'DEFAULT',
      quantity: this.quantityData.quantity,
      lead_time_to_ship_max_days: this.quantityData.deal_time,
    })
  }
}
