const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: [{ type: String, required: true }],
        type: { type: String, required: true },// loại sản phẩm: thực phẩm chức năng, mĩ phẩm, thuốc,....
        import_price: { type: Number, required: true },// giá nhập vào
        selling_price: { type: Number, required: true },// giá bán
        countInStock: { type: Number, required: true },// số lượng sản phẩm
        rating: { type: Number},// đánh giá sao
        description: { type: String },// mô tả
        discount: { type: Number },// giảm giá
        selled: { type: Number },// số lượng sản phẩm đã bán
        unit: {type: String},// đơn vị
        diseases: [{// loại bệnh lý mà thuốc này đặc trị
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Disease',
        }],
        suitableAge:[{type: String}],// lứa tuổi phù hợp
        suitableGender:[{type: String}],// giới tính phù hợp
        unsuitableDiseases: [{// loại bệnh lý mà không được dùng thuốc này (chống chỉ định cho phụ nữa có thai,...)
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Disease',
        }],
        status: { type: Number, default: 1 }
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;