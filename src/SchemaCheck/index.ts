import Draft from 'json-schema-library'
import type { Recordable } from '@/help/state'
import { ConvertSchemaItem2FormItem } from './ConvertSchemaItem2FormItem'

export * from './ConvertSchemaItem2FormItem'

export class SchemaCheck {
  jsonSchema: Draft.Draft2019
  data: object
  schema: Recordable
  required: string[]
  constructor(schema: Recordable, data: object) {
    this.schema = schema
    this.jsonSchema = new Draft.Draft2019(schema)
    this.data = data
    this.required = this.getRequiredFields()
  }

  validate() {
    return this.jsonSchema.validate(this.data)
  }

  getRequiredFields(): string[] {
    return (this.schema as any).required
  }

  getRequiredSchema() {
    const requiredFields = this.getRequiredFields()
    return requiredFields.map((item) => {
      return this.jsonSchema.getSchema({ pointer: item })
    })
  }

  getProperties(key: string) {
    return this.schema.properties[key]
  }

  getAllPropertiesKeys() {
    return Object.keys(this.schema.properties)
  }

  convert2FormItems() {
    return this.getAllPropertiesKeys().map((field) => {
      const schema = this.jsonSchema.getSchema({ pointer: field })
      try {
        return new ConvertSchemaItem2FormItem(field, schema, this.required).main()
      }
      catch (e) {
        console.error(e)
        return undefined
      }
    })
  }
}
