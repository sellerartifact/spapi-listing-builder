import { filterUndefinedKeys } from '@/help'
import { ListingImg } from '@/listing/img'
import type { ProductData } from '@/help/state'
import { Brand, BulletPoint, Condition, Description, ItemName } from './help'

export * from './help'

export class ProductBaseInfo {
  data: ProductData
  marketplace_id: string
  constructor(marketplace_id: string, data: ProductData) {
    this.marketplace_id = marketplace_id
    this.data = data
  }

  main() {
    const data = this.data
    return filterUndefinedKeys({
      condition_type: new Condition(data.condition).main(),
      item_name: new ItemName(data.title).main(),
      brand: new Brand(data.brand_name).main(),
      product_description: new Description(data.product_description).main(),
      bullet_point: new BulletPoint(data.bullet_points).main(),
      ...new ListingImg(data.imgs).genValuesMap(),
    })
  }
}
