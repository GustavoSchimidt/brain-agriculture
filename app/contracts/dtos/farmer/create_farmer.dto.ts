import { DocumentTypeEnum } from '../../enums/document_type.enum.js'

interface Crops {
  crop_id: number
  harvest_id: number
}

interface Farm {
  name: string
  city: string
  state_id: number
  total_area?: number
  arable_area: number
  vegetation_area: number
  crops?: Crops[]
}

export interface CreateFarmerDTO {
  id?: number
  name: string
  documentType: DocumentTypeEnum
  document: string
  farm: Farm
}
