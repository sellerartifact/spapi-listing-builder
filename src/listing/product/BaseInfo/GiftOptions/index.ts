import { renderListingArrValue } from '@/help'

export class GiftOptions {
  constructor() {

  }

  main() {
    return renderListingArrValue({
      can_be_messaged: 'false',
      can_be_wrapped: 'false',
    })
  }
}
