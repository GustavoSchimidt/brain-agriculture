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
    total_area: 100,
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

const updateFarmerData = {
  name: 'João Da Silva Atualizado',
  documentType: DocumentTypeEnum.CPF,
  document: generateCPF(),
  farm: {
    name: 'Fazenda Modelo Atualizada',
    city: 'Rio de Janeiro',
    state_id: 2,
    total_area: 120,
    arable_area: 70,
    vegetation_area: 50,
    crops: [
      {
        crop_id: 2,
        harvest_id: 2,
      },
    ],
  },
}

test.group('Update Farmer', () => {
  test('should update a farmer successfully', async ({ client }) => {
    const createResponse = await client.post('/api/farmer').json(validFarmerData)
    const farmerId = createResponse.body().id

    const response = await client.put(`/api/farmer/${farmerId}`).json(updateFarmerData)

    response.assertStatus(200)
    response.assertBodyContains({
      name: updateFarmerData.name,
    })
  })

  test('should return 404 when farmer not found', async ({ client }) => {
    const response = await client.put('/api/farmer/9999').json(updateFarmerData)

    response.assertStatus(404)
    response.assertBodyContains({
      message: 'Farmer not found',
    })
  })

  test('should return 400 when document is invalid', async ({ client }) => {
    const createResponse = await client.post('/api/farmer').json(validFarmerData)
    const farmerId = createResponse.body().id

    const invalidData = {
      ...updateFarmerData,
      document: '111.111.111-11',
    }

    const response = await client.put(`/api/farmer/${farmerId}`).json(invalidData)

    response.assertStatus(400)
    response.assertBodyContains({
      message: 'Invalid CPF',
    })
  })
})
