import { test } from '@japa/runner'
import { DocumentTypeEnum } from '../../../app/contracts/enums/document_type.enum.js'
import { generateCPF } from '#tests/mocks/cpf_faker'

const validFarmerData = {
  name: 'João Da Silva',
  documentType: DocumentTypeEnum.CPF,
  document: generateCPF(),
  farm: {
    name: 'Fazenda Modelo',
    city: 'São Paulo',
    state_id: 1,
    arable_area: 60,
    vegetation_area: 40,
    crops: [
      {
        crop_id: 1,
        harvest_id: 1,
      },
    ],
  },
}

test.group('Create Farmer', () => {
  test('should create a farmer successfully', async ({ client }) => {
    const response = await client.post('/api/farmer').json(validFarmerData)

    response.assertStatus(201)
    response.assertBodyContains({
      name: validFarmerData.name,
      documentType: validFarmerData.documentType,
    })
  })

  test('should return 400 when document is invalid', async ({ client }) => {
    const invalidData = {
      ...validFarmerData,
      document: '111.111.111-11',
    }

    const response = await client.post('/api/farmer').json(invalidData)

    response.assertStatus(400)
    response.assertBodyContains({
      message: 'Invalid CPF',
    })
  })

  test('should return 422 when missing required fields', async ({ client }) => {
    const incompleteData = {
      name: 'John Doe',
      farm: {
        name: 'Fazenda Modelo',
      },
    }

    const response = await client.post('/api/farmer').json(incompleteData)

    response.assertStatus(422)
  })

  test('should return 400 when farmer with document already exists', async ({ client }) => {
    const response = await client.post('/api/farmer').json(validFarmerData)

    response.assertStatus(400)
    response.assertBodyContains({
      message: 'Farmer with this document already exists',
    })
  })

  test('should return 400 when crop is invalid', async ({ client }) => {
    const invalidData = {
      ...validFarmerData,
      document: generateCPF(),
      farm: {
        name: 'Fazenda Modelo',
        city: 'São Paulo',
        state_id: 1,
        arable_area: 60,
        vegetation_area: 40,
        crops: [
          {
            crop_id: 999,
            harvest_id: 1,
          },
        ],
      },
    }

    const response = await client.post('/api/farmer').json(invalidData)

    response.assertStatus(400)
    response.assertBodyContains({
      message: 'Crop with id 999 not found',
    })
  })

  test('should return 400 when harvest is invalid', async ({ client }) => {
    const invalidData = {
      ...validFarmerData,
      document: generateCPF(),
      farm: {
        name: 'Fazenda Modelo',
        city: 'São Paulo',
        state_id: 1,
        arable_area: 60,
        vegetation_area: 40,
        crops: [
          {
            crop_id: 1,
            harvest_id: 999,
          },
        ],
      },
    }

    const response = await client.post('/api/farmer').json(invalidData)

    response.assertStatus(400)
    response.assertBodyContains({
      message: 'Harvest with id 999 not found',
    })
  })
})
