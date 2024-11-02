import { filterUndefinedKeys } from '@/help'
import { ListingImg } from '@/listing/img'
import { ListingPrice } from '@/listing/price'
import { ListingQuantity } from '@/listing/quantity'
import type { ProductData } from '@/help/state'
import { Brand, BulletPoint, Condition, Description, GenericKeyword, ItemName, ItemWeight, Manufacturer, PartNumber, ProductIdentifier, RecommendedBrowseNodes } from './help'

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
      purchasable_offer: new ListingPrice({ sell_price: data.sell_price }).genValue(),
      fulfillment_availability: new ListingQuantity({ quantity: data.quantity, deal_time: data.deal_time }).genValue(),
      item_name: new ItemName(data.title).main(),
      manufacturer: new Manufacturer(data.vendor).main(),
      item_weight: new ItemWeight(data.weight).main(),
      condition_type: new Condition(data.condition).main(),
      externally_assigned_product_identifier: new ProductIdentifier(data.product_type, data.product_id).main(),
      recommended_browse_nodes: new RecommendedBrowseNodes(data.recommendedBrowseNodes).main(),
      bullet_point: new BulletPoint(data.bullet_points).main(),
      part_number: new PartNumber(data.manufactuer_id).main(),
      product_description: new Description(data.product_description).main(),
      brand: new Brand(data.brand_name).main(),
      generic_keyword: new GenericKeyword(data.search_terms).main(),
      ...new ListingImg(data.imgs).genValuesMap(),
    })
  }
}
