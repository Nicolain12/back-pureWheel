const express = require('express')
const router = express.Router()
const multer = require('multer');
const path = require('path');
const usersAPI = require('../controllers/usersController')
const auth = require('../middlewares/authentication.js')

//MULTER
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = path.join(__dirname, '../../public/images/users')
        cb(null, folder)
    },
    filename: function (req, file, cb) {
        let imageName =`user-${Date.now()}${path.extname(file.originalname)}`
        cb(null, imageName)
    }
})
const upload = multer({ storage: storage })

// List of users
router.get('/', usersAPI.list)
// User detail
router.get('/:id', usersAPI.detail)
// Register user
router.post('/register', upload.single('fileRegister'), usersAPI.register)
// Loggin user
router.post('/loggin', usersAPI.loggin)
// Update user
router.put('/update/:id', upload.single('fileEdit'), usersAPI.update)
// Delete user
router.delete('/delete/:id', usersAPI.delete)

// Get User By Token
router.get('/token/byId', auth,usersAPI.getByToken)

module.exports = router