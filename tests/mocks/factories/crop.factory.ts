import Crop from '#models/crop'

export const CropFactory = () => {
  const crop = new Crop()
  crop.id = 1
  crop.name = 'SOJA'
  return crop
}
