import ApiAccessLog from '../../models/api_access_log.js'

export interface IApiAccessLogRepository {
  create({
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
  }): Promise<ApiAccessLog>
}
