import { HttpContext } from '@adonisjs/core/http'
import { HarvestRepository } from '../repositories/harvest_repository.js'
import { ListHarvestUseCase } from '../use_cases/harvest/list_harvest_usecase.js'

export default class HarvestsController {
  public async listHarvests({ response }: HttpContext): Promise<void> {
    try {
      const harvestRepository = new HarvestRepository()
      const createHarvestUseCase = new ListHarvestUseCase(harvestRepository)

      const harvests = await createHarvestUseCase.execute()

      return response.ok(harvests)
    } catch (error) {
      throw error
    }
  }
}
