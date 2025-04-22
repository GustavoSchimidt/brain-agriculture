import { HarvestFactory } from '#tests/mocks/factories/harvest.factory'
import { createMockHarvestRepository } from '#tests/mocks/repositories/harvest_repository_mock'
import { test } from '@japa/runner'
import { ListHarvestUseCase } from '../../../app/use_cases/harvest/list_harvest_usecase.js'

let mockFarmerRepository = createMockHarvestRepository({
  listAll: async () => [HarvestFactory()],
})

test.group('ListHarvestUseCase', () => {
  test('should return a harvests list successfully', async ({ assert }) => {
    const useCase = new ListHarvestUseCase(mockFarmerRepository)
    const result = await useCase.execute()

    assert.isArray(result)
    assert.lengthOf(result, 1)
  })

  test('should return an empty list when there are no harvests', async ({ assert }) => {
    mockFarmerRepository = createMockHarvestRepository({
      listAll: async () => [],
    })

    const useCase = new ListHarvestUseCase(mockFarmerRepository)
    const result = await useCase.execute()

    assert.isArray(result)
    assert.lengthOf(result, 0)
  })
})
