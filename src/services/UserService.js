const User = require("../models/UserModels")
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("./JwtService")
const createUser = (newUser) => {
    return new Promise(async (resolve,reject)=>{
        const { name, email, password, confirmPassword, phone, address, gender, birthday} = newUser

        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser!=null){
                resolve({
                    status: 'ok',
                    message: 'the email is already'
                })
            }else{
                const hash = bcrypt.hashSync(password,10)
                console.log('hash', hash)
                const createdUser = await User.create({
                    name,
                    email,
                    password: hash,
                    phone,
                    address,
                    gender,
                    birthday
                })
                if(createdUser){
                    resolve({
                        status: '0K',
                        message: 'success',
                        data: createdUser
                    })
                }
            }
        }catch (e){
            reject(e)
        }
    })
}

const loginUser = (userLogin)=> {
    return new Promise(async (resolve,reject)=>{
        const { email, password} = userLogin
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser===null){
                resolve({
                    status: 'ok',
                    message: 'khong ton tai mail'
                })
            }else{
                const comparePassword = bcrypt.compareSync(password,checkUser.password)
                if(!comparePassword){
                    resolve({
                        status: 'ok',
                        message: 'sai mk'
                    })
                }else{
                    const access_token = await generalAccessToken({
                        id: checkUser.id,
                        isAdmin: checkUser.isAdmin
                    })
                    const refresh_token = await generalRefreshToken({
                        id: checkUser.id,
                        isAdmin: checkUser.isAdmin
                    })
                    resolve({
                        status: 'ok',
                        message: 'dung mk',
                        access_token,
                        refresh_token
                    })
                }
            }
        }catch (e){
            reject(e)
        }
    })
}

const updateUser = (id, data)=> {
    return new Promise(async (resolve,reject)=>{
        try{
            const checkUser = await User.findOne({
                _id: id
            })
            if(checkUser===null){
                resolve({
                    status: 'ok',
                    message: 'khong ton tai id'
                })
            }else{
                const updatedUser = await User.findByIdAndUpdate(id,data,{new: true})
                resolve({
                    status: 'ok',
                    message: 'cap nhat thanh cong',
                    updatedUser
                })
            }
        }catch (e){
            reject(e)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }

            await User.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const listUser = await User.find()
            const selectedData = listUser.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }));
            resolve({
                status: 'OK',
                message: 'Success',
                data: selectedData
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailUser= (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const choosedUser = await User.findOne({
                _id: id
            })
            resolve({
                status: 'OK',
                message: 'Success',
                data: choosedUser
            })
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser
}