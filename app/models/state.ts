import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class State extends BaseModel {
  public static table = 'state'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare uf: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
