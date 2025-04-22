import { HttpContext } from '@adonisjs/core/http'

import { GetDashboardStatsUseCase } from '../use_cases/dashboard/get_dashboard_stats_usecase.js'
import { DashboardRepository } from '../repositories/dashboard_repository.js'

export default class DashboardController {
  public async getStats({ response }: HttpContext): Promise<void> {
    try {
      const dashboardRepository = new DashboardRepository()
      const getDashboardStatsUseCase = new GetDashboardStatsUseCase(dashboardRepository)

      const stats = await getDashboardStatsUseCase.execute()

      return response.ok(stats)
    } catch (error) {
      throw error
    }
  }
}
