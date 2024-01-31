const Product = require('../models/ProductModel')
const Disease = require('../models/DiseaseModel')


const addProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, import_price, selling_price, countInStock, rating, description,
            discount, selled, unit, diseases, suitableAge, suitableGender, unsuitableDiseases } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct != null) {
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
            if (createdProduct) {
                resolve({
                    status: '0K',
                    message: 'success',
                    data: createdProduct
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

const getBestSellerProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const topProduct = await Product.find().sort({ selled: -1 }).limit(12)
            const selectedData = topProduct.map(product => ({
                id: product.id,
                name: product.name,
                type: product.type,
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

const getDetailProduct = (ProductId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(ProductId)
            const checkProduct = await Product.findOne({
                _id: ProductId
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ok',
                    message: 'khong ton tai san pham'
                })
            } else {
                resolve({
                    status: 'ok',
                    message: 'tim kiem thanh cong',
                    checkProduct
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const searchProduct = (limit, page, sort, search) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Đảm bảo limit và page là số dương
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

            if (search) {
                const listsearchedProduct = await Product.find({ $text: { $search: search[1] } })
                    .limit(limit)
                    .skip(page * limit);
                const selectedData = listsearchedProduct.map(product => ({
                    id: product.id,
                    name: product.name,
                    type: product.type,
                    image: product.image,
                    unit: product.unit,
                    discount: product.discount,
                    selled: product.selled
                }));
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: selectedData,
                    totalPage: totalPages,
                    pageCurrent: page + 1
                });
            }

            const objectSort = sort ? { [sort[0]]: sort[1] } : { "selled": 'desc' };
            console.log(objectSort)
            const listSortedProduct = await Product.find().limit(limit).skip(limit * page).sort(objectSort)
            const selectedData = listSortedProduct.map(product => ({
                id: product.id,
                name: product.name,
                type: product.type,
                image: product.image,
                unit: product.unit,
                discount: product.discount,
                selled: product.selled,
                selling_price: product.selling_price
            }));
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: selectedData,
                totalPage: totalPages,
                pageCurrent: page + 1
            });
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    addProduct,
    getBestSellerProduct,
    getDetailProduct,
    searchProduct
}