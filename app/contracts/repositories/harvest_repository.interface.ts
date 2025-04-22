import Harvest from '#models/harvest'

export interface IHarvestRepository {
  listAll(): Promise<Harvest[]>
  findById(id: number): Promise<Harvest | null>
}
