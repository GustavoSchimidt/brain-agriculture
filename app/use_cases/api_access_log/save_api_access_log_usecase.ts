import { ISaveApiAccessLogUseCase } from '../../contracts/use_cases/api_access_log/save_api_access_log_usecase.interface.js'
import { IApiAccessLogRepository } from '../../contracts/repositories/api_access_log_repository.interface.js'
import ApiAccessLog from '../../models/api_access_log.js'

export class SaveApiAccessLogUseCase implements ISaveApiAccessLogUseCase {
  constructor(private apiAccessLogRepository: IApiAccessLogRepository) {}

  /**
   * Executa o caso de uso para salvar um log de acesso à API
   * @param endpoint Endpoint acessado
   * @param method Método HTTP utilizado
   * @param statusCode Código de status da resposta
   * @param ipAddress Endereço IP do cliente
   * @param userAgent User-Agent do cliente
   * @returns O log de acesso criado
   */
  public async execute({
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
      return await this.apiAccessLogRepository.create({
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
