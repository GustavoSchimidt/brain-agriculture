import Crop from '#models/crop'
import { ICropRepository } from '../contracts/repositories/crop_repository.interface.js'

export class CropRepository implements ICropRepository {
  async listAll(): Promise<Crop[]> {
    return await Crop.query().select(['id', 'name'])
  }

  async findById(id: number): Promise<Crop | null> {
    return await Crop.query().where('id', id).first()
  }
}
