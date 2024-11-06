# spapi-listing-builder

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

_description_

> 这是一个简单的npm包，用于快速高效地生成符合Amazon SP-API LISTING JSON列表。

## 安装

```
pnpm install spapi-listing-builder --save
```

## Listing接口相关用法

### 上传产品

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

// 返回结果
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

### 设置产品库存
```
import { ListingQuantity } from "spapi-listing-builder";

new ListingQuantity({ quantity: 3, deal_time: 2 })

// 返回结果

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

### 设置产品价格

```
import { ListingPrice } from "spapi-listing-builder";

new ListingPrice({ sell_price: 100, low_price: 90, max_price: 110 }).main()

// 返回结果

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

### 设置产品图片

```
import { ListingImg } from "spapi-listing-builder";

new ListingImg([
    { type: 'Main', url: 'http://main.jpg' },
    { type: 'Swatch', url: 'http://thumb.jpg' },
]).main()

// 返回结果

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

### 设置变体关系

```
import { ListingRelation } from "spapi-listing-builder";

new ListingRelation('parent_sku123').main()

// 返回结果

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
