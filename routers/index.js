const router = require('express').Router()
const HomepageController = require('../controllers/homepageController')
const routerDoctor = require('./doctor')
const routerLogin = require('./login')
const routerUser = require('./user')

router.get('/', HomepageController.homepage)
router.use('/login', routerLogin)
router.use('/doctor', routerDoctor)
router.use('/user', routerUser)

module.exports = router