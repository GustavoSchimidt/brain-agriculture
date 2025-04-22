import FarmerException from '#exceptions/farmer_exception'
import { IFarmerRepository } from '../../contracts/repositories/farmer_repository.interface.js'
import { IDeleteFarmerUseCase } from '../../contracts/use_cases/farmer/delete_farmer_usecase.interface.js'

export class DeleteFarmerUseCase implements IDeleteFarmerUseCase {
  constructor(private farmerRepository: IFarmerRepository) {}

  /**
   * Executa o caso de uso para excluir um agricultor existente
   * @param id ID do agricultor a ser excluído
   * @returns true se o agricultor foi excluído com sucesso
   * @throws FarmerException se o agricultor não for encontrado ou se ocorrer um erro durante a exclusão
   */
  public async execute(id: number): Promise<boolean> {
    const farmer = await this.farmerRepository.findById(id)
    if (!farmer) {
      throw new FarmerException('Farmer not found', { status: 404 })
    }

    const deleted = await this.farmerRepository.delete(id)
    if (!deleted) {
      throw new FarmerException('Failed to delete farmer', { status: 500 })
    }

    return true
  }
}
