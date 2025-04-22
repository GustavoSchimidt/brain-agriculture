import { DashboardStatsResponseDTO } from '../../dtos/dashboard/dashboard_response.dto.js'

export interface IGetDashboardStatsUseCase {
  execute(): Promise<DashboardStatsResponseDTO>
}
