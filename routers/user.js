const UserController = require('../controllers/userController')

const routerUser = require('express').Router()

routerUser.get('/:userId/profiles', UserController.profie)
routerUser.get('/:userId/profiles/add', UserController.profie)
routerUser.post('/:userId/profiles/add', UserController.profie)
routerUser.get('/:userId/profiles/edit', UserController.profie)
routerUser.post('/:userId/profiles/edit', UserController.profie)

module.exports = routerUser