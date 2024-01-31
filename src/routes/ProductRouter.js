const express = require("express")
const router = express.Router()
const productController = require('../controller/ProductController')

router.post('/addProduct',productController.addProduct)
router.get('/bestProduct',productController.getBestSellerProduct)
router.get('/detail/:id',productController.getDetailProduct)
router.get('/search',productController.searchProduct)

module.exports = router