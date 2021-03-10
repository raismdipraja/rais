const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const authenticate = require('../middleware/authenticate')


// create
router.post('/', userController.postUser)
// Read
router.get('/', authenticate, userController.getUser)
// read by id
router.get('/:userId', userController.getUserId)
// read by account number
router.get('/useran/:useran', userController.getUserAn)
// read by identity Number
router.get('/useritt/:useritt', userController.getUserItt)
// update
router.put('/:userId', userController.updateUser)
// delete
router.delete('/:userId', userController.deleteUser)


router.post('/login/', authController.login)

module.exports = router