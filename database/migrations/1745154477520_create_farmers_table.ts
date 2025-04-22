import { BaseSchema } from '@adonisjs/lucid/schema'
import { DocumentTypeEnum } from '../../app/contracts/enums/document_type.enum.js'

export default class extends BaseSchema {
  protected tableName = 'farmer'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.string('document', 14).notNullable().unique()
      table.string('document_type', 4).notNullable().checkIn([DocumentTypeEnum.CPF, DocumentTypeEnum.CNPJ])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
