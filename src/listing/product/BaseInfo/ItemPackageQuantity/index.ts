import { renderListingArrValue } from '@/help'

export class ItemPackageQuantity {
  item_package_quantity: number
  constructor(item_package_quantity: number = 1) {
    this.item_package_quantity = item_package_quantity
  }

  main() {
    return renderListingArrValue(this.item_package_quantity)
  }
}
