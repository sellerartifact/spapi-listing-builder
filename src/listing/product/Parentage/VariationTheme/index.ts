import { renderListingArrValue } from '@/help'

export class VariationTheme {
  variation_theme: string
  constructor(variation_theme: string = 'SIZE_NAME/COLOR_NAME') {
    this.variation_theme = variation_theme
  }

  main() {
    return renderListingArrValue(this.variation_theme)
  }
}
