const Order = require("../models/OrderProduct")
const Product = require("../models/ProductModel")

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user, isPaid, paidAt, email } = newOrder
        try {
            const promises = orderItems.map(async (order) => {
                // Tìm và cập nhật sản phẩm
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        countInStock: { $gte: order.amount }
                    },
                    {
                        $inc: {
                            countInStock: -order.amount,
                            selled: +order.amount
                        }
                    },
                    { new: true }
                )

                if (productData) {
                    // Nếu sản phẩm được cập nhật thành công
                    return {
                        status: 'OK',
                        message: 'SUCCESS'
                    }
                } else {
                    // Nếu sản phẩm không được cập nhật thành công
                    return {
                        status: 'OK',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })

            const results = await Promise.all(promises)
            const newData = results && results.filter((item) => item.id)

            if (newData.length) {
                const arrId = []
                newData.forEach((item) => {
                    arrId.push(item.id)
                })

                // Trả về lỗi với các sản phẩm không đủ hàng
                resolve({
                    status: 'ERR',
                    message: `Sản phẩm với id: ${arrId.join(',')} không đủ hàng`
                })
            } else {
                // Tạo đơn hàng mới
                const createdOrder = await Order.create({
                    orderItems,
                    shippingAddress: {
                        fullName,
                        address,
                        city,
                        phone
                    },
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    totalPrice,
                    user: user,
                    isPaid,
                    paidAt
                })

                // Trả về đơn hàng đã tạo thành công
                resolve({
                    status: 'OK',
                    message: 'success',
                    successOrder: createOrder
                })
            }
        } catch (e) {
            // Xử lý lỗi nếu có
            reject(e)
        }
    })
}


module.exports = {
    createOrder
}