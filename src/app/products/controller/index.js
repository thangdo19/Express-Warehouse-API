const router = require('express').Router()
const service = require('../service')
const { auth } = require('../../../common/middlewares/auth')
const { validateManagingProduct, validateProduct } = require('../../../common/models/Product')

router.get('/', async (req, res) => {
  return await service.getAll(req, res)
})

router.get('/:id', async (req, res) => {
  return await service.getOne(req, res)
})

// get products by their warehouse
router.get('/warehouse/:id', async (req, res) => {
  return await service.getProductInWarehouse(req, res)
})

/**
 * @Usage This route is used for 2 purposes:
 *        Create new product then import it into the specified warehouse.
 *        Handle import/export product of users.
 */
router.post('/', [auth, validateManagingProduct], async (req, res) => {
  return await service.createOne(req, res)
})

router.patch('/:id', [auth, validateProduct], async (req, res) => {
  return await service.updateOne(req, res)
})

module.exports = router
