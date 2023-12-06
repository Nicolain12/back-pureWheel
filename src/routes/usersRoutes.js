const express = require('express')
const router = express.Router()
const multer = require('multer');
const path = require('path');
const usersAPI = require('../controllers/usersController')
const auth = require('../middlewares/authentication.js')
//MULTER
const {uploadUser} = require('../modules/multer.js')
// Validations
const {userValidations} = require('../modules/validations.js')

// List of users
router.get('/', usersAPI.list)
// User detail
router.get('/:id', usersAPI.detail)
// Register user
router.post('/register', userValidations, uploadUser.single('fileRegister'), usersAPI.register)
// Loggin user
router.post('/loggin', usersAPI.loggin)
// Update user
router.put('/update/:id', uploadUser.single('fileEdit'), usersAPI.update)
// Delete user
router.delete('/delete/:id', usersAPI.delete)
// Get User By Token
router.get('/token/byId', auth ,usersAPI.getByToken)


module.exports = router