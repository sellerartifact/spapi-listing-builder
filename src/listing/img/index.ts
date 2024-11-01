import { imageTypeJsonMap } from '../../help/state'

export interface ListingImgData {
  type: string
  val: string
}

export class ListingImg {
  imgData: ListingImgData[]
  constructor(imgData: ListingImgData[]) {
    this.imgData = imgData
  }

  main() {
    return {
      productType: 'PRODUCT',
      patches: this.genPatches(),
    }
  }

  genPatches() {
    const imgs = this.imgData
    return imgs.filter((item) => {
      return imageTypeJsonMap[item.type]
    }).map((item) => {
      return {
        op: 'replace',
        path: `/attributes/${imageTypeJsonMap[item.type]}`,
        value: [
          {
            media_location: item.val,
          },
        ],
      }
    })
  }
}
