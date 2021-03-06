const Joi = require('joi')
const sequelize = require('../../database/connection')
const { DataTypes } = require('sequelize')

const Warehouse = sequelize.define('Warehouse', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cityId: {
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(255),
  },
  image: {
    type: DataTypes.STRING(1024),
    allowNull: false,
    defaultValue: 'https://image.flaticon.com/icons/png/512/407/407826.png'
  }
}, {
  tableName: 'warehouses'
})

/**
 * @Usage Validate warehouse as a middleware
 */
function validateWarehouse(req, res, next) {
  const schema = Joi.object({
    cityId: Joi.number(),
    name: Joi.string().max(255),
    address: Joi.string().max(255),
    description: Joi.string().max(255).optional(),
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

module.exports = {
  Warehouse,
  validateWarehouse
}