import { AppShell, Group, Tabs, Text, Title } from '@mantine/core'
import { FeedBuilder } from './features/FeedBuilder'
import { ListingBuilder } from './features/ListingBuilder'

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

            <Tabs.Panel pt="md" value="listing">
              <ListingBuilder />
            </Tabs.Panel>
            <Tabs.Panel pt="md" value="feed">
              <FeedBuilder />
            </Tabs.Panel>
          </Tabs>
        </main>
      </AppShell.Main>
    </AppShell>
  )
}
