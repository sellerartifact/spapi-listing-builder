export function combineObjAttr(bool: boolean | number, obj: any, key: string, attr: any) {
  if (bool) {
    obj[key] = attr
  }
  return obj
}
