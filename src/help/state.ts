export const imageTypeJsonMap: {
  [key: string]: string
} = {
  Main: 'main_product_image_locator',
  Swatch: 'swatch_product_image_locator',
  PT1: 'other_product_image_locator_1',
  PT2: 'other_product_image_locator_2',
  PT3: 'other_product_image_locator_3',
  PT4: 'other_product_image_locator_4',
  PT5: 'other_product_image_locator_5',
  PT6: 'other_product_image_locator_6',
  PT7: 'other_product_image_locator_7',
  PT8: 'other_product_image_locator_8',
  MainOfferImage: 'main_offer_image_locator',
  OfferImage1: 'other_offer_image_locator_1',
  OfferImage2: 'other_offer_image_locator_2',
  OfferImage3: 'other_offer_image_locator_3',
  OfferImage4: 'other_offer_image_locator_4',
  OfferImage5: 'other_offer_image_locator_5',
  EEGL: 'image_locator_eegl',
}

export type Recordable<T = any> = Record<string, T>

export type ListingType = 'FOLLOW_ASIN' | 'LISTING'

export interface ListingImgData {
  type: string
  val: string
}

export interface ProductData {
  title: string
  product_description: string
  bullet_points: string[]
  brand_name?: string
  condition?: string
  imgs: ListingImgData[]
  [key: string]: any
}
