import Harvest from '#models/harvest'

export interface IListHarvestUseCase {
  execute(): Promise<Harvest[]>
}
