import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ApiAccessLog extends BaseModel {
  public static table = 'api_access_logs'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare endpoint: string

  @column()
  declare method: string

  @column()
  declare statusCode: number

  @column()
  declare ipAddress: string

  @column()
  declare message: string

  @column()
  declare additionalData: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
