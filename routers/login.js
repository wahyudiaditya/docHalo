const DoctorController = require('../controllers/doctorController')
const LoginController = require('../controllers/loginController')
const { loginTrue } = require('../middleware/auth')

const routerLogin = require('express').Router()

routerLogin.get('/', loginTrue, LoginController.loginUser)
routerLogin.post('/', LoginController.saveLoginUser)
routerLogin.get('/doctor', loginTrue, DoctorController.loginDoctor)
routerLogin.post('/doctor', DoctorController.saveLoginDoctor)
routerLogin.get('/register', loginTrue, LoginController.registerForm)
routerLogin.post('/register', LoginController.saveRegister)


routerLogin.get('/logout', LoginController.logout)

module.exports = routerLogin