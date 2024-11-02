export function combineObjAttr(bool: boolean | number | undefined, obj: any, key: string, attr: any) {
  if (bool || bool === 0) {
    obj[key] = attr
  }
  return obj
}

export function filterUndefinedKeys(obj: any) {
  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key]
    }
  }
  return obj
}

/**
 * @desc 返回格式为 [{value: params}] 的数组
 */
export function renderListingArrValue(value: any) {
  if (!value) {
    return undefined
  }
  if (typeof value === 'object') {
    return [{ ...value }]
  }
  return [{ value }]
}
