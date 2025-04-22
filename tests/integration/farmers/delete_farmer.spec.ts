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

test.group('Delete Farmer', () => {
  test('should delete a farmer successfully', async ({ client }) => {
    const createResponse = await client.post('/api/farmer').json(validFarmerData)
    const farmerId = createResponse.body().id

    const response = await client.delete(`/api/farmer/${farmerId}`)

    response.assertStatus(204)
  })

  test('should return 404 when farmer not found', async ({ client }) => {
    const response = await client.delete('/api/farmer/9999')

    response.assertStatus(404)
    response.assertBodyContains({
      message: 'Farmer not found',
    })
  })
})
