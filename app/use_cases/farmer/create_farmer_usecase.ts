import FarmerException from '#exceptions/farmer_exception'
import { ICropRepository } from '../../contracts/repositories/crop_repository.interface.js'
import { IFarmerRepository } from '../../contracts/repositories/farmer_repository.interface.js'
import { IHarvestRepository } from '../../contracts/repositories/harvest_repository.interface.js'
import { DocumentTypeEnum } from '../../contracts/enums/document_type.enum.js'
import { isValidCNPJ, isValidCPF } from '../../utils/document_validator.js'
import { CreateFarmerDTO } from '../../contracts/dtos/farmer/create_farmer.dto.js'
import { ICreateFarmerUseCase } from '../../contracts/use_cases/farmer/create_farmer_usecase.interface.js'

export class CreateFarmerUseCase implements ICreateFarmerUseCase {
  constructor(
    private farmerRepository: IFarmerRepository,
    private cropRepository: ICropRepository,
    private harvestRepository: IHarvestRepository
  ) {}

  /**
   * Executa o caso de uso para criar um novo agricultor
   * @param CreateFarmerDTO Dados do agricultor a ser criado
   * @returns Instância do agricultor criado
   * @throws FarmerException se o documento for inválido, se as áreas da fazenda forem inconsistentes
   * ou se já existir um agricultor com o mesmo documento
   */
  public async execute(data: CreateFarmerDTO): Promise<CreateFarmerDTO> {
    data.document = this.removeSpecialCharacters(data.document)

    this.validateDocument(data.document, data.documentType)

    if (data.farm.crops && data.farm.crops.length > 0) {
      await this.verifyCropsAndHarvestsExists(data.farm.crops)
    }

    const farmExists = await this.farmerRepository.findByDocument(data.document)
    if (farmExists) {
      throw new FarmerException('Farmer with this document already exists', { status: 400 })
    }
    const totalArea = data.farm.arable_area + data.farm.vegetation_area

    data.farm.total_area = totalArea

    return await this.farmerRepository.create(data)
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
