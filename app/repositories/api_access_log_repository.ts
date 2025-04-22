import { IApiAccessLogRepository } from '../contracts/repositories/api_access_log_repository.interface.js'
import ApiAccessLog from '../models/api_access_log.js'

export class ApiAccessLogRepository implements IApiAccessLogRepository {
  async create({
    endpoint,
    method,
    statusCode,
    ipAddress,
    message,
    additionalData,
  }: {
    endpoint: string
    method: string
    statusCode: number
    ipAddress: string
    message: string
    additionalData?: string
  }): Promise<ApiAccessLog> {
    try {
      return await ApiAccessLog.create({
        endpoint,
        method,
        statusCode,
        ipAddress,
        message,
        additionalData,
      })
    } catch (error) {
      console.error('Erro ao salvar log de acesso à API:', error)
      throw error
    }
  }
}
