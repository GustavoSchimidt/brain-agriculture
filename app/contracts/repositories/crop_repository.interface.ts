import Crop from '#models/crop'

export interface ICropRepository {
  listAll(): Promise<Crop[]>
  findById(id: number): Promise<Crop | null>
}
