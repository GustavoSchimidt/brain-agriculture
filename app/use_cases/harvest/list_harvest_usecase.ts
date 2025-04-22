import Harvest from '#models/harvest'
import { IHarvestRepository } from '../../contracts/repositories/harvest_repository.interface.js'
import { IListHarvestUseCase } from '../../contracts/use_cases/harvest/list_harvest_usecase.interface.js'

export class ListHarvestUseCase implements IListHarvestUseCase {
  constructor(private harvestRepository: IHarvestRepository) {}

  /**
   * Executa o caso de uso para listar harvests
   * @returns Lista de Harvests
   */
  public async execute(): Promise<Harvest[]> {
    const harvests = await this.harvestRepository.listAll()

    return harvests
  }
}
