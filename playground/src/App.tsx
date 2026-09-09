import { ActionIcon, AppShell, Button, Code, Divider, Group, NumberInput, Paper, SegmentedControl, Select, SimpleGrid, Stack, Switch, Tabs, Text, TextInput, Title, Tooltip } from '@mantine/core'
import { IconCopy, IconDownload, IconPlus, IconRefresh, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { FeedImg } from '../../src/feed/img'
import { FeedPrice } from '../../src/feed/price'
import { FeedProduct } from '../../src/feed/product'
import { FeedQuantity } from '../../src/feed/quantity'
import { FeedRelation } from '../../src/feed/relation'
import { ListingProduct } from '../../src/listing/product'
import type { ListingType, ProductData } from '../../src/help/state'

type FeedKind = 'product' | 'price' | 'quantity' | 'images' | 'relation'
const marketplaceId = 'ATVPDKIKX0DER'
const defaultListing: ProductData = { sku: 'PLAYGROUND-SKU-001', product_type: 'HOME', title: 'Cotton storage basket', product_description: 'A durable basket for everyday home organization.', brand_name: 'Example Brand', product_identifier_type: 'EAN', product_identifier_id: '1234567890123', condition: 'new_new', manufacturer: 'Example Manufacturer', manufactuer_id: 'BASKET-001', quantity: 24, deal_time: 2, sell_price: 24.99, list_price: 29.99, weight: 0.8, height: 20, length: 30, width: 25, country_of_origin: 'CN', item_type_keyword: 'storage basket', imgs: [{ type: 'Main', url: 'https://example.com/basket.jpg' }] }

function parseNumber(value: string | number | undefined) {
  if (value === '' || value === undefined)
    return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

function OutputPreview({ value, filename, code }: { value: unknown, filename: string, code: string }) {
  const [activeTab, setActiveTab] = useState<string | null>('json')
  const json = JSON.stringify(value, null, 2)
  const copy = () => navigator.clipboard.writeText(activeTab === 'typescript' ? code : json)
  const download = () => {
    const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = filename
    anchor.click()
    URL.revokeObjectURL(url)
  }
  return (
    <Paper className="output-panel" p="md" radius="sm" withBorder>
      <Tabs onChange={setActiveTab} value={activeTab}>
        <Group justify="space-between" mb="sm">
          <Tabs.List>
            <Tabs.Tab value="json">Generated JSON</Tabs.Tab>
            <Tabs.Tab value="typescript">TypeScript code</Tabs.Tab>
          </Tabs.List>
          <Group gap="xs">
            <Tooltip label={activeTab === 'typescript' ? 'Copy TypeScript code' : 'Copy JSON'}>
              <ActionIcon aria-label={activeTab === 'typescript' ? 'Copy TypeScript code' : 'Copy JSON'} onClick={copy} variant="subtle">
                <IconCopy size={18} />
              </ActionIcon>
            </Tooltip>
            {activeTab === 'json' && (
              <Tooltip label="Download JSON">
                <ActionIcon aria-label="Download JSON" onClick={download} variant="subtle">
                  <IconDownload size={18} />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>
        </Group>
        <Tabs.Panel value="json">
          <Code block>{json}</Code>
        </Tabs.Panel>
        <Tabs.Panel value="typescript">
          <Code block>{code}</Code>
        </Tabs.Panel>
      </Tabs>
    </Paper>
  )
}

function objectLiteral(value: unknown) {
  return JSON.stringify(value, null, 2)
}

function ListingBuilder() {
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
            <SegmentedControl data={[{ label: 'Listing', value: 'LISTING' }, { label: 'Follow ASIN', value: 'FOLLOW_ASIN' }]} value={listingType} onChange={value => setListingType(value as ListingType)} />
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

function FeedBuilder() {
  const [kind, setKind] = useState<FeedKind>('product')
  const [sellerId, setSellerId] = useState('PLAYGROUND-SELLER')
  const [rows, setRows] = useState<any[]>([{ sku: 'PLAYGROUND-SKU-001', sell_price: 24.99, quantity: 0, deal_time: 2, parent_sku: 'PARENT-SKU-001', product_type: 'HOME', title: 'Feed product', imgs: [{ type: 'Main', url: 'https://example.com/item.jpg' }] }])
  const replace = (index: number, key: string, value: unknown) => setRows(current => current.map((row, rowIndex) => rowIndex === index ? { ...row, [key]: value } : row))
  const output = kind === 'product' ? new FeedProduct(sellerId, marketplaceId, rows).main() : kind === 'price' ? new FeedPrice(sellerId, rows).main() : kind === 'quantity' ? new FeedQuantity(sellerId, rows).main() : kind === 'images' ? new FeedImg(sellerId, rows).main() : new FeedRelation(sellerId, rows).main()
  const feedCode = {
    product: `new FeedProduct(${JSON.stringify(sellerId)}, ${JSON.stringify(marketplaceId)}, ${objectLiteral(rows)}).main()`,
    price: `new FeedPrice(${JSON.stringify(sellerId)}, ${objectLiteral(rows)}).main()`,
    quantity: `new FeedQuantity(${JSON.stringify(sellerId)}, ${objectLiteral(rows)}).main()`,
    images: `new FeedImg(${JSON.stringify(sellerId)}, ${objectLiteral(rows)}).main()`,
    relation: `new FeedRelation(${JSON.stringify(sellerId)}, ${objectLiteral(rows)}).main()`,
  }[kind]
  const code = `import { ${kind === 'product' ? 'FeedProduct' : kind === 'price' ? 'FeedPrice' : kind === 'quantity' ? 'FeedQuantity' : kind === 'images' ? 'FeedImg' : 'FeedRelation'} } from 'spapi-listing-builder'

const feed = ${feedCode}`
  const add = () => setRows(current => [...current, { ...current[0], sku: `PLAYGROUND-SKU-${current.length + 1}` }])
  const remove = (index: number) => setRows(current => current.length === 1 ? current : current.filter((_, currentIndex) => currentIndex !== index))
  return (
    <div className="workspace-grid">
      <Paper p="md" radius="sm" withBorder>
        <Group justify="space-between" mb="md">
          <div>
            <Text fw={600}>Feed input</Text>
            <Text c="dimmed" size="sm">Edit messages, then export the feed.</Text>
          </div>
          <Group gap="xs">
            <Tooltip label="Reset rows"><ActionIcon aria-label="Reset rows" onClick={() => setRows([rows[0]])} variant="subtle"><IconRefresh size={18} /></ActionIcon></Tooltip>
            <Button leftSection={<IconPlus size={16} />} onClick={add}>Add row</Button>
          </Group>
        </Group>
        <TextInput label="Seller ID" mb="md" value={sellerId} onChange={event => setSellerId(event.currentTarget.value)} />
        <SegmentedControl fullWidth data={[{ label: 'Product', value: 'product' }, { label: 'Price', value: 'price' }, { label: 'Quantity', value: 'quantity' }, { label: 'Images', value: 'images' }, { label: 'Relation', value: 'relation' }]} value={kind} onChange={value => setKind(value as FeedKind)} />
        <Stack mt="md">
          {rows.map((item, index) => (
            <Paper key={`${item.sku}-${index}`} p="sm" radius="sm" withBorder>
              <Group justify="space-between" mb="sm">
                <Text fw={600} size="sm">
                  Message
                  {' '}
                  {index + 1}
                </Text>
                <Tooltip label="Remove row"><ActionIcon aria-label="Remove row" color="red" disabled={rows.length === 1} onClick={() => remove(index)} variant="subtle"><IconTrash size={18} /></ActionIcon></Tooltip>
              </Group>
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <TextInput label="SKU" value={item.sku} onChange={event => replace(index, 'sku', event.currentTarget.value)} />
                {kind === 'product' && <TextInput label="Product type" value={item.product_type} onChange={event => replace(index, 'product_type', event.currentTarget.value)} />}
                {kind === 'product' && <TextInput label="Title" value={item.title} onChange={event => replace(index, 'title', event.currentTarget.value)} />}
                {kind === 'price' && <NumberInput label="Selling price" value={item.sell_price} onChange={value => replace(index, 'sell_price', parseNumber(value) ?? 0)} min={0} />}
                {kind === 'quantity' && <NumberInput label="Quantity" value={item.quantity} onChange={value => replace(index, 'quantity', parseNumber(value) ?? 0)} min={0} />}
                {kind === 'quantity' && <NumberInput label="Lead time" value={item.deal_time} onChange={value => replace(index, 'deal_time', parseNumber(value) ?? 0)} min={0} />}
                {kind === 'images' && <TextInput label="Main image URL" value={item.imgs[0].url} onChange={event => replace(index, 'imgs', [{ type: 'Main', url: event.currentTarget.value }])} />}
                {kind === 'relation' && <TextInput label="Parent SKU" value={item.parent_sku} onChange={event => replace(index, 'parent_sku', event.currentTarget.value)} />}
              </SimpleGrid>
            </Paper>
          ))}
        </Stack>
      </Paper>
      <OutputPreview code={code} filename={`${kind}-feed.json`} value={output} />
    </div>
  )
}

export function App() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" justify="space-between" px="lg">
          <Title order={3}>SP-API Listing Builder</Title>
          <Text c="dimmed" size="sm">Interactive payload playground</Text>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <main className="app-content">
          <Tabs defaultValue="listing">
            <Tabs.List>
              <Tabs.Tab value="listing">Listing builder</Tabs.Tab>
              <Tabs.Tab value="feed">Feed builder</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel pt="md" value="listing"><ListingBuilder /></Tabs.Panel>
            <Tabs.Panel pt="md" value="feed"><FeedBuilder /></Tabs.Panel>
          </Tabs>
        </main>
      </AppShell.Main>
    </AppShell>
  )
}
