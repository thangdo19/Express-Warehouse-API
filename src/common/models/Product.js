const Joi = require('joi')
const sequelize = require('../../database/connection')
const { DataTypes } = require('sequelize')

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoryId: {
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }, 
  note: {
    type: DataTypes.STRING(255),
  },
  image: {
    type: DataTypes.STRING(1024),
    allowNull: false,
    defaultValue: 'https://i.pinimg.com/originals/0d/ed/76/0ded765283f158b5d59ba57e081eab36.png'
  }
}, {
  tableName: 'products'
})

/**
 * @Usage Validate product as a middleware
 */
function validateProduct(req, res, next) {
  const schema = Joi.object({
    categoryId: Joi.number(),
    warehouseId: Joi.number(),
    name: Joi.string().max(255),
    note: Joi.string().max(255).optional(),
    stock: Joi.number(),
    actionType: Joi.string().valid('IMPORT', 'EXPORT'),
    image: Joi.string().max(1024).optional(),
  })
  // seek for error
  const { error } = schema.validate(req.body, {
    presence: (req.method !== 'PATCH') ? 'required' : 'optional',
    abortEarly: false
  })
  // response when having error
  if (error) throw new BadRequestError(error.message)
  else next() // no error
}

function validateManagingProduct(req, res, next) {
  const schema = Joi.object({
    products: Joi.array().items(
      Joi.object({
        categoryId: Joi.number().optional(),
        warehouseId: Joi.number(),
        name: Joi.string().max(255),
        note: Joi.string().max(255).optional(),
        stock: Joi.number(),
        actionType: Joi.string().valid('IMPORT', 'EXPORT'),
        image: Joi.string().max(1024).optional(),
  })
    )
  })
  // seek for error
  const { error } = schema.validate(req.body, {
    presence: (req.method !== 'PATCH') ? 'required' : 'optional',
    abortEarly: false
  })
  // response when having error
  if (error) throw new BadRequestError(error.message)
  else next() // no error
}

module.exports = {
  Product,
  validateProduct,
  validateManagingProduct
}
