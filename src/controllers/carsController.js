const { log } = require('console');
const db = require('../database/models')
const fs = require('fs');
const Cars = db.Car
const Brands = db.Brand
const Models = db.CarModel

module.exports = {
    carsByUser: async (id) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const carsFinded = await Cars.findAll({
                include: [{ association: 'brand' }, { association: 'model' }]
            })
            const cars = []
            carsFinded.forEach(element => { element.user_id == id ? cars.push(element) : null })
            response.info.total = cars.length
            response.data = cars
            return response
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            return response
        }
    },
    //list
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
    //ByPk
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
                    where: { brand_id: brand.dataValues.id },
                    include: [{ association: 'model' }] 
                });
                console.log(carsIncluded);
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
    //Create
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
                user_id: req.token.finded.id,
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
            const oldImgs = JSON.parse(req.body.oldImages)
            const rmvImgs = JSON.parse(req.body.removeImages)
            const newCar = {
                km: req.body.km,
                color: req.body.color,
                description: req.body.description,
                price: req.body.price,
                damage: req.body.damage,
                onSale: req.body.onSale,
            }
            if (newCar.onSale) newCar.price = newCar.price - (newCar.price * newCar.onSale / 100)
            if (oldImgs) {
                const newCarImg = []
                oldImgs.forEach(element => {
                    newCarImg.push(element)
                });
                if (req.files) {
                    req.files.forEach(file => {
                        newCarImg.push(file.filename)
                    });
                }
                newCar.images = JSON.stringify(newCarImg)
            } else {
                newCar.image = JSON.stringify(req.files.map((file) => file.filename))
            }
            if (rmvImgs) {
                rmvImgs.forEach(element => {
                    fs.unlink(`public/images/cars/user_${req.token.finded.id}/${element}`, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
            }
            await Cars.update(newCar, { where: { id: req.params.id } })
            const car = await Cars.findByPk(req.params.id, {
                include: [{ association: 'brand' }, { association: 'model' }]
            })
            response.data = car
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
            const logoFile = req.files['logo'] ? req.files['logo'][0] : null
            const bannerFile = req.files['banner'] ? req.files['banner'][0] : null
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
                if (previousImage) {
                    fs.unlink(`public/images/banners/${previousImage}`, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                }
            }
            await Brands.update(newBrand, { where: { id: req.params.id } })
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
            }
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
            const newModel = {
                name: req.body.name
            }
            const modelNew = await Models.update(newModel, { where: { id: req.params.id } })
            response.data = modelNew
            const model = await Models.findByPk(req.params.id, {
                include: [{ association: 'brand' }]
            })
            response.data = model
            const carsIncluded = await Cars.findAll({
                where: { carModel_id: model.dataValues.id }
            })
            if (carsIncluded) {
                response.info.cars = carsIncluded.length
                response.info.carsIncluded = carsIncluded
            }
            res.json(response)
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

            const modelsDestroy = await Models.destroy({ where: { brand_id: req.params.id } });
            const destroy = await Brands.destroy({
                where: {
                    id: req.params.id
                }
            })
            response.data = destroy
            response.info.modelsDestroy = modelsDestroy
            res.json(response)


        } catch (e) {
            response.info.status = 400
            console.error(e);
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
