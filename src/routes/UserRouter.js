const express = require("express")
const router = express.Router()
const userController = require('../controller/UserController')
const { authMiddleWare } = require("../middleware/authMiddleware")

router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)
router.put('/update/:id', userController.updateUser)
router.delete('/delete/:id',authMiddleWare, userController.deleteUser)

module.exports = router