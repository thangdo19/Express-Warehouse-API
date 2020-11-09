require('express-async-errors')
const express = require('express')
const app = express()
const morgan = require('morgan')
const users = require('./users/controller')
const warehouses = require('./warehouses/controller')
const permissions = require('./permissions/controller')
const products = require('./products/controller')
const histories = require('./histories/controller')
const error = require('../common/middlewares/error-handler-middleware')
const { PORT } = require('../common/environments')

require('../common/helpers/handle-uncaught-errors')()
require('../common/helpers/model-association')()

app.use(express.json())
app.use(morgan('dev'))

app.use('/users', users)
app.use('/warehouses', warehouses)
app.use('/permissions', permissions)
app.use('/products', products)
app.use('/histories', histories)
app.use(error)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
