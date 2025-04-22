export interface IDashboardRepository {
  getTotalFarms(): Promise<number>
  getTotalArea(): Promise<number>
  getFarmsByState(): Promise<{ state: string; count: number }[]>
  getFarmsByCrop(): Promise<{ crop: string; count: number }[]>
  getLandUsage(): Promise<{ arable: number; vegetation: number }>
}
