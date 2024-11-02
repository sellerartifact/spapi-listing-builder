import { imageTypeJsonMap } from '../../help/state'
import type { ListingImgData, Recordable } from '../../help/state'

export class ListingImg {
  imgData: ListingImgData[]
  constructor(imgData: ListingImgData[]) {
    this.imgData = imgData.filter((item) => {
      return imageTypeJsonMap[item.type]
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
        path: `/attributes/${imageTypeJsonMap[item.type]}`,
        value: this.genValue(item.val),
      }
    })
  }

  genValuesMap() {
    const obj: Recordable = {}
    this.imgData.forEach((item) => {
      obj[imageTypeJsonMap[item.type]] = this.genValue(item.val)
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
