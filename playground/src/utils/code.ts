export function parseNumber(value: string | number | undefined) {
  if (value === '' || value === undefined)
    return undefined

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

export function objectLiteral(value: unknown) {
  return JSON.stringify(value, null, 2)
}
