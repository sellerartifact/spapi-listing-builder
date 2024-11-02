import { renderListingArrValue } from '@/help'

export class GenericKeyword {
  search_terms: string
  constructor(search_terms: string) {
    this.search_terms = search_terms
  }

  main() {
    return renderListingArrValue(this.search_terms)
  }
}
