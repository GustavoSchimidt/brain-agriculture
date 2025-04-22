import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'crop'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 100).notNullable().unique()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    const now = new Date().toISOString()

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          name: 'SOJA',
          created_at: now,
          updated_at: now,
        },
        {
          name: 'MILHO',
          created_at: now,
          updated_at: now,
        },
        {
          name: 'ALGODAO',
          created_at: now,
          updated_at: now,
        },
        {
          name: 'CAFE',
          created_at: now,
          updated_at: now,
        },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
