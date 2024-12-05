const DoctorController = require('../controllers/doctorController')
const LoginController = require('../controllers/loginController')
const { isLogin } = require('../middleware/auth')

const routerLogin = require('express').Router()

routerLogin.get('/', LoginController.loginUser)
routerLogin.post('/', LoginController.saveLoginUser)
routerLogin.get('/doctor', DoctorController.loginDoctor)
routerLogin.post('/doctor', DoctorController.saveLoginDoctor)
routerLogin.get('/register', LoginController.registerForm)
routerLogin.post('/register', LoginController.saveRegister)

// routerLogin.use(isLogin)
routerLogin.get('/logout', LoginController.logout)

module.exports = routerLogin