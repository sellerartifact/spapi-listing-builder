import Draft from 'json-schema-library'

export class SchemaCheck {
  jsonSchema: Draft.Draft2019
  data: object
  schema: object
  constructor(schema: object, data: object) {
    this.schema = schema
    this.jsonSchema = new Draft.Draft2019(schema)
    this.data = data
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
}
