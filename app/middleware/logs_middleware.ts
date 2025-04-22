import { HttpContext } from '@adonisjs/core/http'

import { SaveApiAccessLogUseCase } from '../use_cases/api_access_log/save_api_access_log_usecase.js'
import { ApiAccessLogRepository } from '../repositories/api_access_log_repository.js'

export default class Logs {
  public async handle(ctx: HttpContext, next: () => Promise<void>) {
    const { request, response } = ctx

    await next()

    const endpoint = request.url()
    const method = request.method()
    const statusCode = response.response.statusCode
    const ipAddress = request.ip()
    const userAgent = request.header('user-agent') || ''
    const message = `${method} ${endpoint} - ${statusCode}`
    const requestBody = request.body()

    const apiAccessLogRepository = new ApiAccessLogRepository()
    const saveLogUseCase = new SaveApiAccessLogUseCase(apiAccessLogRepository)

    await saveLogUseCase.execute({
      endpoint,
      method,
      statusCode,
      ipAddress,
      message,
      additionalData: JSON.stringify({
        userAgent,
        body: requestBody,
      }),
    })
  }
}
