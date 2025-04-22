import { DashboardStatsResponseDTO } from '../../contracts/dtos/dashboard/dashboard_response.dto.js'
import { IDashboardRepository } from '../../contracts/repositories/dashboard_repository.interface.js'
import { IGetDashboardStatsUseCase } from '../../contracts/use_cases/dashboard/get_dashboard_statas_usecase.interface.js'

export class GetDashboardStatsUseCase implements IGetDashboardStatsUseCase {
  constructor(private dashboardRepository: IDashboardRepository) {}

  /**
   * Executa o caso de uso para obter estatísticas do dashboard
   * @returns Estatísticas para o dashboard
   */
  public async execute(): Promise<DashboardStatsResponseDTO> {
    const [totalFarms, totalArea, farmsByState, farmsByCrop, landUsage] = await Promise.all([
      this.dashboardRepository.getTotalFarms(),
      this.dashboardRepository.getTotalArea(),
      this.dashboardRepository.getFarmsByState(),
      this.dashboardRepository.getFarmsByCrop(),
      this.dashboardRepository.getLandUsage(),
    ])

    return {
      totalFarms,
      totalArea,
      farmsByState,
      farmsByCrop,
      landUsage,
    }
  }
}
