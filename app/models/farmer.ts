import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DocumentTypeEnum } from '../contracts/enums/document_type.enum.js'
import Farm from './farm.js'

export default class Farmer extends BaseModel {
  public static table = 'farmer'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare document: string

  @column()
  declare document_type: DocumentTypeEnum

  @hasMany(() => Farm, {
    foreignKey: 'farmer_id',
    localKey: 'id',
  })
  declare farms: HasMany<typeof Farm>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
