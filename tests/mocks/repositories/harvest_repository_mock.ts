import { IHarvestRepository } from '../../../app/contracts/repositories/harvest_repository.interface.js'

export function createMockHarvestRepository(
  overrides: Partial<IHarvestRepository> = {}
): IHarvestRepository {
  return {
    listAll: async () => [],
    findById: async () => null,
    ...overrides,
  }
}
