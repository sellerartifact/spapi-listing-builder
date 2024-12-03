# spapi-listing-builder

<p align="center">
  <a href="https://github.com/sellerartifact/spapi-listing-builder/blob/main/README_zh.md">中文</a>|
  <a href="./README.md">English</a>
</p>

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

_description_

> Used to quickly and efficiently generate and validate npm packages that conform to the Amazon SP-API LISTING JSON structure.

## install

```
pnpm install spapi-listing-builder --save
```

## Schema usage

- [Validate product data through schema](#Validate-product-data-through-schema)
- [Generate forms through schema](#Generate-forms-through-schema)

### Validate product data through schema

<details><summary>Example</summary>

```
import { SchemaCheck, ListingProduct } from 'spapi-listing-builder'
const schemaCheck = new SchemaCheck(myJsonSchema, {})
const myJsonSchema = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './schema/HOME.json')).toString(),
)

const listingData = {
  sku: "SKU-1234",
  product_type: "HOME",
  title: "i am product title",
  product_description: "i am product description",
  bullet_points: ["i am bullet point 1", "i am bullet point 2"],
  brand_name: "i am brand name",
  product_identifier_type: "EAN",
  product_identifier_id: "123457689",
  condition: "new_new",
  manufacturer: "your manufacturer",
  manufactuer_id: "9527",
  weight: 1,
  height: 1,
  length: 2,
  width: 3,
  recommendedBrowseNodes: ["123", "456"],
  is_electric: 0,
  search_terms: "i am search terms",
  quantity: 99,
  deal_time: 2,
  sell_price: 66.77,
  country_of_origin: "CN",
  item_type_keyword: "SHOES",
  imgs: [
    {
      type: "Main",
      url: "https://example.com/main.jpg",
    },
    {
      type: "Swatch",
      url: "https://example.com/swatch.jpg",
    },
    {
      type: "PT1",
      url: "https://example.com/pt1.jpg",
    },
  ],
};

const product = new ListingProduct({
  marketplace_id: "ATVPDKIKX0DER",
  data: listingData,
  renderOtherAttributesFn: ({ renderListingArrValue, data }) => {
    return {
      list_price: renderListingArrValue(data.sell_price),
    };
  },
}).main();

const schemaCheck = new SchemaCheck(myJsonSchema, product.attributes).validate();

[
  {
    type: 'error',
    name: 'NoAdditionalPropertiesError',
    code: 'no-additional-properties-error',
    message: 'Additional property `recommended_browse_nodes` in `#` is not allowed',
    data: {
      pointer: '#',
      schema: [Object],
      value: [Object],
      property: 'recommended_browse_nodes',
      properties: [Array]
    }
  },
  {
    type: 'error',
    name: 'RequiredPropertyError',
    code: 'required-property-error',
    message: 'The required property `model_number` is missing at `#`',
    data: {
      key: 'model_number',
      pointer: '#',
      schema: [Object],
      value: [Object]
    }
  },
  ...
]
```

</details>

### Generate forms through schema

<details><summary>Example</summary>

```
import { SchemaCheck } from 'spapi-listing-builder'
const schemaCheck = new SchemaCheck(myJsonSchema, {})

// 返回所有schema项的表单
schemaCheck.convert2FormItems()

// 返回schema必填项的表单
schemaCheck.convertRequiredSchema2FormItems()

[{
    "field": "brand",
    "label": "Brand Name",
    "component": "Input",
    "componentProps": {
      "placeholder": "Provide the brand name of the product",
      "max": 100,
      "min": 1
    },
    "required": true
  },
  {
    "field": "bullet_point",
    "label": "Key Product Features",
    "component": "Input",
    "componentProps": {
      "placeholder": "Brief descriptive text, called out via a bullet point, regarding a specific aspect of the product. These display directly under or next to your product photo, it is useful to put interesting information in these fields. Do NOT use all caps or abbreviations. Please do NOT use for fabric content, care instructions or country as these are populated in different fields.",
      "max": 700,
      "min": 0
    },
    "required": true
  },
  {
    "field": "country_of_origin",
    "label": "Country of Publication",
    "component": "Select",
    "componentProps": {
      "placeholder": "Select the product's country of origin",
      "options": [...anyOptions]
    },
    "required": true
  },
  {
    "field": "item_name",
    "label": "Product Name",
    "component": "Input",
    "componentProps": {
      "placeholder": "Provide a title for the item that may be customer facing",
      "max": 200,
      "min": 0
    },
    "required": true
  },
  ...otherItems
]

```

</details>

## Listing usage

- [ListingProduct](#ListingProduct)
- upload follow asin product [ListingProduct](#upload-follow-asin-product)
- [ListingQuantity](#ListingQuantity)
- [ListingPrice](#ListingPrice)
- [ListingImg](#ListingImg)
- [ListingRelation](#ListingRelation)

### ListingProduct

<details><summary>Example</summary>

```
import { ListingProduct } from 'spapi-listing-builder'

const listingData = {
  sku: "SKU-1234",
  product_type: "HOME",
  title: "i am product title",
  product_description: "i am product description",
  bullet_points: ["i am bullet point 1", "i am bullet point 2"],
  brand_name: "i am brand name",
  product_identifier_type: "EAN",
  product_identifier_id: "123457689",
  condition: "new_new",
  manufacturer: "your manufacturer",
  manufactuer_id: "9527",
  weight: 1,
  height: 1,
  length: 2,
  width: 3,
  recommendedBrowseNodes: ["123", "456"],
  is_electric: 0,
  search_terms: "i am search terms",
  quantity: 99,
  deal_time: 2,
  sell_price: 66.77,
  country_of_origin: "CN",
  item_type_keyword: "SHOES",
  imgs: [
    {
      type: "Main",
      url: "https://example.com/main.jpg",
    },
    {
      type: "Swatch",
      url: "https://example.com/swatch.jpg",
    },
    {
      type: "PT1",
      url: "https://example.com/pt1.jpg",
    },
  ],
};

new ListingProduct({
    marketplace_id: 'ATVPDKIKX0DER',
    data: listingData,
    renderOtherAttributesFn: ({ renderListingArrValue, data }) => {
    return {
        list_price: renderListingArrValue(data.sell_price),
    }
  },
}).main()

// Result
{
  "productType": "HOME",
  "requirements": "LISTING",
  "attributes": {
    "purchasable_offer": [
      {
        "our_price": [
          {
            "schedule": [
              {
                "value_with_tax": 66.77
              }
            ]
          }
        ]
      }
    ],
    "fulfillment_availability": [
      {
        "fulfillment_channel_code": "DEFAULT",
        "quantity": 99,
        "lead_time_to_ship_max_days": 2
      }
    ],
    "item_name": [
      {
        "value": "i am product title"
      }
    ],
    "manufacturer": [
      {
        "value": "your manufacturer"
      }
    ],
    "item_weight": [
      {
        "unit": "kilograms",
        "value": "1.00"
      }
    ],
    "gift_options": [
      {
        "can_be_messaged": "false",
        "can_be_wrapped": "false"
      }
    ],
    "item_type_keyword": [
      {
        "value": "SHOES"
      }
    ],
    "condition_type": [
      {
        "value": "new_new"
      }
    ],
    "number_of_items": [
      {
        "value": "1"
      }
    ],
    "externally_assigned_product_identifier": [
      {
        "value": "123457689",
        "type": "EAN"
      }
    ],
    "recommended_browse_nodes": [
      [
        {
          "value": "123"
        }
      ],
      [
        {
          "value": "456"
        }
      ]
    ],
    "bullet_point": [
      {
        "value": "i am bullet point 1"
      },
      {
        "value": "i am bullet point 2"
      }
    ],
    "item_package_quantity": [
      {
        "value": "1"
      }
    ],
    "item_dimensions": [
      {
        "height": {
          "unit": "centimeters",
          "value": 1
        },
        "length": {
          "unit": "centimeters",
          "value": 2
        },
        "width": {
          "unit": "centimeters",
          "value": 3
        }
      }
    ],
    "part_number": [
      {
        "value": "9527"
      }
    ],
    "max_order_quantity": [
      {
        "value": "100"
      }
    ],
    "product_description": [
      {
        "value": "i am product description"
      }
    ],
    "supplier_declared_dg_hz_regulation": [
      {
        "value": "not_applicable"
      }
    ],
    "brand": [
      {
        "value": "i am brand name"
      }
    ],
    "generic_keyword": [
      {
        "value": "i am search terms"
      }
    ],
    "country_of_origin": [
      {
        "value": "CN"
      }
    ],
    "main_product_image_locator": [
      {
        "media_location": "https://example.com/main.jpg"
      }
    ],
    "swatch_product_image_locator": [
      {
        "media_location": "https://example.com/swatch.jpg"
      }
    ],
    "other_product_image_locator_1": [
      {
        "media_location": "https://example.com/pt1.jpg"
      }
    ],
    "list_price": [
      {
        "value": "66.77"
      }
    ]
  }
}

```

</details>

### upload follow asin product

<details><summary>Example</summary>

```
const follow_goods = new ListingProduct({ marketplace_id: 'ATVPDKIKX0DER', data: {
  product_type: 'HOME',
  asin: 'B07Z8Z1VCC',
  condition: 'New',
  quantity: 100,
  deal_time: 3,
  sell_price: 88.88,
}, type: 'FOLLOW_ASIN' }).main()

// Result
{
  "productType": "HOME",
  "requirements": "LISTING_OFFER_ONLY",
  "attributes": {
    "condition_type": [
      {
        "value": "New"
      }
    ],
    "merchant_suggested_asin": [
      {
        "value": "B07Z8Z1VCC"
      }
    ],
    "fulfillment_availability": [
      {
        "fulfillment_channel_code": "DEFAULT",
        "quantity": 100,
        "lead_time_to_ship_max_days": 3
      }
    ],
    "purchasable_offer": [
      {
        "our_price": [
          {
            "schedule": [
              {
                "value_with_tax": 88.88
              }
            ]
          }
        ]
      }
    ]
  }
}
```

</details>

### ListingQuantity

<details><summary>Example</summary>

```
import { ListingQuantity } from "spapi-listing-builder";

new ListingQuantity({ quantity: 3, deal_time: 2 })

// Result

{
  "op": "replace",
  "path": "/attributes/fulfillment_availability",
  "value": [
    {
      "audience": "ALL",
      "quantity": 3,
      "lead_time_to_ship_max_days": 2
    }
  ]
}
```

</details>

### ListingPrice

<details><summary>Example</summary>

```
import { ListingPrice } from "spapi-listing-builder";

new ListingPrice({ sell_price: 100, low_price: 90, max_price: 110 }).main()

// Result

{
  "op": "replace",
  "path": "/attributes/purchasable_offer",
  "value": [
    {
      "audience": "ALL",
      "our_price": [
        {
          "schedule": [
            {
              "value_with_tax": 100
            }
          ]
        }
      ],
      "minimum_seller_allowed_price": [
        {
          "schedule": [
            {
              "value_with_tax": 90
            }
          ]
        }
      ],
      "maximum_seller_allowed_price": [
        {
          "schedule": [
            {
              "value_with_tax": 110
            }
          ]
        }
      ]
    }
  ]
}

```

</details>

### ListingImg

<details><summary>Example</summary>

```
import { ListingImg } from "spapi-listing-builder";

new ListingImg([
    { type: 'Main', url: 'http://main.jpg' },
    { type: 'Swatch', url: 'http://thumb.jpg' },
]).main()

// Result

[
  {
    "op": "replace",
    "path": "/attributes/main_product_image_locator",
    "value": [
      {
        "media_location": "http://main.jpg"
      }
    ]
  },
  {
    "op": "replace",
    "path": "/attributes/swatch_product_image_locator",
    "value": [
      {
        "media_location": "http://thumb.jpg"
      }
    ]
  }
]
```

</details>

### ListingRelation

<details><summary>Example</summary>

```
import { ListingRelation } from "spapi-listing-builder";

new ListingRelation('parent_sku123').main()

// Result

{
  "op": "replace",
  "path": "/attributes/child_parent_sku_relationship",
  "value": [
    {
      "child_relationship_type": "variation",
      "parent_sku": "parent_sku123"
    }
  ]
}
```

</details>

## Feed usage

- [FeedProduct](#FeedProduct)
- [FeedQuantity](#FeedQuantity)
- [FeedPrice](#FeedPrice)
- [FeedImg](#FeedImg)
- [FeedRelation](#FeedRelation)

### FeedProduct

<details><summary>Example</summary>

```
import { FeedProduct } from 'spapi-listing-builder'

new FeedProduct('sellerId', 'ATVPDKIKX0DER', [listingData, parentListingData])

// Result

{
  "header": {
    "sellerId": "sellerId",
    "version": "2.0",
    "issueLocale": "en_US"
  },
  "messages": [
    {
      "messageId": 1,
      "sku": "SKU-1234",
      "operationType": "UPDATE",
      "productType": "HOME",
      "requirements": "LISTING",
      "attributes": listingDataAttributes
    },
    {
      "messageId": 2,
      "sku": "SKU-parent01",
      "operationType": "UPDATE",
      "productType": "HOME",
      "requirements": "LISTING",
      "attributes": parentListingDataAttributes
    }
  ]
}
```

</details>

### FeedQuantity

<details><summary>Example</summary>

```
import { FeedQuantity } from 'spapi-listing-builder'

new FeedQuantity('sellerId', [{ sku: 'sku-1', quantity: 100, deal_time: 3 }])

// Result
{
  "header": {
    "sellerId": "sellerId",
    "version": "2.0",
    "issueLocale": "en_US"
  },
  "messages": [
    {
      "messageId": 1,
      "sku": "sku-1",
      "operationType": "PATCH",
      "productType": "PRODUCT",
      "patches": [
        {
          "op": "replace",
          "path": "/attributes/fulfillment_availability",
          "value": [
            {
              "fulfillment_channel_code": "DEFAULT",
              "quantity": 100,
              "lead_time_to_ship_max_days": 3
            }
          ]
        }
      ]
    }
  ]
}
```

</details>

### FeedPrice

<details><summary>Example</summary>

```
import { FeedPrice } from 'spapi-listing-builder'

new FeedPrice('sellerId', [{ country_code: 'us', sku: 'sku-1', sell_price: 100 }])

// Result
{
  "header": {
    "sellerId": "sellerId",
    "version": "2.0",
    "issueLocale": "en_US"
  },
  "messages": [
    {
      "messageId": 1,
      "sku": "sku-1",
      "operationType": "PATCH",
      "productType": "PRODUCT",
      "patches": [
        {
          "op": "replace",
          "path": "/attributes/purchasable_offer",
          "value": [
            {
              "audience": "ALL",
              "our_price": [
                {
                  "schedule": [
                    {
                      "value_with_tax": 100
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

</details>

### FeedImg

<details><summary>Example</summary>

```
import { FeedImg } from 'spapi-listing-builder'

new FeedImg('sellerId', [
    {
      sku: 'sku-1',
      imgs: [
        { type: 'Main', url: 'http://main.jpg' },
        { type: 'Swatch', url: 'http://thumb.jpg' },
      ],
    },
])

// Result
{
  "header": {
    "sellerId": "sellerId",
    "version": "2.0",
    "issueLocale": "en_US"
  },
  "messages": [
    {
      "messageId": 1,
      "sku": "sku-1",
      "operationType": "PATCH",
      "productType": "PRODUCT",
      "patches": [
        {
          "op": "replace",
          "path": "/attributes/main_product_image_locator",
          "value": [
            {
              "media_location": "http://main.jpg"
            }
          ]
        },
        {
          "op": "replace",
          "path": "/attributes/swatch_product_image_locator",
          "value": [
            {
              "media_location": "http://thumb.jpg"
            }
          ]
        }
      ]
    }
  ]
}
```

</details>

### FeedRelation

<details><summary>Example</summary>

```
import { FeedRelation } from 'spapi-listing-builder'

new FeedRelation('sellerId', [
  { sku: 'child-sku', parent_sku: 'parent_sku-123' }
])

// Result
{
  "header": {
    "sellerId": "sellerId",
    "version": "2.0",
    "issueLocale": "en_US"
  },
  "messages": [
    {
      "messageId": 1,
      "sku": "child-sku",
      "operationType": "PATCH",
      "productType": "LUGGAGE",
      "patches": [
        {
          "op": "replace",
          "path": "/attributes/child_parent_sku_relationship",
          "value": [
            {
              "child_relationship_type": "variation",
              "parent_sku": "parent_sku-123"
            }
          ]
        }
      ]
    }
  ]
}

```

</details>

## utils

- [renderListingArrValue](#renderListingArrValue)

### renderListingArrValue

<details><summary>Example</summary>

```

import { renderListingArrValue } from 'spapi-listing-builder'

renderListingArrValue('test')

// Result
[
  {
    "value": "test"
  }
]

renderListingArrValue(true)

// Result
[
  {
    "value": 'true'
  }
]

renderListingArrValue({
  height: {
    unit: 'centimeters',
    value: 1,
  },
  length: {
    unit: 'centimeters',
    value: 2,
  },
  width: {
    unit: 'centimeters',
    value: 3,
  },
})

// Result
[
  {
    height: {
      unit: 'centimeters',
      value: 1,
    },
    length: {
      unit: 'centimeters',
      value: 2,
    },
    width: {
      unit: 'centimeters',
      value: 3,
    },
  },
]

```

</details>

## Reference

- [json-schema-library](https://github.com/sagold/json-schema-library)
- [migrating-product-feeds-workflows](https://developer-docs.amazon.com/sp-api/docs/listing-workflow-migration-tutorial#migrating-product-feeds-workflows)

## License

[MIT](./LICENSE) License © 2024-PRESENT [wangjue666](https://github.com/wangjue666)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/spapi-listing-builder?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/spapi-listing-builder
[npm-downloads-src]: https://img.shields.io/npm/dm/spapi-listing-builder?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/spapi-listing-builder
[bundle-src]: https://img.shields.io/bundlephobia/minzip/spapi-listing-builder?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=spapi-listing-builder
[license-src]: https://img.shields.io/github/license/sellerartifact/spapi-listing-builder.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/sellerartifact/spapi-listing-builder/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/spapi-listing-builder
