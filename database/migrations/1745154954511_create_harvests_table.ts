import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'harvest'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('description', 50).notNullable().unique()
      table.timestamp('start_date').notNullable()
      table.timestamp('end_date').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    const now = new Date().toISOString()

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          description: 'Safra Verão 2023/2024',
          start_date: '2023-09-01 00:00:00',
          end_date: '2024-03-31 23:59:59',
          created_at: now,
          updated_at: now,
        },
        {
          description: 'Safra Inverno 2024',
          start_date: '2024-04-01 00:00:00',
          end_date: '2024-08-31 23:59:59',
          created_at: now,
          updated_at: now,
        },
        {
          description: 'Safra Verão 2024/2025',
          start_date: '2024-09-01 00:00:00',
          end_date: '2025-03-31 23:59:59',
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
