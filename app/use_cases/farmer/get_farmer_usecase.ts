import FarmerException from '#exceptions/farmer_exception'
import Farmer from '#models/farmer'
import { IFarmerRepository } from '../../contracts/repositories/farmer_repository.interface.js'
import { IGetFarmerUseCase } from '../../contracts/use_cases/farmer/get_farmer_usecase.interface.js'

export class GetFarmerByIdUseCase implements IGetFarmerUseCase {
  constructor(private farmerRepository: IFarmerRepository) {}

  /**
   * Executa o caso de uso para buscar um agricultor por ID
   * @param id ID do agricultor
   * @returns Agricultor com detalhes da fazenda
   */
  public async execute(id: number): Promise<Farmer> {
    const farmer = await this.farmerRepository.findByIdWithFarmer(id)

    if (!farmer) {
      throw new FarmerException('Farmer not found', { status: 404 })
    }

    return farmer
  }
}
