/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import CropsController from '#controllers/crops_controller'
import FarmersController from '#controllers/farmers_controller'
import HarvestsController from '#controllers/harvests_controller'
import DashboardController from '#controllers/dashboard_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [FarmersController, 'listFarmers'])
        router.get('/:id', [FarmersController, 'getFarmer'])
        router.post('/', [FarmersController, 'createFarmer'])
        router.put('/:id', [FarmersController, 'updateFarmer'])
        router.delete('/:id', [FarmersController, 'deleteFarmer'])
      })
      .prefix('/farmer')

    router
      .group(() => {
        router.get('/', [CropsController, 'listCrops'])
      })
      .prefix('/crop')

    router
      .group(() => {
        router.get('/', [HarvestsController, 'listHarvests'])
      })
      .prefix('/harvest')

    router
      .group(() => {
        router.get('/', [DashboardController, 'getStats'])
      })
      .prefix('/dashboard')
  })
  .prefix('/api')
