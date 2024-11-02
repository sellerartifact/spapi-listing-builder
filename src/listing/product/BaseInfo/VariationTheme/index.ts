import { renderListingArrValue } from '@/help'

export class VariationTheme {
  variation_theme: string
  constructor(variation_theme: string = 'A_GEN_NOTAX') {
    this.variation_theme = variation_theme
  }

  main() {
    return renderListingArrValue(this.variation_theme)
  }
}
