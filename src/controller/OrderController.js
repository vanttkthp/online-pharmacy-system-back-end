const OrderService = require("../services/OrderService")

const createOrder = async (req, res) => {
    try{
        const {paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone} = req.body
        if(!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !city || !phone){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await OrderService.createOrder(req.body)
        return res.status(200).json(response)
    } catch (e){
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrder = async (req, res) => {
    try{
        const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }

        const response = await OrderService.getAllOrder(userId)
        return res.status(200).json(response)
    } catch (e){
        return res.status(404).json({
            message: e
        })
    }
}

const getOrderDetail = async (req, res) => {
    try{
        const orderId = req.params.id
        if(!orderId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The orderId is required'
            })
        }

        const response = await OrderService.getOrderDetail(orderId)
        return res.status(200).json(response)
    } catch (e){
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrderAdmin = async (req, res) => {
    try{
        const {limit, page} = req.query
        const response = await OrderService.getAllOrderAdmin(Number(limit)||12,Number(page)||0)
        return res.status(200).json(response)
    } catch (e){
        return res.status(404).json({
            message: e
        })
    }
}

const cancelOrder = async (req, res) => {
    try{
        const orderId = req.body.orderId
        const data = req.body.orderItems
        if(!orderId){
            return res.status(200).json({
                status: 'ERR',
                message: 'No have ID of Order'
            })
        }
        const response = await OrderService.cancelOrder(orderId, data)
        return res.status(200).json(response)
    } catch (e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createOrder,
    getAllOrder,
    getOrderDetail,
    getAllOrderAdmin,
    cancelOrder
}