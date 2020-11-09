const { NotFoundError } = require("../../../common/errors/http-errors")
const { Product } = require("../../../common/models/Product")

async function getCount(options) {
  const itemCount = await Product.count(options)
  return itemCount
}

async function getAll(options) {
  const products = await Product.findAll({
    ...options
  })
  return {
    products
  }
}

async function getOne(id, options) {
  const product = await Product.findOne({ 
    where: { id },
    ...options
  })
  return product
}

async function getOneByIdOrFail(id, options) {
  const product = await Product.findOne({ 
    where: { id },
    ...options
  })
  if (!product) throw new NotFoundError('Product not found')
  return product
}

module.exports = {
  getCount, 
  getAll,
  getOne,
  getOneByIdOrFail,
}
