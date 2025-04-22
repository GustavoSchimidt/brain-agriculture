import { test } from '@japa/runner'
import { ListCropUseCase } from '../../../app/use_cases/crop/list_crop_usecase.js'
import { createMockCropRepository } from '#tests/mocks/repositories/crop_repository_mock'
import { CropFactory } from '#tests/mocks/factories/crop.factory'

let mockFarmerRepository = createMockCropRepository({
  listAll: async () => [CropFactory()],
})

test.group('ListCropUseCase', () => {
  test('should return a crops list successfully', async ({ assert }) => {
    const useCase = new ListCropUseCase(mockFarmerRepository)
    const result = await useCase.execute()

    assert.isArray(result)
    assert.lengthOf(result, 1)
  })

  test('should return an empty list when there are no crops', async ({ assert }) => {
    mockFarmerRepository = createMockCropRepository({
      listAll: async () => [],
    })

    const useCase = new ListCropUseCase(mockFarmerRepository)
    const result = await useCase.execute()

    assert.isArray(result)
    assert.lengthOf(result, 0)
  })
})
