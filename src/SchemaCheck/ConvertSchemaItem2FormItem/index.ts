import { filterUndefinedKeys } from '@/help'
import type { Recordable } from '@/help/state'

export class ConvertSchemaItem2FormItem {
  field: string
  schemaItem: Recordable
  required: string[]

  constructor(field: string, schemaItem: any, required: string[]) {
    this.field = field
    this.schemaItem = schemaItem
    this.required = required
  }

  main() {
    const key = this.parserSchemaPropertiesKey()
    if (Array.isArray(key)) {
      return key.map((k: string) => this.convert(k))
    }
    else {
      return this.convert(key)
    }
  }

  convert(key: string) {
    const { field, schemaItem } = this
    const properties = schemaItem.items.properties
    const { component, componentProps } = this.predictComponentData(properties[key])
    return filterUndefinedKeys({
      field: ['value', 'type'].includes(key) ? field : `${field}_${key}`,
      label: schemaItem.title,
      component,
      componentProps,
      required: this.required?.includes(field) ? true : undefined,
    })
  }

  predictComponentData(properties: Recordable) {
    const { type, description, enumNames } = properties
    if (enumNames) {
      const options = enumNames.map((label: string, idx: number) => {
        return { label, value: properties.enum[idx] }
      })
      return {
        component: type === 'boolean' ? 'Switch' : 'Select',
        componentProps: {
          placeholder: description,
          options,
        },
      }
    }
    else if (type === 'string') {
      return {
        component: 'Input',
        componentProps: filterUndefinedKeys({
          placeholder: description,
          max: properties.maxLength,
          min: properties.minLength,
        }),
      }
    }
    else if (type === 'integer') {
      return {
        component: 'InputNumber',
        componentProps: {
          placeholder: description,
          max: properties.maximum,
          min: properties.minimum,
        },
      }
    }
    else if (['array', 'object'].includes(type) && properties?.items?.properties?.schedule?.items?.properties?.value_with_tax) {
      return {
        component: 'inputNumber',
        componentProps: {
          placeholder: description,
          min: 0,
        },
      }
    }
    else if (type === 'object' && (properties?.properties?.value?.oneOf && properties?.properties?.value?.oneOf[0].format === 'date')) {
      return {
        component: 'DatePicker',
        componentProps: {
          placeholder: description,
        },
      }
    }
    console.log('properties', properties)
    throw new Error(`predictComponentData: Unknown type--${type}`)
  }

  parserSchemaPropertiesKey(): string | string[] {
    const properties = this.schemaItem.items.properties
    // 这些属性不需要转换为FormItem 不设置默认就是对应站点的缺省值
    const invalidKeys = ['marketplace_id', 'language_tag', 'currency']
    const keys = Object.keys(properties).filter(key => !invalidKeys.includes(key) && typeof properties[key] === 'object')
    if (keys.length === 1) {
      return keys[0]
    }
    if (keys.length === 2 && keys.includes('value') && keys.includes('type')) {
      return 'type'
    }
    else if (keys.length >= 2) {
      return keys
    }

    throw new Error(`parserSchemaPropertiesKey Error: Invalid keys--${keys}`)
  }
}
