import { combineObjAttr, renderListingArrValue } from '@/help'
import type { Recordable } from '@/help/state'

export class ChildParentSkuRelationship {
  parent_sku: string | undefined
  constructor(parent_sku?: string) {
    this.parent_sku = parent_sku
  }

  main() {
    const obj: Recordable = {
      child_relationship_type: 'variation',
    }
    combineObjAttr(Boolean(this.parent_sku), obj, 'parent_sku', this.parent_sku)
    return renderListingArrValue(obj)
  }
}
