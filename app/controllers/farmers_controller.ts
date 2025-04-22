import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { createFarmerSchema } from '../validators/create_user.validator.js'
import { updateFarmerSchema } from '../validators/update_user.validator.js'
import { CreateFarmerUseCase } from '../use_cases/farmer/create_farmer_usecase.js'
import { UpdateFarmerUseCase } from '../use_cases/farmer/update_farmer_usecase.js'
import { DeleteFarmerUseCase } from '../use_cases/farmer/delete_farmer_usecase.js'
import { ListFarmersUseCase } from '../use_cases/farmer/list_farmers_usecase.js'
import { FarmerRepository } from '../repositories/farmer_repository.js'
import { CropRepository } from '../repositories/crop_repository.js'
import { HarvestRepository } from '../repositories/harvest_repository.js'
import { UpdateFarmerDTO } from '../contracts/dtos/farmer/update_farmer.dto.js'
import { GetFarmerByIdUseCase } from '../use_cases/farmer/get_farmer_usecase.js'
import { CreateFarmerDTO } from '../contracts/dtos/farmer/create_farmer.dto.js'

export default class FarmersController {
  public async listFarmers({ response }: HttpContext): Promise<void> {
    try {
      const farmerRepository = new FarmerRepository()
      const listFarmersUseCase = new ListFarmersUseCase(farmerRepository)

      const farmers = await listFarmersUseCase.execute()

      return response.ok(farmers)
    } catch (error) {
      throw error
    }
  }

  public async getFarmer({ response, params }: HttpContext): Promise<void> {
    try {
      const farmerId = params.id

      const farmerRepository = new FarmerRepository()
      const getFarmerByIdUseCase = new GetFarmerByIdUseCase(farmerRepository)

      const farmer = await getFarmerByIdUseCase.execute(Number(farmerId))

      return response.ok(farmer)
    } catch (error) {
      throw error
    }
  }

  public async createFarmer({ request, response }: HttpContext): Promise<void> {
    try {
      const validatedData: CreateFarmerDTO = await vine.validate({
        schema: createFarmerSchema,
        data: request.body(),
      })

      const farmerRepository = new FarmerRepository()
      const cropRepository = new CropRepository()
      const harvestRepository = new HarvestRepository()
      const createFarmerUseCase = new CreateFarmerUseCase(
        farmerRepository,
        cropRepository,
        harvestRepository
      )

      const farmer = await createFarmerUseCase.execute(validatedData)

      return response.created(farmer)
    } catch (error) {
      throw error
    }
  }

  public async updateFarmer({ request, response, params }: HttpContext): Promise<void> {
    try {
      const farmerId = params.id
      const validatedData: UpdateFarmerDTO = await vine.validate({
        schema: updateFarmerSchema,
        data: request.body(),
      })

      const farmerRepository = new FarmerRepository()
      const cropRepository = new CropRepository()
      const harvestRepository = new HarvestRepository()
      const updateFarmerUseCase = new UpdateFarmerUseCase(
        farmerRepository,
        cropRepository,
        harvestRepository
      )

      const farmer = await updateFarmerUseCase.execute(Number(farmerId), validatedData)

      return response.ok(farmer)
    } catch (error) {
      throw error
    }
  }

  public async deleteFarmer({ response, params }: HttpContext): Promise<void> {
    try {
      const farmerId = params.id

      const farmerRepository = new FarmerRepository()
      const deleteFarmerUseCase = new DeleteFarmerUseCase(farmerRepository)

      await deleteFarmerUseCase.execute(Number(farmerId))

      return response.noContent()
    } catch (error) {
      throw error
    }
  }
}
