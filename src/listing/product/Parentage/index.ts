import { filterUndefinedKeys } from '@/help'
import type { ProductData } from '@/help/state'
import { ChildParentSkuRelationship, Color, ParentageLevel, Size, VariationTheme } from './help'

export class ProductParentage {
  data: ProductData
  marketplace_id: string
  constructor(marketplace_id: string, data: ProductData) {
    this.marketplace_id = marketplace_id
    this.data = data
  }

  main() {
    const data = this.data
    return filterUndefinedKeys({
      variation_theme: new VariationTheme(data.variation_theme).main(),
      color: new Color(data.color).main(),
      size: new Size(data.size).main(),
      parentage_level: new ParentageLevel(data.parentage).main(),
      child_parent_sku_relationship: new ChildParentSkuRelationship(data.parent_sku).main(),
    })
  }
}
