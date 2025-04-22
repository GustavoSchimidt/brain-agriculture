export interface IDeleteFarmerUseCase {
  execute(id: number): Promise<boolean>
}
