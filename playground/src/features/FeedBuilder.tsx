import { ActionIcon, Button, Group, NumberInput, Paper, SegmentedControl, SimpleGrid, Stack, Text, TextInput, Tooltip } from '@mantine/core'
import { IconPlus, IconRefresh, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { FeedImg } from '../../../src/feed/img'
import { FeedPrice } from '../../../src/feed/price'
import { FeedProduct } from '../../../src/feed/product'
import { FeedQuantity } from '../../../src/feed/quantity'
import { FeedRelation } from '../../../src/feed/relation'
import { OutputPreview } from '../components/OutputPreview'
import { objectLiteral, parseNumber } from '../utils/code'

type FeedKind = 'product' | 'price' | 'quantity' | 'images' | 'relation'

const marketplaceId = 'ATVPDKIKX0DER'

export function FeedBuilder() {
  const [kind, setKind] = useState<FeedKind>('product')
  const [sellerId, setSellerId] = useState('PLAYGROUND-SELLER')
  const [rows, setRows] = useState<any[]>([{ sku: 'PLAYGROUND-SKU-001', sell_price: 24.99, quantity: 0, deal_time: 2, parent_sku: 'PARENT-SKU-001', product_type: 'HOME', title: 'Feed product', imgs: [{ type: 'Main', url: 'https://example.com/item.jpg' }] }])

  const replace = (index: number, key: string, value: unknown) => setRows(current => current.map((row, rowIndex) => rowIndex === index ? { ...row, [key]: value } : row))

  const output = kind === 'product'
    ? new FeedProduct(sellerId, marketplaceId, rows).main()
    : kind === 'price'
      ? new FeedPrice(sellerId, rows).main()
      : kind === 'quantity'
        ? new FeedQuantity(sellerId, rows).main()
        : kind === 'images'
          ? new FeedImg(sellerId, rows).main()
          : new FeedRelation(sellerId, rows).main()

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
            <Tooltip label="Reset rows">
              <ActionIcon aria-label="Reset rows" onClick={() => setRows([rows[0]])} variant="subtle">
                <IconRefresh size={18} />
              </ActionIcon>
            </Tooltip>
            <Button leftSection={<IconPlus size={16} />} onClick={add}>Add row</Button>
          </Group>
        </Group>

        <TextInput label="Seller ID" mb="md" value={sellerId} onChange={event => setSellerId(event.currentTarget.value)} />

        <SegmentedControl
          fullWidth
          data={[{ label: 'Product', value: 'product' }, { label: 'Price', value: 'price' }, { label: 'Quantity', value: 'quantity' }, { label: 'Images', value: 'images' }, { label: 'Relation', value: 'relation' }]}
          value={kind}
          onChange={value => setKind(value as FeedKind)}
        />

        <Stack mt="md">
          {rows.map((item, index) => (
            <Paper key={`${item.sku}-${index}`} p="sm" radius="sm" withBorder>
              <Group justify="space-between" mb="sm">
                <Text fw={600} size="sm">
                  Message
                  {' '}
                  {index + 1}
                </Text>
                <Tooltip label="Remove row">
                  <ActionIcon aria-label="Remove row" color="red" disabled={rows.length === 1} onClick={() => remove(index)} variant="subtle">
                    <IconTrash size={18} />
                  </ActionIcon>
                </Tooltip>
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
