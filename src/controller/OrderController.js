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


module.exports = {
    createOrder,
    getAllOrder,
    getOrderDetail
}