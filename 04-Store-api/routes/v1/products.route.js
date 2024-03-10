const express = require('express');
const router = express.Router()
const {getAllProductsList, 
    getProductsItem,addProduct } = require('../../controllers/products.controller');

router.route('/').get(getAllProductsList).post(addProduct)
router.route('/:productId').get(getProductsItem)

module.exports = router
