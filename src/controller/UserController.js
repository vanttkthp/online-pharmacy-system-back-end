const UserService = require('../services/UserService')

const createUser = async (req, res) =>{
    try{
        const { name, email, password, confirmPassword, phone, address, gender, birthday} = req.body
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const isCheckEmail = reg.test(email)
        if (!name || !email || !password || !confirmPassword || !phone){
            return res.status(200).json({
                status: 'ERR',
                message : 'the input is required'
            })
        } else if (!isCheckEmail){
            return res.status(200).json({
                status: 'ERR',
                message : 'the input is email'
            })
        } else if (password !== confirmPassword){
            return res.status(200).json({
                status: 'ERR',
                message: 'the password is err'
            })
        }
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    }catch (e){
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async (req, res) =>{
    try{
        console.log(req.body)
        const { email, password} = req.body
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const isCheckEmail = reg.test(email)
        if (!email || !password ){
            return res.status(200).json({
                status: 'ERR',
                message : 'the input is required'
            })
        } else if (!isCheckEmail){
            return res.status(200).json({
                status: 'ERR',
                message : 'the input is email'
            })
        } 
        const response = await UserService.loginUser(req.body)
        return res.status(200).json(response)
    }catch (e){
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async (req, res) =>{
    try{
        const userId = req.params.id 
        const data = req.body
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message : 'khong co id'
            })
        }
        const response = await UserService.updateUser(userId,data)
        return res.status(200).json(response)
    }catch (e){
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser
}