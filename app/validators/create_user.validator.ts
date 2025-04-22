import vine from '@vinejs/vine'
import { DocumentTypeEnum } from '../contracts/enums/document_type.enum.js'

const cropSchema = vine.object({
  crop_id: vine.number().positive(),
  harvest_id: vine.number().positive(),
})

export const createFarmerSchema = vine.object({
  name: vine.string().minLength(2).maxLength(100),
  documentType: vine.enum(Object.values(DocumentTypeEnum)),
  document: vine.string().maxLength(18),
  farm: vine.object({
    name: vine.string().minLength(2).maxLength(100),
    city: vine.string().minLength(2),
    state_id: vine.number().positive(),
    arable_area: vine.number().positive(),
    vegetation_area: vine.number().positive(),
    crops: vine.array(cropSchema).optional(),
  }),
})
