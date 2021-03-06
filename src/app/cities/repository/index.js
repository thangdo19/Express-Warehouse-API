const { City } = require("../../../common/models/City")
const {Warehouse } = require("../../../common/models/Warehouse")
const { ConflictedError } = require("../../../common/errors/http-errors")

async function getCount(options) {
  const itemCount = await City.count(options)
  return itemCount
}

async function getAll(options) {
  const histories = await City.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    ...options
  })
  return {
    histories,
    ...options
  }
}
async function getOneByIdOrFail(id, options) {
  const city = await City.findOne({ 
    where: { id },
    ...options
  })
  if (!city) throw new NotFoundError('City not found')
  return city
}

async function getOne(id) {
  const city = await City.findOne({ 
    where: { id },
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  })
  return city
}

async function getWarehousesInCity(id){
  const city = await City.findOne({ 
    where: { id: id },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      model: Warehouse,
      as: 'warehouses',
      attributes: ['id', 'name', 'address', 'description']
    }
  })
  return city
} 

async function createOne(body, options) {
  await failIfDuplicated({ name: body.name })
  return City.create(body, options)
}

async function failIfDuplicated(condition) {
  const count = await getCount({ where: condition })
  if (count > 0) throw new ConflictedError('Duplicated')
}

module.exports = {
  getCount, 
  getAll,
  getOne,
  getWarehousesInCity,
  createOne,
  getOneByIdOrFail
}
