import { renderListingArrValue } from '@/help'

type Parentage = 'child' | 'parent'

export class ParentageLevel {
  parentage: Parentage
  constructor(parentage: Parentage) {
    this.parentage = parentage
  }

  main() {
    return renderListingArrValue(this.parentage)
  }
}
