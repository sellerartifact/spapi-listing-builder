import Draft from 'json-schema-library'

export class SchemaCheck {
  jsonSchema: Draft.Draft2019
  data: object
  constructor(schema: object, data: object) {
    this.jsonSchema = new Draft.Draft2019(schema)
    this.data = data
  }

  validate() {
    return this.jsonSchema.validate(this.data)
  }

  getRequiredFields(): string[] {
    return (this.jsonSchema as any).required
  }

  getRequiredSchema() {
    const requiredFields = this.getRequiredFields()
    return requiredFields.map((item) => {
      return this.jsonSchema.getSchema({ pointer: item })
    })
  }
}
