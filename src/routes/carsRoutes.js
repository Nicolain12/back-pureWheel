const express = require('express')
const router = express.Router()
const fs = require('fs');
const multer = require('multer')
const path = require('path');
const carsAPI = require('../controllers/carsController')
const auth = require('../middlewares/authentication.js')
//MULTER
//car
const storageCar = multer.diskStorage({
    destination: function (req, file, cb) {
        // const userId = req.token.finded.id;
        const userId = 2;
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
        if(file.fieldname === 'logo'){
        const folder = path.join(__dirname, `../../public/images/brands`);
        cb(null, folder);
    }
    if(file.fieldname === 'banner'){
        const folder = path.join(__dirname, `../../public/images/banners`);
        cb(null, folder);
    }
    
    },
    filename: function (req, file, cb) {
        if(file.fieldname === 'logo'){
            const imageName = `${Date.now()}-${req.body.name}${path.extname(file.originalname)}`
        cb(null, imageName);
        }
       if(file.fieldname === 'banner'){
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
//************* Data By Id ************* 
// Car
router.get('/:id', carsAPI.carByPk)
// Brand
router.get('/brands/:id', carsAPI.brandByPk)
//Model
router.get('/models/:id', carsAPI.modelByPk)
//************* Create ************* 
// Car
router.post('/create', uploadCar.array('productFiles'), carsAPI.createCar)
// Brand
router.post('/brands/create', uploadBrand.fields([{ name: 'logo', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), carsAPI.createBrand);
//Model
router.post('/models/create', carsAPI.createModel)
//************* Update ************* 
router.put('/update/:id', uploadCar.array('productFiles'), carsAPI.updateCar)
// Brand
router.put('/brands/update/:id', uploadBrand.fields([{ name: 'logo', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), carsAPI.updateBrand);
//Model
router.put('/models/update/:id', carsAPI.updateModel)
//************* Delete ************* 
router.delete('/delete/:id', carsAPI.deleteCar)
// Brand
router.delete('/brands/delete/:id', carsAPI.deleteBrand);
//Model
router.delete('/models/delete/:id', carsAPI.deleteModel)

module.exports = router

