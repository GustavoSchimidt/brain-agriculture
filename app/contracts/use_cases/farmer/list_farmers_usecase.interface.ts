import Farmer from '#models/farmer'

export interface IListFarmerUseCase {
  execute(): Promise<Farmer[]>
}
