import { IFarmerRepository } from '../contracts/repositories/farmer_repository.interface.js'
import Farmer from '../models/farmer.js'
import Farm from '../models/farm.js'
import db from '@adonisjs/lucid/services/db'
import FarmCropHarvest from '#models/farm_crop_harvest'
import { UpdateFarmerDTO } from '../contracts/dtos/farmer/update_farmer.dto.js'
import { CreateFarmerDTO } from '../contracts/dtos/farmer/create_farmer.dto.js'

export class FarmerRepository implements IFarmerRepository {
  async create(data: CreateFarmerDTO): Promise<CreateFarmerDTO> {
    const result = await db.transaction(async (trx) => {
      const farmer = await Farmer.create(
        {
          name: data.name,
          document: data.document,
          document_type: data.documentType,
        },
        { client: trx }
      )

      const farm = await Farm.create(
        {
          name: data.farm.name,
          city: data.farm.city,
          state_id: data.farm.state_id,
          farmer_id: farmer.id,
          total_area: data.farm.total_area,
          arable_area: data.farm.arable_area,
          vegetation_area: data.farm.vegetation_area,
        },
        { client: trx }
      )

      if (data.farm.crops && data.farm.crops.length > 0) {
        for (const crop of data.farm.crops) {
          await FarmCropHarvest.create(
            {
              farm_id: farm.id,
              crop_id: crop.crop_id,
              harvest_id: crop.harvest_id,
            },
            { client: trx }
          )
        }
      }

      return farmer
    })

    return { ...data, id: result.id }
  }

  async findByDocument(document: string): Promise<Farmer | null> {
    return await Farmer.query().where('document', document).first()
  }

  async findById(id: number): Promise<Farmer | null> {
    return await Farmer.find(id)
  }

  async update(id: number, data: UpdateFarmerDTO): Promise<UpdateFarmerDTO | null> {
    await db.transaction(async () => {
      const farmer = await Farmer.find(id)
      if (!farmer) return null

      if (data.name || data.document || data.documentType) {
        await farmer
          .merge({
            name: data.name,
            document: data.document,
            document_type: data.documentType,
          })
          .save()
      }

      if (data.farm) {
        const farm = await Farm.query().where('farmer_id', id).first()
        if (farm) {
          await farm
            .merge({
              name: data.farm.name,
              city: data.farm.city,
              state_id: data.farm.state_id,
              total_area: data.farm.total_area,
              arable_area: data.farm.arable_area,
              vegetation_area: data.farm.vegetation_area,
            })
            .save()

          if (data.farm.crops && data.farm.crops.length > 0) {
            await FarmCropHarvest.query().where('farm_id', farm.id).delete()

            for (const crop of data.farm.crops) {
              await FarmCropHarvest.create({
                farm_id: farm.id,
                crop_id: crop.crop_id,
                harvest_id: crop.harvest_id,
              })
            }
          }
        }
      }
    })

    return data
  }

  async delete(id: number): Promise<boolean> {
    return await db.transaction(async () => {
      const farmer = await Farmer.find(id)
      if (!farmer) return false

      const farm = await Farm.query().where('farmer_id', id).first()
      if (farm) {
        await FarmCropHarvest.query().where('farm_id', farm.id).delete()
        await farm.delete()
      }

      await farmer.delete()

      return true
    })
  }

  async findAll(): Promise<Farmer[]> {
    return await Farmer.all()
  }

  async findByIdWithFarmer(id: number): Promise<Farmer | null> {
    const farm = await Farmer.query()
      .where('id', id)
      .select(['id', 'name', 'document', 'document_type'])
      .preload('farms', (farmQuery) => {
        farmQuery.select([
          'id',
          'name',
          'city',
          'state_id',
          'total_area',
          'arable_area',
          'vegetation_area',
          'farmer_id',
        ])
        farmQuery.preload('farmCropHarvests', (farmCropQuery) => {
          farmCropQuery.select(['id', 'farm_id', 'crop_id', 'harvest_id'])
          farmCropQuery.preload('crop', (cropQuery) => {
            cropQuery.select(['id', 'name'])
          })
          farmCropQuery.preload('harvest', (harvestQuery) => {
            harvestQuery.select(['id', 'description'])
          })
        })
      })
      .first()

    return farm
  }
}
