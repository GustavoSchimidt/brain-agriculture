import { test } from '@japa/runner'

test.group('Dashboard', () => {
  test('should return a dashboard data successfully', async ({ client }) => {
    const response = await client.get('/api/dashboard')

    response.assertOk()
  })
})
