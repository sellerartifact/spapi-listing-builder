import type { ProductData } from '@/help/state'

export const listingData: ProductData = {
  sku: 'SKU-1234',
  product_type: 'HOME',
  title: 'i am product title',
  product_description: 'i am product description',
  bullet_points: [
    'i am bullet point 1',
    'i am bullet point 2',
  ],
  brand_name: 'i am brand name',
  product_identifier_type: 'EAN',
  product_identifier_id: '123457689',
  condition: 'new_new',
  manufacturer: 'your manufacturer',
  manufactuer_id: '9527',
  weight: 1,
  height: 1,
  length: 2,
  width: 3,
  recommendedBrowseNodes: ['123', '456'],
  is_electric: 0,
  search_terms: 'i am search terms',
  quantity: 99,
  deal_time: 2,
  sell_price: 66.77,
  country_of_origin: 'CN',
  item_type_keyword: 'SHOES',
  imgs: [{
    type: 'Main',
    url: 'https://example.com/main.jpg',
  }, {
    type: 'Swatch',
    url: 'https://example.com/swatch.jpg',
  }, {
    type: 'PT1',
    url: 'https://example.com/pt1.jpg',
  }],
}

export const parentListingData: ProductData = {
  ...listingData,
  sku: 'SKU-parent01',
  parentage_num: 2,
  parentage: 'parent',
}

export const childListingData1: ProductData = {
  ...listingData,
  sku: 'SKU-child01',
  parentage: 'child',
  color: 'red',
  size: 'XL',
}

export const childListingData2: ProductData = {
  ...listingData,
  sku: 'SKU-child02',
  parentage: 'child',
  color: 'blue',
  size: 'XL',
}
