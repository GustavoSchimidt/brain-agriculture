export interface DashboardStatsResponseDTO {
  totalFarms: number
  totalArea: number
  farmsByState: { state: string; count: number }[]
  farmsByCrop: { crop: string; count: number }[]
  landUsage: { arable: number; vegetation: number }
}
