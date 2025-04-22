import { IFarmerRepository } from '../../contracts/repositories/farmer_repository.interface.js'
import Farmer from '#models/farmer'
import { IListFarmerUseCase } from '../../contracts/use_cases/farmer/list_farmers_usecase.interface.js'

export class ListFarmersUseCase implements IListFarmerUseCase {
  constructor(private farmerRepository: IFarmerRepository) {}

  /**
   * Executa o caso de uso para listar todos os agricultores
   * @returns Lista de agricultores
   */
  public async execute(): Promise<Farmer[]> {
    return await this.farmerRepository.findAll()
  }
}
