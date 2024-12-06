const UserController = require('../controllers/userController')
const { isLoginUser } = require('../middleware/auth')

const routerUser = require('express').Router()

routerUser.use(isLoginUser)

routerUser.get('/:userId/profiles', UserController.profie)
routerUser.get('/:userId/profiles/add', UserController.addProfile)
routerUser.post('/:userId/profiles/add', UserController.saveAddedProfile)
routerUser.get('/:userId/profiles/edit', UserController.editProfile)
routerUser.post('/:userId/profiles/edit', UserController.saveEditProfile)
routerUser.get('/:userId/doctor', UserController.getAllDoctor)
routerUser.get('/:userId/doctor/appointment', UserController.makeAppointment)
routerUser.post('/:userId/doctor/appointment', UserController.saveAppointment)
routerUser.get('/:userId/doctor/listAppointment', UserController.listAppointmentUser)
routerUser.get('/:userId/doctor/listAppointment/:id/cancel', UserController.cancelAppointmentUser)
routerUser.get('/:userId/doctor/listAppointment/:id/invoice', UserController.appointmentInvoice)
routerUser.get('/:userId/doctor/listAppointment/:id/delete', UserController.deleteAppointment)



module.exports = routerUser