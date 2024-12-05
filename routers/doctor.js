const DoctorController = require('../controllers/doctorController')
const { isLogin } = require('../middleware/auth')

const routerDoctor = require('express').Router()

// routerDoctor.use(isLogin)
routerDoctor.get('/', DoctorController.getAllDoctor)
routerDoctor.get('/appointment/:id', DoctorController.doctorAppointment)
routerDoctor.get('/appointment/:id/approve/:userId', DoctorController.doctorApprove)

module.exports = routerDoctor