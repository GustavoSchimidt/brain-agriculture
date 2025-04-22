import { test } from '@japa/runner'
import { GetDashboardStatsUseCase } from '../../../app/use_cases/dashboard/get_dashboard_stats_usecase.js'
import { DashboardStatsResponseDTO } from '../../../app/contracts/dtos/dashboard/dashboard_response.dto.js'
import { createMockDashboardRepository } from '#tests/mocks/repositories/dashboard_repository.mock'

test.group('GetDashboardStatsUseCase', () => {
  test('should return dashboard stats with correct values', async ({ assert }) => {
    const mockDashboardRepository = createMockDashboardRepository({
      getTotalFarms: async () => 10,
      getTotalArea: async () => 1500,
      getFarmsByState: async () => [{ state: 'SP', count: 4 }],
      getFarmsByCrop: async () => [{ crop: 'Soybean', count: 6 }],
      getLandUsage: async () => ({ arable: 1000, vegetation: 500 }),
    })
    const useCase = new GetDashboardStatsUseCase(mockDashboardRepository)

    const result = await useCase.execute()

    const expected: DashboardStatsResponseDTO = {
      totalFarms: 10,
      totalArea: 1500,
      farmsByState: [{ state: 'SP', count: 4 }],
      farmsByCrop: [{ crop: 'Soybean', count: 6 }],
      landUsage: { arable: 1000, vegetation: 500 },
    }

    assert.deepEqual(result, expected)
  })

  test('should call all repository methods exactly once', async ({ assert }) => {
    const calls = {
      getTotalFarms: 0,
      getTotalArea: 0,
      getFarmsByState: 0,
      getFarmsByCrop: 0,
      getLandUsage: 0,
    }

    const mockDashboardRepository = createMockDashboardRepository({
      getTotalFarms: async () => {
        calls.getTotalFarms++
        return 10
      },
      getTotalArea: async () => {
        calls.getTotalArea++
        return 1500
      },
      getFarmsByState: async () => {
        calls.getFarmsByState++
        return []
      },
      getFarmsByCrop: async () => {
        calls.getFarmsByCrop++
        return []
      },
      getLandUsage: async () => {
        calls.getLandUsage++
        return { arable: 1000, vegetation: 500 }
      },
    })
    const useCase = new GetDashboardStatsUseCase(mockDashboardRepository)
    await useCase.execute()

    assert.equal(calls.getTotalFarms, 1, 'getTotalFarms should be called once')
    assert.equal(calls.getTotalArea, 1, 'getTotalArea should be called once')
    assert.equal(calls.getFarmsByState, 1, 'getFarmsByState should be called once')
    assert.equal(calls.getFarmsByCrop, 1, 'getFarmsByCrop should be called once')
    assert.equal(calls.getLandUsage, 1, 'getLandUsage should be called once')
  })
})
