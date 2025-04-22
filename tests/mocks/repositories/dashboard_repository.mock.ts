import { IDashboardRepository } from '../../../app/contracts/repositories/dashboard_repository.interface.js'

export function createMockDashboardRepository(
  overrides: Partial<IDashboardRepository> = {}
): IDashboardRepository {
  return {
    getTotalFarms: async () => 10,
    getTotalArea: async () => 1500,
    getFarmsByState: async () => [{ state: 'SP', count: 4 }],
    getFarmsByCrop: async () => [{ crop: 'Soybean', count: 6 }],
    getLandUsage: async () => ({ arable: 1000, vegetation: 500 }),
    ...overrides,
  }
}
