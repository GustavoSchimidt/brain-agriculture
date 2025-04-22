import Crop from '#models/crop'
import { ICropRepository } from '../../contracts/repositories/crop_repository.interface.js'
import { IListCropUseCase } from '../../contracts/use_cases/crop/list_crop_usecase.interface.js'

export class ListCropUseCase implements IListCropUseCase {
  constructor(private cropRepository: ICropRepository) {}

  /**
   * Executa o caso de uso para listar crops
   * @returns Lista de crops
   */
  public async execute(): Promise<Crop[]> {
    const crops = await this.cropRepository.listAll()

    return crops
  }
}
