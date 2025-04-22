import Farmer from '#models/farmer'
import { DocumentTypeEnum } from '../../../app/contracts/enums/document_type.enum.js'

export const FarmerFactory = () => {
  const farmer = new Farmer()
  farmer.id = 1
  farmer.name = 'João Da Silva'
  farmer.document = '54363951044'
  farmer.document_type = DocumentTypeEnum.CPF
  return farmer
}
