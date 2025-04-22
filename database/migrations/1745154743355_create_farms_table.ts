import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'farm'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.string('city', 100).notNullable()
      table.integer('state_id').unsigned().notNullable().references('id').inTable('state')
      table.integer('farmer_id').unsigned().notNullable().references('id').inTable('farmer')
      table.decimal('total_area', 10, 2).notNullable().checkPositive()
      table.decimal('arable_area', 10, 2).notNullable().checkPositive()
      table.decimal('vegetation_area', 10, 2).notNullable().checkPositive()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
