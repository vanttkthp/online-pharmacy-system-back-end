const Product = require('../models/ProductModel')
const Disease = require('../models/DiseaseModel')

const addProduct = (newProduct) => {
    return new Promise(async (resolve,reject)=>{
        const { name, image, type, import_price, selling_price, countInStock, rating, description,
            discount, selled, unit, diseases, suitableAge, suitableGender, unsuitableDiseases } = newProduct
        try{
            const checkProduct = await Product.findOne({
                name: name
            })
            if(checkProduct!=null){
                resolve({
                    status: 'ok',
                    message: 'san pham ton tai'
                })
            }
            // Tạo mảng để lưu các ObjectId tương ứng với tên bệnh
            const objectIdArray1 = [];

            // Lặp qua mảng tên bệnh và tìm kiếm ObjectId tương ứng
            for (const diseaseName of diseases) {
                const disease = await Disease.findOne({ name: diseaseName });
                if (disease) {
                    objectIdArray1.push(disease._id);
                }
            }

            // Tạo mảng để lưu các ObjectId tương ứng với tên bệnh
            const objectIdArray2 = [];
            for (const unsuitableDiseaseName of unsuitableDiseases) {
                const disease = await Disease.findOne({ name: unsuitableDiseaseName });
                if (disease) {
                    objectIdArray2.push(disease._id);
                }
            }
            const createdProduct = await Product.create({
                name,
                image,
                type,
                import_price,
                selling_price,
                countInStock,
                rating,
                description,
                discount,
                selled,
                unit,
                diseases: objectIdArray1, 
                suitableAge,
                suitableGender,
                unsuitableDiseases: objectIdArray2
            })
            if(createdProduct){
                resolve({
                    status: '0K',
                    message: 'success',
                    data: createdProduct
                })
            }

        }catch (e){
            reject(e)
        }
    })
}

const getBestSellerProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const topProduct = await Product.find().sort({selled: -1}).limit(12)
            const selectedData = topProduct.map(product => ({
                name: product.name,
                image: product.image,
                unit: product.unit,
                discount: product.discount,
                selled: product.selled
            }));
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: selectedData
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    addProduct,
    getBestSellerProduct
}