const multer = require('multer')
const path = require('path');
const fs = require('fs');

//Car
const storageCar = multer.diskStorage({
    destination: function (req, file, cb) {
        const userId = req.token.finded.id
        const folder = path.join(__dirname, `../../public/images/cars/user_${userId}`)
        fs.mkdirSync(folder, { recursive: true })
        cb(null, folder)
    },
    filename: function (req, file, cb) {
        const imageName = `car-${Date.now()}${path.extname(file.originalname)}`
        cb(null, imageName)
    }
})
const uploadCar = multer({ storage: storageCar })
//Brand
const storageBrand = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'logo') {
            const folder = path.join(__dirname, `../../public/images/brands`)
            cb(null, folder)
        }
        if (file.fieldname === 'banner') {
            const folder = path.join(__dirname, `../../public/images/banners`)
            cb(null, folder)
        }

    },
    filename: function (req, file, cb) {
        if (file.fieldname === 'logo') {
            const imageName = `${Date.now()}-${req.body.name}${path.extname(file.originalname)}`
            cb(null, imageName)
        }
        if (file.fieldname === 'banner') {
            const imageName = `${Date.now()}-banner-${req.body.name}${path.extname(file.originalname)}`
            cb(null, imageName)
        }

    }
})
const uploadBrand = multer({ storage: storageBrand })

// User
const storageUser = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = path.join(__dirname, '../../public/images/users')
        cb(null, folder)
    },
    filename: function (req, file, cb) {
        let imageName =`user-${Date.now()}${path.extname(file.originalname)}`
        cb(null, imageName)
    }
})
const uploadUser = multer({ storage: storageUser })


module.exports = {uploadCar, uploadBrand, uploadUser}