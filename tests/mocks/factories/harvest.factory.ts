import Harvest from '#models/harvest'

export const HarvestFactory = () => {
  const harvest = new Harvest()
  harvest.id = 1
  harvest.description = 'SAFRA 2025'
  return harvest
}
