const express = require('express');
const app = express()
const products = require('./products.route')

// for products routes
app.use('/products', products)

module.exports = app
