import { filterUndefinedKeys } from '@/help'
import { ListingImg } from '@/listing/img'
import { ListingPrice } from '@/listing/price'
import { ListingQuantity } from '@/listing/quantity'
import type { ProductData } from '@/help/state'
import { BatteriesRequired, Brand, BulletPoint, Condition, CountryOfOrigin, Description, GenericKeyword, GiftOptions, ItemDimensions, ItemName, ItemPackageQuantity, ItemTypeKeyword, ItemWeight, Manufacturer, MaxOrderQuantity, NumberOfItems, PartNumber, ProductIdentifier, ProductTaxCode, RecommendedBrowseNodes, SupplierDeclaredDgHzRegulation } from './help'

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
      purchasable_offer: data.sell_price && new ListingPrice({ sell_price: data.sell_price }).genValue(),
      fulfillment_availability: data.quantity && new ListingQuantity({ quantity: data.quantity, deal_time: data.deal_time }).genValue(),
      item_name: new ItemName(data.title).main(),
      BatteriesRequired: new BatteriesRequired(data.is_electric).main(),
      manufacturer: new Manufacturer(data.manufacturer).main(),
      item_weight: new ItemWeight(data.weight).main(),
      gift_options: new GiftOptions().main(),
      product_tax_code: new ProductTaxCode().main(),
      item_type_keyword: new ItemTypeKeyword(data.item_type_keyword).main(),
      condition_type: new Condition(data.condition).main(),
      number_of_items: new NumberOfItems().main(),
      externally_assigned_product_identifier: data.product_identifier_type && new ProductIdentifier(data.product_identifier_type, data.product_id).main(),
      recommended_browse_nodes: data.recommendedBrowseNodes && new RecommendedBrowseNodes(data.recommendedBrowseNodes).main(),
      bullet_point: new BulletPoint(data.bullet_points).main(),
      item_package_quantity: new ItemPackageQuantity().main(),
      item_dimensions: data.length1 && new ItemDimensions(data.length1, data.length2, data.length3).main(),
      part_number: new PartNumber(data.manufactuer_id).main(),
      max_order_quantity: new MaxOrderQuantity().main(),
      product_description: new Description(data.product_description).main(),
      supplier_declared_dg_hz_regulation: new SupplierDeclaredDgHzRegulation().main(),
      brand: new Brand(data.brand_name).main(),
      generic_keyword: new GenericKeyword(data.search_terms).main(),
      country_of_origin: new CountryOfOrigin(data.country_of_origin).main(),
      ...(data.imgs ? new ListingImg(data.imgs).genValuesMap() : []),
    })
  }
}
