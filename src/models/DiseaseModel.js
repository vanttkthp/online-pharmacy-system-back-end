const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },// thông tin về bệnh
    image: [{ type: String }], // Đường dẫn đến hình ảnh của bệnh
    status: { type: Number, default: 1 }
  },
  {
    timestamps: true
  }
);

const Disease = mongoose.model('Disease', diseaseSchema);

module.exports = Disease;
