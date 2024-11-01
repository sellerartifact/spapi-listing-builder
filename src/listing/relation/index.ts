export class ListingRelation {
  parent_sku: string
  constructor(parent_sku: string) {
    this.parent_sku = parent_sku
  }

  main() {
    return {
      productType: 'LUGGAGE',
      patches: [
        {
          op: 'replace',
          path: '/attributes/child_parent_sku_relationship',
          value: [
            {
              child_relationship_type: 'variation',
              parent_sku: this.parent_sku,
            },
          ],
        },
      ],
    }
  }
}
