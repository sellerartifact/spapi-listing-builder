import { renderListingArrValue } from '@/help'

export class RecommendedBrowseNodes {
  recommendedBrowseNodes: string[]
  constructor(recommendedBrowseNodes: string[]) {
    this.recommendedBrowseNodes = recommendedBrowseNodes
  }

  main() {
    return this.recommendedBrowseNodes.map((item) => {
      return renderListingArrValue(item)
    })
  }
}
