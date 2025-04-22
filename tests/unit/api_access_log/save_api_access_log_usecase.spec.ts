import { test } from '@japa/runner'
import { IApiAccessLogRepository } from '../../../app/contracts/repositories/api_access_log_repository.interface.js'
import { SaveApiAccessLogUseCase } from '../../../app/use_cases/api_access_log/save_api_access_log_usecase.js'
import { LogFactory } from '#tests/mocks/factories/log.fackory'
test.group('SaveApiAccessLogUseCase', () => {
  test('should call the repository with the correct data and return the access log', async ({
    assert,
  }) => {
    const fakeLog = LogFactory()

    const fakeRepository: IApiAccessLogRepository = {
      create: async (data) => {
        assert.deepEqual(data, {
          endpoint: '/farmers',
          method: 'POST',
          statusCode: 201,
          ipAddress: '127.0.0.1',
          message: 'Created',
          additionalData: 'Mozilla/5.0',
        })
        return fakeLog
      },
    }

    const useCase = new SaveApiAccessLogUseCase(fakeRepository)

    const result = await useCase.execute({
      endpoint: '/farmers',
      method: 'POST',
      statusCode: 201,
      ipAddress: '127.0.0.1',
      message: 'Created',
      additionalData: 'Mozilla/5.0',
    })

    assert.deepEqual(result, fakeLog)
  })
})
