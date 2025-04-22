import { test } from '@japa/runner'
import { UpdateFarmerUseCase } from '../../../app/use_cases/farmer/update_farmer_usecase.js'
import { DocumentTypeEnum } from '../../../app/contracts/enums/document_type.enum.js'
import FarmerException from '../../../app/exceptions/farmer_exception.js'
import { UpdateFarmerDTO } from '../../../app/contracts/dtos/farmer/update_farmer.dto.js'
import { createMockCropRepository } from '#tests/mocks/repositories/crop_repository_mock'
import { createMockHarvestRepository } from '#tests/mocks/repositories/harvest_repository_mock'
import { createMockFarmerRepository } from '#tests/mocks/repositories/farmer_repository_mock'
import { FarmerFactory } from '#tests/mocks/factories/farmer.factory'
import { CropFactory } from '#tests/mocks/factories/crop.factory'
import { HarvestFactory } from '#tests/mocks/factories/harvest.factory'

const validUpdateData: UpdateFarmerDTO = {
  name: 'João Da Silva Atualizado',
  farm: {
    name: 'Fazenda Modelo Atualizada',
    city: 'Rio de Janeiro',
    state_id: 2,
    arable_area: 70,
    vegetation_area: 50,
    crops: [
      {
        crop_id: 2,
        harvest_id: 2,
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
  findById: async () => FarmerFactory(),
  findByDocument: async () => null,
  update: async () => validUpdateData,
})

test.group('UpdateFarmerUseCase', () => {
  test('should update a farmer successfully', async ({ assert }) => {
    const useCase = new UpdateFarmerUseCase(mockFarmerRepo, mockCropRepo, mockHarvestRepo)
    const result = await useCase.execute(1, validUpdateData)

    const arableArea = validUpdateData?.farm?.arable_area || 0
    const vegetationArea = validUpdateData?.farm?.vegetation_area || 0
    const totalArea = arableArea + vegetationArea

    assert.equal(result.name, validUpdateData.name)
    assert.equal(result.farm?.total_area, totalArea)
  })

  test('should throw exception when farmer not found', async ({ assert }) => {
    mockFarmerRepo = createMockFarmerRepository({
      findById: async () => null,
      findByDocument: async () => null,
      update: async () => null,
    })

    const useCase = new UpdateFarmerUseCase(mockFarmerRepo, mockCropRepo, mockHarvestRepo)

    try {
      await useCase.execute(999, validUpdateData)
      assert.fail('Should have thrown an exception')
    } catch (error) {
      assert.instanceOf(error, FarmerException)
      assert.equal((error as FarmerException).message, 'Farmer not found')
    }
  })

  test('should throw exception for invalid CPF', async ({ assert }) => {
    mockFarmerRepo = createMockFarmerRepository({
      findById: async () => FarmerFactory(),
      findByDocument: async () => null,
      update: async () => FarmerFactory(),
    })

    const useCase = new UpdateFarmerUseCase(mockFarmerRepo, mockCropRepo, mockHarvestRepo)
    const dataWithInvalidCPF = {
      document: '11111111111',
    }

    try {
      await useCase.execute(1, dataWithInvalidCPF)
      assert.fail('Should have thrown an exception')
    } catch (error) {
      assert.instanceOf(error, FarmerException)
      assert.equal((error as FarmerException).message, `Invalid ${DocumentTypeEnum.CPF}`)
    }
  })

  test('should throw exception for invalid CNPJ', async ({ assert }) => {
    mockFarmerRepo = createMockFarmerRepository({
      findById: async () => FarmerFactory(),
      findByDocument: async () => null,
      update: async () => FarmerFactory(),
    })

    const useCase = new UpdateFarmerUseCase(mockFarmerRepo, mockCropRepo, mockHarvestRepo)
    const dataWithInvalidCNPJ = {
      document: '11111111111',
      documentType: DocumentTypeEnum.CNPJ,
    }

    try {
      await useCase.execute(1, dataWithInvalidCNPJ)
      assert.fail('Should have thrown an exception')
    } catch (error) {
      assert.instanceOf(error, FarmerException)
      assert.equal((error as FarmerException).message, `Invalid ${DocumentTypeEnum.CNPJ}`)
    }
  })

  test('should throw exception for inconsistent farm areas', async ({ assert }) => {
    mockFarmerRepo = createMockFarmerRepository({
      findById: async () => FarmerFactory(),
      findByDocument: async () => null,
      update: async () => FarmerFactory(),
    })

    const useCase = new UpdateFarmerUseCase(mockFarmerRepo, mockCropRepo, mockHarvestRepo)
    const dataWithInconsistentAreas = {
      farm: {
        arable_area: 60,
      },
    }

    try {
      await useCase.execute(1, dataWithInconsistentAreas)
      assert.fail('Should have thrown an exception')
    } catch (error) {
      assert.instanceOf(error, FarmerException)
      assert.equal(
        (error as FarmerException).message,
        'Both arable area and vegetation area must be provided together'
      )
    }
  })

  test('should throw exception if another farmer with same document exists', async ({ assert }) => {
    const anotherFarmer = FarmerFactory()
    anotherFarmer.id = 2
    anotherFarmer.name = 'Another Farmer'
    anotherFarmer.document = '33400689000109'
    anotherFarmer.document_type = DocumentTypeEnum.CNPJ

    mockFarmerRepo = createMockFarmerRepository({
      findById: async () => FarmerFactory(),
      findByDocument: async () => anotherFarmer,
      update: async () => FarmerFactory(),
    })

    const useCase = new UpdateFarmerUseCase(mockFarmerRepo, mockCropRepo, mockHarvestRepo)
    const dataWithExistingDocument = {
      document: '33400689000109',
      documentType: DocumentTypeEnum.CNPJ,
    }

    try {
      await useCase.execute(1, dataWithExistingDocument)
      assert.fail('Should have thrown an exception')
    } catch (error) {
      assert.instanceOf(error, FarmerException)
      assert.equal(
        (error as FarmerException).message,
        'Another farmer with this document already exists'
      )
    }
  })

  test('should remove special characters from document', async ({ assert }) => {
    const dataWithFormattedCPF = {
      document: '543.639.510-44',
    }

    mockFarmerRepo = createMockFarmerRepository({
      findById: async () => FarmerFactory(),
      findByDocument: async () => null,
      update: async () => dataWithFormattedCPF,
    })

    const useCase = new UpdateFarmerUseCase(mockFarmerRepo, mockCropRepo, mockHarvestRepo)

    const result = await useCase.execute(1, dataWithFormattedCPF)

    assert.equal(result.document, '54363951044')
  })

  test('should throw exception for invalid crops', async ({ assert }) => {
    mockFarmerRepo = createMockFarmerRepository({
      findById: async () => FarmerFactory(),
      findByDocument: async () => null,
      update: async () => FarmerFactory(),
    })

    mockCropRepo = createMockCropRepository({
      findById: async () => null,
    })

    const useCase = new UpdateFarmerUseCase(mockFarmerRepo, mockCropRepo, mockHarvestRepo)

    try {
      await useCase.execute(1, validUpdateData)
      assert.fail('Should have thrown an exception')
    } catch (error) {
      assert.instanceOf(error, FarmerException)
      assert.equal((error as FarmerException).message, `Crop with id 2 not found`)
    }
  })

  test('should throw exception for invalid harvest', async ({ assert }) => {
    mockFarmerRepo = createMockFarmerRepository({
      findById: async () => FarmerFactory(),
      findByDocument: async () => null,
      update: async () => FarmerFactory(),
    })

    mockHarvestRepo = createMockHarvestRepository({
      findById: async () => null,
    })

    const useCase = new UpdateFarmerUseCase(mockFarmerRepo, mockCropRepo, mockHarvestRepo)

    try {
      await useCase.execute(1, validUpdateData)
      assert.fail('Should have thrown an exception')
    } catch (error) {
      assert.instanceOf(error, FarmerException)
      assert.equal((error as FarmerException).message, `Crop with id 2 not found`)
    }
  })
})
