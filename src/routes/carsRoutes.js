const express = require('express')
const router = express.Router()
const fs = require('fs');
const multer = require('multer')
const path = require('path');
const carsAPI = require('../controllers/carsController')
const auth = require('../middlewares/authentication.js')
const authAdmin = require('../middlewares/adminAuth.js')
//MULTER
//car
const storageCar = multer.diskStorage({
    destination: function (req, file, cb) {
        const userId = req.token.finded.id;
        const folder = path.join(__dirname, `../../public/images/cars/user_${userId}`);
        fs.mkdirSync(folder, { recursive: true });
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const imageName = `car-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, imageName);
    }
});
const uploadCar = multer({ storage: storageCar });
//Brand
const storageBrand = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'logo') {
            const folder = path.join(__dirname, `../../public/images/brands`);
            cb(null, folder);
        }
        if (file.fieldname === 'banner') {
            const folder = path.join(__dirname, `../../public/images/banners`);
            cb(null, folder);
        }

    },
    filename: function (req, file, cb) {
        if (file.fieldname === 'logo') {
            const imageName = `${Date.now()}-${req.body.name}${path.extname(file.originalname)}`
            cb(null, imageName);
        }
        if (file.fieldname === 'banner') {
            const imageName = `${Date.now()}-banner-${req.body.name}${path.extname(file.originalname)}`
            cb(null, imageName);
        }

    }
});
const uploadBrand = multer({ storage: storageBrand });

//************* List ************* 
// Cars
router.get('/', carsAPI.carsList)
// Brands
router.get('/brands', carsAPI.brandsList)
//Models
router.get('/models', carsAPI.modelsList)
//Chassis
router.get('/chassis', carsAPI.bodyCarList)
//Version
router.get('/versions', carsAPI.versionList)
//Color
router.get('/colors', carsAPI.colorList)
//************* Data By Id ************* 
// Car
router.get('/:id', carsAPI.carByPk)
// Brand
router.get('/brands/:id', carsAPI.brandByPk)
//Model
router.get('/models/:id', carsAPI.modelByPk)
//Version
router.get('/versions/:id', carsAPI.versionByPk)
//color
router.get('/colors/:id', carsAPI.colorByPk)

//************* Create ************* 
// Car
router.post('/create', authAdmin, uploadCar.array('productFiles'), carsAPI.createCar)
// Brand
router.post('/brands/create', authAdmin, uploadBrand.fields([{ name: 'logo', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), carsAPI.createBrand);
//Model
router.post('/models/create', authAdmin, carsAPI.createModel)
//Version
router.post('/versions/create', authAdmin, carsAPI.createVersion)
//color
router.post('/colors/create', authAdmin, carsAPI.createColor)

//************* Update ************* 
// Car
router.put('/update/:id', authAdmin, uploadCar.array('productFiles'), carsAPI.updateCar)
// Brand
router.put('/brands/update/:id', uploadBrand.fields([{ name: 'logo', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), carsAPI.updateBrand);
//Model
router.put('/models/update/:id', carsAPI.updateModel)

//************* Delete ************* 
// Car
router.delete('/delete/:id', authAdmin, carsAPI.deleteCar)
// Brand
router.delete('/brands/delete/:id', authAdmin, carsAPI.deleteBrand)
//Model
router.delete('/models/delete/:id', authAdmin, carsAPI.deleteModel)
//Version
router.delete('/versions/delete/:id', carsAPI.deleteVersion)
//color
router.delete('/colors/delete/:id', carsAPI.deleteColor)

module.exports = router

