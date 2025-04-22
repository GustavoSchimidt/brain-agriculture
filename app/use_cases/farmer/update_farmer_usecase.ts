import FarmerException from '#exceptions/farmer_exception'
import { ICropRepository } from '../../contracts/repositories/crop_repository.interface.js'
import { IFarmerRepository } from '../../contracts/repositories/farmer_repository.interface.js'
import { IHarvestRepository } from '../../contracts/repositories/harvest_repository.interface.js'
import { UpdateFarmerDTO } from '../../contracts/dtos/farmer/update_farmer.dto.js'
import { DocumentTypeEnum } from '../../contracts/enums/document_type.enum.js'
import { isValidCNPJ, isValidCPF } from '../../utils/document_validator.js'
import { IUpdateFarmerUseCase } from '../../contracts/use_cases/farmer/update_farmer_usecase.interface.js'

export class UpdateFarmerUseCase implements IUpdateFarmerUseCase {
  constructor(
    private farmerRepository: IFarmerRepository,
    private cropRepository: ICropRepository,
    private harvestRepository: IHarvestRepository
  ) {}

  /**
   * Executa o caso de uso para atualizar um agricultor existente
   * @param id ID do agricultor a ser atualizado
   * @param data Dados do agricultor a serem atualizados
   * @returns Instância do agricultor atualizado
   * @throws FarmerException se o documento for inválido, se as áreas da fazenda forem inconsistentes,
   * se o agricultor não for encontrado ou se já existir outro agricultor com o mesmo documento
   */
  public async execute(id: number, data: UpdateFarmerDTO): Promise<UpdateFarmerDTO> {
    if (data.farm) {
      this.validateFarmAreas(data.farm)
    }

    const farmer = await this.farmerRepository.findById(id)
    if (!farmer) {
      throw new FarmerException('Farmer not found', { status: 404 })
    }

    if (data.farm && data.farm.crops && data.farm.crops.length > 0) {
      await this.verifyCropsAndHarvestsExists(data.farm.crops)
    }

    if (data.document) {
      data.document = this.removeSpecialCharacters(data.document)
      this.validateDocument(
        data.document,
        data.documentType || (farmer.document_type as DocumentTypeEnum)
      )

      const existingFarmer = await this.farmerRepository.findByDocument(data.document)
      if (existingFarmer && existingFarmer.id !== id) {
        throw new FarmerException('Another farmer with this document already exists', {
          status: 400,
        })
      }
    }

    const updatedFarmer = await this.farmerRepository.update(id, data)
    if (!updatedFarmer) {
      throw new FarmerException('Failed to update farmer', { status: 500 })
    }

    return updatedFarmer
  }

  /**
   * Valida se o documento (CPF ou CNPJ) é válido de acordo com seu tipo
   * @param document Documento a ser validado (apenas dígitos)
   * @param documentType Tipo do documento (CPF ou CNPJ)
   * @throws FarmerException se o documento for inválido
   */
  private validateDocument(document: string, documentType: DocumentTypeEnum): void {
    if (documentType === DocumentTypeEnum.CNPJ && !isValidCNPJ(document)) {
      throw new FarmerException(`Invalid ${documentType}`, { status: 400 })
    } else if (documentType === DocumentTypeEnum.CPF && !isValidCPF(document)) {
      throw new FarmerException(`Invalid ${documentType}`, { status: 400 })
    }
  }

  /**
   * Remove caracteres especiais (pontos, traços, barras e espaços) de um documento
   * @param document CPF ou CNPJ com ou sem caracteres especiais
   * @returns documento contendo apenas dígitos
   */
  private removeSpecialCharacters(document: string): string {
    return document.replace(/[.\-/\s]/g, '')
  }

  /**
   * Valida as áreas da fazenda e calcula a área total
   * @param farm Dados da fazenda contendo áreas cultiváveis e de vegetação
   * @throws FarmerException se as áreas não forem fornecidas juntas
   */
  private validateFarmAreas(farm: {
    arable_area?: number
    vegetation_area?: number
    total_area?: number
  }): void {
    if (
      (farm.arable_area && !farm.vegetation_area) ||
      (!farm.arable_area && farm.vegetation_area)
    ) {
      throw new FarmerException('Both arable area and vegetation area must be provided together', {
        status: 400,
      })
    }

    if (farm.arable_area && farm.vegetation_area) {
      farm.total_area = farm.arable_area + farm.vegetation_area
    }
  }

  /**
   * Verifica se as plantações e colheitas existem no banco de dados
   * @param crops Plantações e colheitas a serem verificadas
   */
  private async verifyCropsAndHarvestsExists(
    crops: { crop_id: number; harvest_id: number }[]
  ): Promise<void> {
    for (const crop of crops) {
      const [cropExists, harvestExists] = await Promise.all([
        this.cropRepository.findById(crop.crop_id),
        this.harvestRepository.findById(crop.harvest_id),
      ])
      if (!cropExists) {
        throw new FarmerException(`Crop with id ${crop.crop_id} not found`, { status: 400 })
      }
      if (!harvestExists) {
        throw new FarmerException(`Harvest with id ${crop.harvest_id} not found`, { status: 400 })
      }
    }
  }
}
