import { UpdateFarmerDTO } from '../dtos/farmer/update_farmer.dto.js'
import Farmer from '../../models/farmer.js'
import { CreateFarmerDTO } from '../dtos/farmer/create_farmer.dto.js'

export interface IFarmerRepository {
  create(data: CreateFarmerDTO): Promise<CreateFarmerDTO>
  findByDocument(document: string): Promise<Farmer | null>
  findById(id: number): Promise<Farmer | null>
  update(id: number, data: UpdateFarmerDTO): Promise<UpdateFarmerDTO | null>
  delete(id: number): Promise<boolean>
  findAll(): Promise<Farmer[]>
  findByIdWithFarmer(id: number): Promise<Farmer | null>
}
