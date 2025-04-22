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

test.group('Get Farmer', () => {
  test('should return a farmer successfully', async ({ client }) => {
    const createResponse = await client.post('/api/farmer').json(validFarmerData)
    const farmerId = createResponse.body().id
    const response = await client.get(`/api/farmer/${farmerId}`)

    response.assertOk()
  })
})
