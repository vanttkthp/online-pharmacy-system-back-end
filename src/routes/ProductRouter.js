const express = require("express")
const router = express.Router()
const productController = require('../controller/ProductController')

router.post('/addProduct',productController.addProduct)
router.get('/bestProduct',productController.getBestSellerProduct)

module.exports = router