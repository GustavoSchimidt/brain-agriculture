import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'state'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 100).notNullable()
      table.string('uf', 2).notNullable().unique()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    const now = new Date().toISOString()

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        { name: 'Acre', uf: 'AC', created_at: now, updated_at: now },
        { name: 'Alagoas', uf: 'AL', created_at: now, updated_at: now },
        { name: 'Amapá', uf: 'AP', created_at: now, updated_at: now },
        { name: 'Amazonas', uf: 'AM', created_at: now, updated_at: now },
        { name: 'Bahia', uf: 'BA', created_at: now, updated_at: now },
        { name: 'Ceará', uf: 'CE', created_at: now, updated_at: now },
        { name: 'Distrito Federal', uf: 'DF', created_at: now, updated_at: now },
        { name: 'Espírito Santo', uf: 'ES', created_at: now, updated_at: now },
        { name: 'Goiás', uf: 'GO', created_at: now, updated_at: now },
        { name: 'Maranhão', uf: 'MA', created_at: now, updated_at: now },
        { name: 'Mato Grosso', uf: 'MT', created_at: now, updated_at: now },
        { name: 'Mato Grosso do Sul', uf: 'MS', created_at: now, updated_at: now },
        { name: 'Minas Gerais', uf: 'MG', created_at: now, updated_at: now },
        { name: 'Pará', uf: 'PA', created_at: now, updated_at: now },
        { name: 'Paraíba', uf: 'PB', created_at: now, updated_at: now },
        { name: 'Paraná', uf: 'PR', created_at: now, updated_at: now },
        { name: 'Pernambuco', uf: 'PE', created_at: now, updated_at: now },
        { name: 'Piauí', uf: 'PI', created_at: now, updated_at: now },
        { name: 'Rio de Janeiro', uf: 'RJ', created_at: now, updated_at: now },
        { name: 'Rio Grande do Norte', uf: 'RN', created_at: now, updated_at: now },
        { name: 'Rio Grande do Sul', uf: 'RS', created_at: now, updated_at: now },
        { name: 'Rondônia', uf: 'RO', created_at: now, updated_at: now },
        { name: 'Roraima', uf: 'RR', created_at: now, updated_at: now },
        { name: 'Santa Catarina', uf: 'SC', created_at: now, updated_at: now },
        { name: 'São Paulo', uf: 'SP', created_at: now, updated_at: now },
        { name: 'Sergipe', uf: 'SE', created_at: now, updated_at: now },
        { name: 'Tocantins', uf: 'TO', created_at: now, updated_at: now },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
