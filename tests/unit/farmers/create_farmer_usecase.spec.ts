import { test } from '@japa/runner'
import { CreateFarmerUseCase } from '../../../app/use_cases/farmer/create_farmer_usecase.js'
import { DocumentTypeEnum } from '../../../app/contracts/enums/document_type.enum.js'
import FarmerException from '../../../app/exceptions/farmer_exception.js'
import { CreateFarmerDTO } from '../../../app/contracts/dtos/farmer/create_farmer.dto.js'
import { createMockCropRepository } from '#tests/mocks/repositories/crop_repository_mock'
import { createMockHarvestRepository } from '#tests/mocks/repositories/harvest_repository_mock'
import { CropFactory } from '#tests/mocks/factories/crop.factory'
import { HarvestFactory } from '#tests/mocks/factories/harvest.factory'
import { createMockFarmerRepository } from '#tests/mocks/repositories/farmer_repository_mock'
import { FarmerFactory } from '#tests/mocks/factories/farmer.factory'

const validCPF = '54363951044'
const validCNPJ = '01305850000160'
const invalidCPF = '11111111111'
const invalidCNPJ = '11111111111111'

const validFarmerData: CreateFarmerDTO = {
  name: 'João Da Silva',
  documentType: DocumentTypeEnum.CPF,
  document: validCPF,
  farm: {
    name: 'Fazenda Modelo',
    city: 'São Paulo',
    state_id: 1,
    total_area: 100,
    arable_area: 60,
    vegetation_area: 40,
    crops: [
      {
        crop_id: 1,
        harvest_id: 1,
      },
    ],
  },
}
let mockCropRepo = createMockCropRepository({
  findById: async () => CropFactory(),
})

let mockHarvestRepo = createMockHarvestRepository({
  findById: async () => HarvestFactory(),
})

let mockFarmerRepo = createMockFarmerRepository({
  create: async () => validFarmerData,
  findByDocument: async () => null,
})

test.group('CreateFarmerUseCase', () => {
  test('should create a farmer successfully', async ({ assert }) => {
    const useCase = new CreateFarmerUseCase(mockFarmerRepo, mockCropRepo, mockHarvestRepo)
    const result = await useCase.execute(validFarmerData)
    const totalArea = validFarmerData.farm.arable_area + validFarmerData.farm.vegetation_area

    assert.equal(result.name, validFarmerData.name)
    assert.equal(result.document, validFarmerData.document)
    assert.equal(result.documentType, validFarmerData.documentType)
    assert.equal(result.farm.total_area, totalArea)
  })

  test('should remove special characters from document', async ({ assert }) => {
    const useCase = new CreateFarmerUseCase(mockFarmerRepo, mockCropRepo, mockHarvestRepo)

    const dataWithFormattedCPF = {
      ...validFarmerData,
      document: '543.639.510-44',
    }

    const result = await useCase.execute(dataWithFormattedCPF)

    assert.equal(result.document, validCPF)
  })

  test('should throw exception for invalid CPF', async ({ assert }) => {
    const dataWithInvalidCPF = {
      ...validFarmerData,
      document: invalidCPF,
    }

    mockFarmerRepo = createMockFarmerRepository({
      create: async () => dataWithInvalidCPF,
      findByDocument: async () => null,
    })

    const useCase = new CreateFarmerUseCase(mockFarmerRepo, mockCropRepo, mockHarvestRepo)

    try {
      await useCase.execute(dataWithInvalidCPF)
      assert.fail('Should have thrown an exception')
    } catch (error) {
      assert.instanceOf(error, FarmerException)
      assert.equal((error as FarmerException).message, `Invalid ${DocumentTypeEnum.CPF}`)
    }
  })

  test('should throw exception for invalid CNPJ', async ({ assert }) => {
    const dataWithInvalidCNPJ = {
      ...validFarmerData,
      documentType: DocumentTypeEnum.CNPJ,
      document: invalidCNPJ,
    }

    mockFarmerRepo = createMockFarmerRepository({
      create: async () => dataWithInvalidCNPJ,
      findByDocument: async () => null,
    })

    const useCase = new CreateFarmerUseCase(mockFarmerRepo, mockCropRepo, mockHarvestRepo)

    try {
      await useCase.execute(dataWithInvalidCNPJ)
      assert.fail('Should have thrown an exception')
    } catch (error) {
      assert.instanceOf(error, FarmerException)
      assert.equal((error as FarmerException).message, `Invalid ${DocumentTypeEnum.CNPJ}`)
    }
  })

  test('should throw exception if farmer with document already exists', async ({ assert }) => {
    const existingFarmer = FarmerFactory()
    existingFarmer.id = 1
    existingFarmer.name = 'Existing Farmer'
    existingFarmer.document = validCPF
    existingFarmer.document_type = DocumentTypeEnum.CPF

    mockFarmerRepo = createMockFarmerRepository({
      create: async () => validFarmerData,
      findByDocument: async () => existingFarmer,
    })

    const useCase = new CreateFarmerUseCase(mockFarmerRepo, mockCropRepo, mockHarvestRepo)

    try {
      await useCase.execute(validFarmerData)
      assert.fail('Should have thrown an exception')
    } catch (error) {
      assert.instanceOf(error, FarmerException)
      assert.equal((error as FarmerException).message, 'Farmer with this document already exists')
    }
  })

  test('should accept valid CNPJ', async ({ assert }) => {
    const dataWithValidCNPJ = {
      ...validFarmerData,
      documentType: DocumentTypeEnum.CNPJ,
      document: validCNPJ,
    }

    mockFarmerRepo = createMockFarmerRepository({
      create: async () => dataWithValidCNPJ,
      findByDocument: async () => null,
    })

    const useCase = new CreateFarmerUseCase(mockFarmerRepo, mockCropRepo, mockHarvestRepo)
    const totalArea = validFarmerData.farm.arable_area + validFarmerData.farm.vegetation_area

    const result = await useCase.execute(dataWithValidCNPJ)

    assert.equal(result.document, dataWithValidCNPJ.document)
    assert.equal(result.documentType, DocumentTypeEnum.CNPJ)
    assert.equal(result.farm.total_area, totalArea)
  })
})
