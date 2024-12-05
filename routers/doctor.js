const DoctorController = require('../controllers/doctorController')
const { isLoginDockter } = require('../middleware/auth')

const routerDoctor = require('express').Router()

routerDoctor.use(isLoginDockter)

routerDoctor.get('/', DoctorController.getAllDoctor)
routerDoctor.get('/appointment/:id', DoctorController.doctorAppointment)
routerDoctor.get('/appointment/:id/approve/:userId', DoctorController.doctorApprove)
routerDoctor.get('/appointment/:id/cancel/:userId', DoctorController.doctorCancel)

module.exports = routerDoctor