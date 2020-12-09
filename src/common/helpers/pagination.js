const { pickBy, identity, pick } = require('lodash')

module.exports = function(query, itemCount) {
  let options = {}

  if (!query.limit || !query.page) {
    if (!query.limit) options.limit = 10
    else options.limit = parseInt(query.limit, 10)
    
    if (!query.page) { 
      options.offset = 0,
      query.page = 1
    }
  }
  else {
    options.limit = parseInt(query.limit, 10)
    options.offset = (parseInt(query.page, 10) - 1) * parseInt(options.limit, 10)
  }
  options.offset = (parseInt(query.page, 10) - 1) * parseInt(options.limit, 10)
  options.currentPage = parseInt(query.page, 10)
  options.pageCount = Math.ceil(itemCount/options.limit)
  console.log(query.page)
  console.log(options)
  options = pickBy(options, identity) // remove properties which have falsy value
  return options
}
