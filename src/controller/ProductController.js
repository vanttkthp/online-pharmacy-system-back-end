const ProductService = require('../services/ProductService')

const addProduct = async (req, res) =>{
    try{
        console.log(req.body)
        const { name, image, type, import_price, selling_price, countInStock, rating, description,
             discount, selled, unit, diseases, suitableAge, suitableGender, unsuitableDiseases } = req.body
        if (!name || !image || !type || !import_price || !selling_price ||!countInStock){
            return res.status(200).json({
                status: 'ERR',
                message : 'the input is required'
            })
        }
        const response = await ProductService.addProduct(req.body)
        return res.status(200).json(response)
    }catch (e){
        return res.status(404).json({
            message: e
        })
    }
}

const getBestSellerProduct = async (req, res) => {
    try {
        const response = await ProductService.getBestSellerProduct()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if(!productId){
            return res.status(200).json({
                status: 'ERR',
                message : 'khong co ten san pham'
            })
        }
        const response = await ProductService.getDetailProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const searchProduct = async (req, res) => {
    try {
        const {limit, page,sort,search} = req.query
        const response = await ProductService.searchProduct(Number(limit)||8, Number(page)||0,sort,search)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    addProduct,
    getBestSellerProduct,
    getDetailProduct,
    searchProduct
}