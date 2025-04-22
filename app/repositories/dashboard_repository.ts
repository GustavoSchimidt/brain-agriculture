import db from '@adonisjs/lucid/services/db'
import Farm from '#models/farm'
import { IDashboardRepository } from '../contracts/repositories/dashboard_repository.interface.js'

export class DashboardRepository implements IDashboardRepository {
  async getTotalFarms(): Promise<number> {
    const result = await Farm.query().count('* as total')
    return Number(result[0].$extras.total)
  }

  async getTotalArea(): Promise<number> {
    const result = await Farm.query().sum('total_area as total')
    return Number(result[0].$extras.total)
  }

  async getFarmsByState(): Promise<{ state: string; count: number }[]> {
    return await db
      .from('farm')
      .join('state', 'farm.state_id', '=', 'state.id')
      .groupBy('state.name')
      .select('state.name as state')
      .count('farm.id as count')
  }

  async getFarmsByCrop(): Promise<{ crop: string; count: number }[]> {
    return await db
      .from('farm_crop_harvest')
      .join('crop', 'farm_crop_harvest.crop_id', '=', 'crop.id')
      .groupBy('crop.name')
      .select('crop.name as crop')
      .countDistinct('farm_crop_harvest.farm_id as count')
  }

  async getLandUsage(): Promise<{ arable: number; vegetation: number }> {
    const result = await Farm.query()
      .sum('arable_area as arable')
      .sum('vegetation_area as vegetation')
      .first()

    return {
      arable: Number(result?.$extras.arable || 0),
      vegetation: Number(result?.$extras.vegetation || 0),
    }
  }
}
