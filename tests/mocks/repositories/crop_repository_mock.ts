import { ICropRepository } from '../../../app/contracts/repositories/crop_repository.interface.js'

export function createMockCropRepository(
  overrides: Partial<ICropRepository> = {}
): ICropRepository {
  return {
    listAll: async () => [],
    findById: async () => null,
    ...overrides,
  }
}
