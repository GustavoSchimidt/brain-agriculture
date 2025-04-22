import { CreateFarmerDTO } from '../../dtos/farmer/create_farmer.dto.js'

export interface ICreateFarmerUseCase {
  execute(data: CreateFarmerDTO): Promise<CreateFarmerDTO>
}
