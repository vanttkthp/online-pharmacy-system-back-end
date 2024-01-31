const express = require("express")
const router = express.Router()
const userController = require('../controller/UserController')
const { authMiddleWare, authUserMiddleWare} = require("../middleware/authMiddleware")

router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)
router.put('/update/:id', authUserMiddleWare,userController.updateUser)
router.delete('/delete/:id',authMiddleWare, userController.deleteUser)
router.get('/getAllUser',authMiddleWare,userController.getAllUser)
router.get('/detail/:id',authUserMiddleWare,userController.getDetailUser)

module.exports = router