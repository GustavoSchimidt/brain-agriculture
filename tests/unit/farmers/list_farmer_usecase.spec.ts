import { test } from '@japa/runner'
import { FarmerFactory } from '#tests/mocks/factories/farmer.factory'
import { createMockFarmerRepository } from '#tests/mocks/repositories/farmer_repository_mock'
import { ListFarmersUseCase } from '../../../app/use_cases/farmer/list_farmers_usecase.js'

let mockFarmerRepository = createMockFarmerRepository({
  findAll: async () => [FarmerFactory()],
})

test.group('ListFarmersUseCase', () => {
  test('should return a farmer list successfully', async ({ assert }) => {
    const useCase = new ListFarmersUseCase(mockFarmerRepository)
    const result = await useCase.execute()

    assert.isArray(result)
    assert.lengthOf(result, 1)
  })

  test('should return an empty list when there are no farmer', async ({ assert }) => {
    mockFarmerRepository = createMockFarmerRepository({
      findAll: async () => [],
    })

    const useCase = new ListFarmersUseCase(mockFarmerRepository)
    const result = await useCase.execute()

    assert.isArray(result)
    assert.lengthOf(result, 0)
  })
})
