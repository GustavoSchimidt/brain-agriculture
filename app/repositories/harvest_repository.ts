import Harvest from '#models/harvest'
import { IHarvestRepository } from '../contracts/repositories/harvest_repository.interface.js'

export class HarvestRepository implements IHarvestRepository {
  async listAll(): Promise<Harvest[]> {
    return await Harvest.query().select(['id', 'description', 'startDate', 'endDate'])
  }

  async findById(id: number): Promise<Harvest | null> {
    return await Harvest.query().where('id', id).first()
  }
}
