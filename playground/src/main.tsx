import { MantineProvider } from '@mantine/core'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles.css'
import '@mantine/core/styles.css'

createRoot(document.getElementById('root')!).render(
  <MantineProvider defaultColorScheme="light">
    <App />
  </MantineProvider>,
)
