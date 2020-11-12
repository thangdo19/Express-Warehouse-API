const router = require('express').Router()
const service = require('../service')
const { validateWarehouse } = require('../../../common/models/Warehouse')


router.get('/', async (req, res) => {
  return await service.getAll(req, res)
})

/* get warehouse by userId */
router.get('/user', [auth], async (req, res) => {
  return await service.getWarehouseByUserId(req, res)
})

router.get('/:id', [auth], async (req, res) => {
  return await service.getOne(req, res)
})

/* get warehouse by id with list users */
router.get('/:id/users', [auth], async (req, res) => {
  return await service.getOneWithUsers(req, res)
})

/* apply a user to a warehouse */
router.post('/user', [
  auth, 
  checkAction(['EDIT_USER', 'EDIT_WAREHOUSE'])
], async (req, res) => {
  return await service.applyUserToWarehouse(req, res)
})

router.post('/', [validateWarehouse], async (req, res) => {
  return await service.createOne(req, res)
})
module.exports = router
