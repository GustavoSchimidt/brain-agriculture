import vine from '@vinejs/vine'
import { DocumentTypeEnum } from '../contracts/enums/document_type.enum.js'

const cropSchema = vine.object({
  crop_id: vine.number().positive(),
  harvest_id: vine.number().positive(),
})

export const updateFarmerSchema = vine.object({
  name: vine.string().minLength(2).maxLength(100).optional(),
  documentType: vine.enum(Object.values(DocumentTypeEnum)).optional(),
  document: vine.string().maxLength(18).optional(),
  farm: vine
    .object({
      name: vine.string().minLength(2).maxLength(100).optional(),
      city: vine.string().minLength(2).optional(),
      state_id: vine.number().positive().optional(),
      arable_area: vine.number().positive().optional(),
      vegetation_area: vine.number().positive().optional(),
      crops: vine.array(cropSchema).optional(),
    })
    .optional(),
})
