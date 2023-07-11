const express = require('express')
const router = express.Router()
const path = require('path');
const carsAPI = require('../controllers/carsController')
//MULTER
// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         let folder = path.join(__dirname, '../../public/images/users')
//         cb(null, folder)
//     },
//     filename: function (req, file, cb) {
//         let imageName ='user-' +  Date.now() + path.extname(file.originalname)
//         cb(null, imageName)
//     }
// })
// const upload = multer({ storage: storage })

// List 
// Brands
router.get('/', carsAPI.carsList)
router.get('/brands', carsAPI.brandsList)
router.get('/models', carsAPI.modelsList)

module.exports = router