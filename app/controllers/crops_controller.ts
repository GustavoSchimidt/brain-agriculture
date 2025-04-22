import { HttpContext } from '@adonisjs/core/http'
import { CropRepository } from '../repositories/crop_repository.js'
import { ListCropUseCase } from '../use_cases/crop/list_crop_usecase.js'

export default class CropsController {
  public async listCrops({ response }: HttpContext): Promise<void> {
    try {
      const cropRepository = new CropRepository()
      const listCropUseCase = new ListCropUseCase(cropRepository)

      const crops = await listCropUseCase.execute()

      return response.ok(crops)
    } catch (error) {
      throw error
    }
  }
}
