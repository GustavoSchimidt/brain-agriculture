import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'farm_crop_harvest'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('farm_id').unsigned().notNullable().references('id').inTable('farm')
      table.integer('harvest_id').unsigned().notNullable().references('id').inTable('harvest')
      table.integer('crop_id').unsigned().notNullable().references('id').inTable('crop')
      table.unique(['farm_id', 'harvest_id', 'crop_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
