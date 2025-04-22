import Farmer from '#models/farmer'

export interface IGetFarmerUseCase {
  execute(id: number): Promise<Farmer>
}
