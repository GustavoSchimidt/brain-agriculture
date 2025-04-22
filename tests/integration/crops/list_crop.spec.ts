import { test } from '@japa/runner'

test.group('List Crops', () => {
  test('should return a crop list successfully', async ({ client }) => {
    const response = await client.get('/api/crop')

    response.assertOk()
  })
})
