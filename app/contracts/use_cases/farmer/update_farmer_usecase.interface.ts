import { UpdateFarmerDTO } from '../../dtos/farmer/update_farmer.dto.js'

export interface IUpdateFarmerUseCase {
  execute(id: number, data: UpdateFarmerDTO): Promise<UpdateFarmerDTO>
}
