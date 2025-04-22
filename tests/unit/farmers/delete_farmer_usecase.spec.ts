import { test } from '@japa/runner'
import { DeleteFarmerUseCase } from '../../../app/use_cases/farmer/delete_farmer_usecase.js'
import FarmerException from '../../../app/exceptions/farmer_exception.js'
import { createMockFarmerRepository } from '#tests/mocks/repositories/farmer_repository_mock'
import { FarmerFactory } from '#tests/mocks/factories/farmer.factory'

test.group('DeleteFarmerUseCase', () => {
  test('should delete a farmer successfully', async ({ assert }) => {
    const mockRepo = createMockFarmerRepository({
      findById: async () => FarmerFactory(),
      delete: async () => true,
    })

    const useCase = new DeleteFarmerUseCase(mockRepo)

    const result = await useCase.execute(1)

    assert.isTrue(result)
  })

  test('should throw exception when farmer not found', async ({ assert }) => {
    const mockRepo = createMockFarmerRepository({
      findById: async () => null,
      delete: async () => true,
    })

    const useCase = new DeleteFarmerUseCase(mockRepo)

    try {
      await useCase.execute(999)
      assert.fail('Should have thrown an exception')
    } catch (error) {
      assert.instanceOf(error, FarmerException)
      assert.equal((error as FarmerException).message, 'Farmer not found')
    }
  })

  test('should throw exception when delete operation fails', async ({ assert }) => {
    const mockRepo = createMockFarmerRepository({
      findById: async () => FarmerFactory(),
      delete: async () => false,
    })

    const useCase = new DeleteFarmerUseCase(mockRepo)

    try {
      await useCase.execute(1)
      assert.fail('Should have thrown an exception')
    } catch (error) {
      assert.instanceOf(error, FarmerException)
      assert.equal((error as FarmerException).message, 'Failed to delete farmer')
    }
  })
})
