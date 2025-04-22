import { test } from '@japa/runner'

test.group('List Harvets', () => {
  test('should return a harvest list successfully', async ({ client }) => {
    const response = await client.get('/api/harvest')

    response.assertOk()
  })
})
