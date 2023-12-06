const express = require('express')
const router = express.Router()
const carsAPI = require('../controllers/carsController')
const authAdmin = require('../middlewares/adminAuth.js')
//MULTER
const {uploadCar, uploadBrand} = require('../modules/multer.js')


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
router.delete('/versions/delete/:id', authAdmin, carsAPI.deleteVersion)
//color
router.delete('/colors/delete/:id', authAdmin, carsAPI.deleteColor)

module.exports = router

