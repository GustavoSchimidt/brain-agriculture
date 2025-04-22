import Crop from '#models/crop'

export interface IListCropUseCase {
  execute(): Promise<Crop[]>
}
