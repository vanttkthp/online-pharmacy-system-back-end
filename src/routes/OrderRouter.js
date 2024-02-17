const express = require("express");
const router = express.Router()
const OrderController = require('../controller/OrderController');
const { authUserMiddleWare, authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', authUserMiddleWare, OrderController.createOrder)
router.get('/getAllOrder/:id',authUserMiddleWare,OrderController.getAllOrder)
router.get('/getOrderDetail/:id', OrderController.getOrderDetail)

module.exports = router