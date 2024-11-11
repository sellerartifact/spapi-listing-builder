import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { ConvertSchemaItem2FormItem, SchemaCheck } from '../../src/index'

describe('schemaCheck should', () => {
  const myJsonSchema = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './schema/HOME.json')).toString(),
  )

  const schemaCheck = new SchemaCheck(myJsonSchema, {})

  it('getSchema should', () => {
    const schema = schemaCheck.jsonSchema.getSchema({ pointer: 'package_level' })
    expect(typeof schema).toEqual('object')
  })

  it('convertSchemaItem2FormItem input should', () => {
    const field = 'item_name'
    const schema = schemaCheck.jsonSchema.getSchema({ pointer: field })
    const formItem = new ConvertSchemaItem2FormItem(field, schema, schemaCheck.required).main()
    expect(formItem).toEqual({
      component: 'Input',
      componentProps: {
        max: 200,
        min: 0,
        placeholder: 'Provide a title for the item that may be customer facing',
      },
      field: 'item_name',
      label: 'Product Name',
      required: true,
    })
  })

  it('convertSchemaItem2FormItem select should', () => {
    const field = 'externally_assigned_product_identifier'
    const schema = schemaCheck.jsonSchema.getSchema({ pointer: field })
    const formItem = new ConvertSchemaItem2FormItem(field, schema, schemaCheck.required).main()
    expect(formItem).toEqual({
      component: 'Select',
      componentProps: {
        options: [
          {
            label: 'EAN',
            value: 'ean',
          },
          {
            label: 'GTIN',
            value: 'gtin',
          },
          {
            label: 'UPC',
            value: 'upc',
          },
        ],
        placeholder: 'Select the type of external ID (barcode) that is being used to identify this product',
      },
      field: 'externally_assigned_product_identifier',
      label: 'External Product ID',
    })
  })

  it('convertSchemaItem2FormItem switch should', () => {
    const field = 'supplier_declared_has_product_identifier_exemption'
    const schema = schemaCheck.jsonSchema.getSchema({ pointer: field })
    const formItem = new ConvertSchemaItem2FormItem(field, schema, schemaCheck.required).main()
    expect(formItem).toEqual({
      component: 'Switch',
      componentProps: {
        options: [
          {
            label: 'No',
            value: false,
          },
          {
            label: 'Yes',
            value: true,
          },
        ],
        placeholder: 'Please specify if the product is exempt from supplier declared external product identifiers.',
      },
      field: 'supplier_declared_has_product_identifier_exemption',
      label: 'Is exempt from a supplier declared external identifier',
    })
  })

  it('convertSchemaItem2FormItem array item should', () => {
    const field = 'package_contains_sku'
    const schema = schemaCheck.jsonSchema.getSchema({ pointer: field })
    const formItem = new ConvertSchemaItem2FormItem(field, schema, schemaCheck.required).main()
    expect(formItem).toEqual([
      {
        component: 'InputNumber',
        componentProps: {
          max: 250,
          min: 1,
          placeholder: 'Provide the quantity of each unit, case, or pallet identified in Package Level.',
        },
        field: 'package_contains_sku_quantity',
        label: 'Package Contains SKU',
      },
      {
        component: 'Input',
        componentProps: {
          max: 100,
          placeholder: 'Provide the SKU identifier of each unit, case or pallet identified in Package Level.',
        },
        field: 'package_contains_sku_sku',
        label: 'Package Contains SKU',
      },
    ])
  })

  it('convertSchemaItem2FormItem purchasable_offer should', () => {
    const field = 'purchasable_offer'
    const schema = schemaCheck.jsonSchema.getSchema({ pointer: field })
    const formItem = new ConvertSchemaItem2FormItem(field, schema, schemaCheck.required).main()
    console.log(JSON.stringify(formItem, null, 2))
    expect(Array.isArray(formItem)).toEqual(true)
  })

  it('convert2FormItems should', () => {
    const list = schemaCheck.convert2FormItems()
    console.log(JSON.stringify(list, null, 2))
    expect(Array.isArray(list)).toEqual(true)
  })

  it('convertRequiredSchema2FormItems should', () => {
    const list = schemaCheck.convertRequiredSchema2FormItems()
    console.log(JSON.stringify(list, null, 2))
    fs.writeFileSync('./test.json', JSON.stringify(list, null, 2))
    expect(Array.isArray(list)).toEqual(true)
  })
})
