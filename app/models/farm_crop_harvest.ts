import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Farm from './farm.js'
import Harvest from './harvest.js'
import Crop from './crop.js'

export default class FarmCropHarvest extends BaseModel {
  public static table = 'farm_crop_harvest'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare farm_id: number

  @belongsTo(() => Farm)
  declare farm: BelongsTo<typeof Farm>

  @column()
  declare harvest_id: number

  @belongsTo(() => Harvest, {
    foreignKey: 'harvest_id',
    localKey: 'id',
  })
  declare harvest: BelongsTo<typeof Harvest>

  @column()
  declare crop_id: number

  @belongsTo(() => Crop, {
    foreignKey: 'crop_id',
    localKey: 'id',
  })
  declare crop: BelongsTo<typeof Crop>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
