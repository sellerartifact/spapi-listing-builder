import { renderListingArrValue } from '@/help'

export class CountryOfOrigin {
  country_of_origin: string
  constructor(country_of_origin?: string) {
    this.country_of_origin = country_of_origin || 'CN'
  }

  main() {
    return renderListingArrValue(this.country_of_origin)
  }
}
