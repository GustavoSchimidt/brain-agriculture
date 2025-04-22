import { IFarmerRepository } from '../../../app/contracts/repositories/farmer_repository.interface.js'

export function createMockFarmerRepository(
  overrides: Partial<IFarmerRepository> = {}
): IFarmerRepository {
  return {
    create: async () => {
      throw new Error('Not implemented')
    },
    findByDocument: async () => null,
    update: async () => {
      throw new Error('Not implemented')
    },
    findAll: async () => [],
    findByIdWithFarmer: async () => null,
    findById: async () => null,
    delete: async () => false,
    ...overrides,
  }
}
