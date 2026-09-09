import { Divider, Group, NumberInput, Paper, SegmentedControl, Select, SimpleGrid, Stack, Switch, Text, TextInput } from '@mantine/core'
import { useState } from 'react'
import { ListingProduct } from '../../../src/listing/product'
import { OutputPreview } from '../components/OutputPreview'
import { objectLiteral, parseNumber } from '../utils/code'
import type { ListingType, ProductData } from '../../../src/help/state'

const marketplaceId = 'ATVPDKIKX0DER'

const defaultListing: ProductData = {
  sku: 'PLAYGROUND-SKU-001',
  product_type: 'HOME',
  title: 'Cotton storage basket',
  product_description: 'A durable basket for everyday home organization.',
  brand_name: 'Example Brand',
  product_identifier_type: 'EAN',
  product_identifier_id: '1234567890123',
  condition: 'new_new',
  manufacturer: 'Example Manufacturer',
  manufactuer_id: 'BASKET-001',
  quantity: 24,
  deal_time: 2,
  sell_price: 24.99,
  list_price: 29.99,
  weight: 0.8,
  height: 20,
  length: 30,
  width: 25,
  country_of_origin: 'CN',
  item_type_keyword: 'storage basket',
  imgs: [{ type: 'Main', url: 'https://example.com/basket.jpg' }],
}

export function ListingBuilder() {
  const [listingType, setListingType] = useState<ListingType>('LISTING')
  const [data, setData] = useState<ProductData>(defaultListing)
  const [addListPrice, setAddListPrice] = useState(true)

  const update = (key: string, value: unknown) => setData(current => ({ ...current, [key]: value }))
  const builderData = addListPrice ? data : { ...data, list_price: undefined }
  const output = new ListingProduct({ marketplace_id: marketplaceId, data: builderData, type: listingType }).main()

  const code = `import { ListingProduct } from 'spapi-listing-builder'

const listing = new ListingProduct({
  marketplace_id: ${JSON.stringify(marketplaceId)},
  data: ${objectLiteral(builderData)},
  type: ${JSON.stringify(listingType)},
}).main()`

  return (
    <div className="workspace-grid">
      <Stack gap="md">
        <Paper p="md" radius="sm" withBorder>
          <Group justify="space-between" align="end" mb="md">
            <div>
              <Text fw={600}>Listing input</Text>
              <Text c="dimmed" size="sm">Build a single SP-API listing payload.</Text>
            </div>
            <SegmentedControl
              data={[{ label: 'Listing', value: 'LISTING' }, { label: 'Follow ASIN', value: 'FOLLOW_ASIN' }]}
              value={listingType}
              onChange={value => setListingType(value as ListingType)}
            />
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput label="SKU" value={data.sku ?? ''} onChange={event => update('sku', event.currentTarget.value)} />
            <TextInput label="Product type" value={data.product_type ?? ''} onChange={event => update('product_type', event.currentTarget.value)} />
            {listingType === 'FOLLOW_ASIN' && <TextInput label="ASIN" value={data.asin ?? ''} onChange={event => update('asin', event.currentTarget.value)} />}
            <TextInput label="Condition" value={data.condition ?? ''} onChange={event => update('condition', event.currentTarget.value)} />
            <NumberInput label="Quantity" value={data.quantity ?? ''} onChange={value => update('quantity', parseNumber(value))} min={0} />
            <NumberInput label="Lead time (days)" value={data.deal_time ?? ''} onChange={value => update('deal_time', parseNumber(value))} min={0} />
            <NumberInput label="Selling price" value={data.sell_price ?? ''} onChange={value => update('sell_price', parseNumber(value))} min={0} decimalScale={2} />
            {listingType === 'LISTING' && <NumberInput label="List price" value={data.list_price ?? ''} onChange={value => update('list_price', parseNumber(value))} min={0} decimalScale={2} />}
          </SimpleGrid>

          {listingType === 'LISTING' && (
            <>
              <Divider my="md" label="Product details" labelPosition="center" />
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <TextInput label="Title" value={data.title ?? ''} onChange={event => update('title', event.currentTarget.value)} />
                <TextInput label="Brand" value={data.brand_name ?? ''} onChange={event => update('brand_name', event.currentTarget.value)} />
                <Select label="Identifier type" data={['EAN', 'GTIN', 'UPC', 'ISBN']} value={data.product_identifier_type ?? null} onChange={value => update('product_identifier_type', value ?? '')} />
                <TextInput label="Identifier" value={data.product_identifier_id ?? ''} onChange={event => update('product_identifier_id', event.currentTarget.value)} />
                <TextInput label="Country of origin" value={data.country_of_origin ?? ''} onChange={event => update('country_of_origin', event.currentTarget.value)} />
                <TextInput label="Main image URL" value={data.imgs?.[0]?.url ?? ''} onChange={event => update('imgs', [{ type: 'Main', url: event.currentTarget.value }])} />
              </SimpleGrid>

              <Switch checked={addListPrice} label="Include list price attribute" mt="md" onChange={event => setAddListPrice(event.currentTarget.checked)} />
            </>
          )}
        </Paper>
      </Stack>

      <OutputPreview code={code} filename="listing.json" value={output} />
    </div>
  )
}
