import { renderListingArrValue } from '@/help'

// 品牌豁免需要设置为true
export class SupplierDeclaredHasProductIdentifierExemption {
  supplier_declared_has_product_identifier_exemption
  constructor(supplier_declared_has_product_identifier_exemption: boolean) {
    this.supplier_declared_has_product_identifier_exemption = supplier_declared_has_product_identifier_exemption
  }

  main() {
    return renderListingArrValue(Boolean(this.supplier_declared_has_product_identifier_exemption))
  }
}
