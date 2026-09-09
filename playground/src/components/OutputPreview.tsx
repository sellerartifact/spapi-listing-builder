import { ActionIcon, Code, Group, Paper, Tabs, Tooltip } from '@mantine/core'
import { IconCopy, IconDownload } from '@tabler/icons-react'
import { useState } from 'react'

export function OutputPreview({ value, filename, code }: { value: unknown, filename: string, code: string }) {
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
