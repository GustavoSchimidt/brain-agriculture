import ApiAccessLog from '#models/api_access_log'
import { DateTime } from 'luxon'

export const LogFactory = () => {
  const log = new ApiAccessLog()

  log.id = 1
  log.endpoint = '/farmers'
  log.method = 'POST'
  log.statusCode = 201
  log.ipAddress = '127.0.0.1'
  log.message = 'Created'
  log.additionalData = 'Mozilla/5.0'
  log.createdAt = DateTime.now()
  log.updatedAt = DateTime.now()

  return log
}
