import { getImageType } from '../../help/state'
import type { ListingImgData, Recordable } from '../../help/state'

export class ListingImg {
  imgData: ListingImgData[]
  constructor(imgData: ListingImgData[]) {
    this.imgData = imgData.filter((item) => {
      return getImageType(item.type)
    })
  }

  main() {
    return {
      productType: 'PRODUCT',
      patches: this.genPatches(),
    }
  }

  genPatches() {
    return this.imgData.map((item) => {
      return {
        op: 'replace',
        path: `/attributes/${getImageType(item.type)}`,
        value: this.genValue(item.url),
      }
    })
  }

  genValuesMap() {
    const obj: Recordable = {}
    this.imgData.forEach((item) => {
      obj[getImageType(item.type) as string] = this.genValue(item.url)
    })
    return obj
  }

  genValue(value: string) {
    return [
      {
        media_location: value,
      },
    ]
  }
}
