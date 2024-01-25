const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    phone: { type: Number },
    address: { type: String },
    avatar: { type: String },
    gender: { type: String },// giới tính -- hiển thị thuốc phù hợp với giới tính
    birthday: { type: Date },// ngày sinh -- để tính tuổi hiển thị thuốc phù hợp với lứa tuổi
    status: { type: Number, default: 1 } 
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
