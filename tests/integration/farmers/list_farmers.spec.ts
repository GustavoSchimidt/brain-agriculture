import { test } from '@japa/runner'

test.group('List Dashboard', () => {
  test('should return a data by Dashboard successfully', async ({ client }) => {
    const response = await client.get('/api/dashboard')

    response.assertOk()
  })
})
