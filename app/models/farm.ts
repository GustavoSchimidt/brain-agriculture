import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import State from './state.js'
import Farmer from './farmer.js'
import FarmCropHarvest from './farm_crop_harvest.js'

export default class Farm extends BaseModel {
  public static table = 'farm'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare city: string

  @column()
  declare state_id: number

  @belongsTo(() => State)
  declare state: BelongsTo<typeof State>

  @column()
  declare farmer_id: number

  @belongsTo(() => Farmer)
  declare farmer: BelongsTo<typeof Farmer>

  @column()
  declare total_area: number

  @column()
  declare arable_area: number

  @column()
  declare vegetation_area: number

  @hasMany(() => FarmCropHarvest, {
    foreignKey: 'farm_id',
    localKey: 'id',
  })
  declare farmCropHarvests: HasMany<typeof FarmCropHarvest>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
