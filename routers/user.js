const UserController = require('../controllers/userController')

const routerUser = require('express').Router()

routerUser.get('/:userId/profiles', UserController.profie)
routerUser.get('/:userId/profiles/add', UserController.addProfile)
routerUser.post('/:userId/profiles/add', UserController.saveAddedProfile)
routerUser.get('/:userId/profiles/edit', UserController.editProfile)
routerUser.post('/:userId/profiles/edit', UserController.saveEditProfile)
routerUser.get('/:userId/doctor', UserController.getAllDoctor)
routerUser.get('/:userId/doctor/appointment', UserController.makeAppointment)

module.exports = routerUser