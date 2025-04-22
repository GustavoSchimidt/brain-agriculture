import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ApiAccessLogs extends BaseSchema {
  protected tableName = 'api_access_logs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('endpoint').notNullable()
      table.string('method').notNullable()
      table.integer('status_code').notNullable()
      table.string('ip_address').notNullable()
      table.text('message').notNullable()
      table.text('additional_data').notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
