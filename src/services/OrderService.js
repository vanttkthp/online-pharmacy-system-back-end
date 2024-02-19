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

const getAllOrder = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const listOrder = await Order.find({
                user: userId
            }).sort({createdAt: -1, updatedAt: -1})
            if (listOrder === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: listOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getOrderDetail = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                _id: orderId
            })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllOrderAdmin = (limit, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (limit <= 0 || page < 0) {
                resolve({
                    status: 'OK',
                    message: 'limit và page không đúng',
                });
            }
            const totalProduct = await Product.countDocuments();

            // Tính số trang hiện tại
            const totalPages = Math.ceil(totalProduct / limit);

            // Kiểm tra xem trang hiện tại có hợp lệ không
            if (page >= totalPages) {
                throw new Error("Invalid page number");
            }

            const listOrder = await Order.find().limit(limit).skip(page*limit).sort({createdAt: -1, updatedAt: -1})
            const selectedData = listOrder.map(order => ({
                _id: order.id,
                orderItems: order.orderItems.map(item => ({
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    amount: item.amount
                })),
                totalPrice: order.totalPrice
            }))
            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: selectedData
            })
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    createOrder,
    getAllOrder,
    getOrderDetail,
    getAllOrderAdmin
}