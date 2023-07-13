const { log } = require('console');
const db = require('../database/models')
const fs = require('fs');
const Cars = db.Car
const Brands = db.Brand
const Models = db.CarModel

module.exports = {
    //list ✔︎
    carsList: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const cars = await Cars.findAll({
                include: [{ association: 'brand' }, { association: 'model' }]
            })
            response.info.total = cars.length
            response.data = cars
            res.json(response)
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },
    brandsList: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const brands = await Brands.findAll()
            response.info.total = Brands.length
            response.data = brands
            res.json(response)
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },
    modelsList: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const models = await Models.findAll({
                include: [{ association: 'brand' }]
            })
            response.info.total = models.length
            response.data = models
            res.json(response)
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },
    //ByPk ✔︎
    carByPk: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const car = await Cars.findByPk(req.params.id, {
                include: [{ association: 'brand' }, { association: 'model' }]
            })
            if (car) {
                response.data = car
                res.json(response)
            } else res.status(404).json({ status: 404, error: 'Car not found' })
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },
    brandByPk: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const brand = await Brands.findByPk(req.params.id)
            if (brand) {
                response.data = brand
                const carsIncluded = await Cars.findAll({
                    where: { brand_id: brand.dataValues.id }
                })
                if (carsIncluded) {
                    response.info.cars = carsIncluded.length
                    response.info.carsIncluded = carsIncluded
                }
                res.json(response)
            } else res.status(404).json({ status: 404, error: 'Brand not found' })
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },
    modelByPk: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const model = await Models.findByPk(req.params.id, {
                include: [{ association: 'brand' }]
            })
            if (model) {
                response.data = model
                const carsIncluded = await Cars.findAll({
                    where: { carModel_id: model.dataValues.id }
                })
                if (carsIncluded) {
                    response.info.cars = carsIncluded.length
                    response.info.carsIncluded = carsIncluded
                }
                res.json(response)
            } else res.status(404).json({ status: 404, error: 'Model not found' })
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },
    //Create✔︎
    createCar: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const newCar = {
                images: JSON.stringify(req.files.map((file) => file.filename)),
                year: req.body.year,
                carModel_id: req.body.carModel_id,
                brand_id: req.body.brand_id,
                // user_id: req.token.finded.id,
                user_id: 2,
                km: req.body.km,
                color: req.body.color,
                description: req.body.description,
                price: req.body.price,
                damage: req.body.damage,
                onSale: req.body.onSale
            }
            if (newCar.onSale) newCar.price = newCar.price - (newCar.price * newCar.onSale / 100)
            const addingCar = await Cars.create(newCar)
            response.data = addingCar
            res.json(response)
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }

    },
    createBrand: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const logoFile = req.files['logo'] ? req.files['logo'][0] : null
            const bannerFile = req.files['banner'] ? req.files['banner'][0] : null
            const newBrand = {
                name: req.body.name,
                logo: logoFile.filename,
                banner: bannerFile ? bannerFile.filename : null,
            }

            const addingBrand = await Brands.create(newBrand)
            response.data = addingBrand
            res.json(response)
        } catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },
    createModel: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const newModel = {
                name: req.body.name,
                brand_id: req.body.brand_id
            }
            const addingModel = await Models.create(newModel)
            response.data = addingModel
            res.json(response)
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }

    },
    //Update
    updateCar: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const oldImgs = req.body.oldImages
            const rmvImgs = req.body.removeImages
            const newCar = {
                year: req.body.year,
                carModel_id: req.body.carModel_id,
                brand_id: req.body.brand_id,
                km: req.body.km,
                color: req.body.color,
                description: req.body.description,
                price: req.body.price,
                damage: req.body.damage,
                onSale: req.body.onSale,
            }
            if (oldImgs) {
                const newCarImg = []
                if (typeof oldImgs === 'object') {
                    oldImgs.forEach(element => {
                        newCarImg.push(element)
                    });
                    if (req.files) {
                        req.files.forEach(file => {
                            newCarImg.push(file.filename)
                        });
                    }
                    newCar.image = newCarImg
                }
                if (typeof oldImgs === 'string') {
                    newCarImg.push(oldImgs)
                    if (req.files) {
                        req.files.forEach(file => {
                            newCarImg.push(file.filename)
                        });
                    }
                    newCar.image = newCarImg
                }
            } else {
                newCar.image = req.files.map((file) => file.filename)
            }
            if (rmvImgs) {
                if (typeof rmvImgs === 'object') {
                    rmvImgs.forEach(element => {
                        fs.unlink(`public/images/cars/user_${req.token.finded.id}/${element}`, (err) => {
                            if (err) {
                                console.error(err);
                            }
                        });
                    });
                }
                if (typeof rmvImgs === 'string') {
                    fs.unlink(`public/images/cars/user_${req.token.finded.id}/${rmvImgs}`, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                }
            }
            const edited = await Cars.update(newCar, { where: { id: req.params.id } })
            response.data = edited
            res.json(response)
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },
    updateBrand: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            //if(admins){
            const logoFile = req.files['logo'][0]
            const bannerFile = req.files['banner'][0]
            const newBrand = {
                name: req.body.name,
            }
            if (logoFile != undefined) newBrand.logo = logoFile.filename
            if (bannerFile != undefined) newBrand.banner = bannerFile.filename
            if (newBrand.logo) {
                const previousBrand = await Brands.findByPk(req.params.id)
                const previousImage = previousBrand.dataValues.logo
                fs.unlink(`public/images/brands/${previousImage}`, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            if (newBrand.banner) {
                const previousBrand = await Brands.findByPk(req.params.id)
                const previousImage = previousBrand.dataValues.banner
                fs.unlink(`public/images/banners/${previousImage}`, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });

            }
            const brandNew = await Brands.update(newBrand, { where: { id: req.params.id } })
            response.data = brandNew
            res.json(response)
            //} else {Not allowed}
        } catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },
    updateModel: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            //if(admins){
            const newModel = {
                name: req.body.name
            }
            const modelNew = await Models.update(newModel, { where: { id: req.params.id } })
            response.data = modelNew
            res.json(response)
            //} else {Not allowed}
        } catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },
    //Delete
    deleteCar: async (req, res) => {
        let response = {
            info: {
                status: 200
            }
        }
        try {
            const destroy = await Cars.destroy({
                where: {
                    id: req.params.id
                }
            })
            response.data = destroy
            res.json(response)


        } catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },
    deleteBrand: async (req, res) => {
        let response = {
            info: {
                status: 200
            }
        }
        try {
            const destroy = await Brands.destroy({
                where: {
                    id: req.params.id
                }
            })
            response.data = destroy
            res.json(response)


        } catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },
    deleteModel: async (req, res) => {
        let response = {
            info: {
                status: 200
            }
        }
        try {
            const destroy = await Models.destroy({
                where: {
                    id: req.params.id
                }
            })
            response.data = destroy
            res.json(response)


        } catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    }
}
