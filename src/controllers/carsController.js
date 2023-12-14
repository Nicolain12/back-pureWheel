const db = require('../database/models')
const axios = require('axios');
const {PORT} = require('../modules/appInfo')
const fs = require('fs');
const { log } = require('console');
const { version } = require('os');
const { versions } = require('process');
const Cars = db.Car
const Brands = db.Brand
const Models = db.CarModel
const BodyCar = db.BodyCar
const Version = db.Version
const Color = db.Color

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
                include: [{ association: 'brand' }, { association: 'model' }, { association: 'bodyCar' }, { association: 'color' }, { association: 'version' }]
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
            const brands = await Brands.findAll();
            
            const brandsWithCarsPromises = brands.map(async (brand) => {
                try {
                    const response = await axios.get(`http://localhost:${PORT}/cars/brands/${brand.id}`);
                    if (response.data.info.carsIncluded.length > 0) {
                        return brand.dataValues;
                    }
                    return null;
                } catch (error) {
                    console.error(`Error fetching data for brand ${brand.id}: ${error.message}`);
                    return null;
                }
            });
            
            const brandsWithCars = await Promise.all(brandsWithCarsPromises);
            const validBrandsWithCars = brandsWithCars.filter(brand => brand !== null);
            
            response.info.total = validBrandsWithCars.length;
            response.data = validBrandsWithCars;
            res.json(response);
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
    bodyCarList: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const bodyCars = await BodyCar.findAll()
            response.info.total = bodyCars.length
            response.data = bodyCars
            res.json(response)
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },
    versionList: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const { model_id } = req.params;
            if (model_id) {
                const version = await Version.findAll({
                    where: { model_id:  model_id},
                    include: [{ association: 'model' }]
                });
                response.data = version
                res.json(response)
              } else {
                  const version = await Version.findAll({include: [{ association: 'model' }]})
                  response.info.total = version.length
                  response.data = version
                  res.json(response)
              }
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },
    colorList: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const color = await Color.findAll()
            response.info.total = color.length
            response.data = color
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
                include: [{ association: 'brand' }, { association: 'model' }, { association: 'bodyCar' }, { association: 'color' }, { association: 'version' }]
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
                const modelsIncluded = await Models.findAll({
                    where: { brand_id: brand.dataValues.id }
                });
                if (carsIncluded) response.info.carsIncluded = carsIncluded
                if (modelsIncluded) {
                    if (modelsIncluded.length > 0) {
                        const versionsIncluded = modelsIncluded.map(async (model) => {
                            try {
                                const responseVersions = await axios.get(`http://localhost:${PORT}/cars/versions/${model.id}`);
                                if (responseVersions.data.data.length > 0) {
                                    return responseVersions.data.data;
                                }
                                return null;
                            } catch (error) {
                                console.error(`Error fetching data for model ${model.id}: ${error.message}`);
                                return null;
                            }
                        });
            
                        const versionsFinded = await Promise.all(versionsIncluded);
                        const versions = versionsFinded.filter(arrVersions =>{
                            if (arrVersions !== null) {
                                if (arrVersions.length > 0) {
                                    return arrVersions
                                }    
                            }
                            return
                            });
                        response.info.versions = versions;
                };
                response.info.models = modelsIncluded;
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
    versionByPk: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const version = await Version.findByPk(req.params.id, {
                include: [{ association: 'model' }]
            })
            if (version) {
                response.data = version
                res.json(response)
            } else res.status(404).json({ status: 404, error: 'Version not found' })
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },
    colorByPk: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const color = await Color.findByPk(req.params.id)
            if (color) {
                response.data = color
                res.json(response)
            } else res.status(404).json({ status: 404, error: 'Color not found' })
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
                year: req.body.Year,
                carModel_id: req.body.Model,
                brand_id: req.body.Brand,
                user_id: req.token.finded.id,
                km: req.body.Kilometers,
                color_id: req.body.Color,
                description: req.body.Description,
                price: req.body.Price,
                damage: req.body.Damage,
                onSale: req.body.Discount,
                doors: 2,
                bodyCar_id: req.body.BodyCar,
                transmission: req.body.Transmission,
                version_id: req.body.Version,
                gas: req.body.Gasoline,
                engine: req.body.Engine
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
    createVersion: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const newVersion = {
                name: req.body.name,
                model_id: req.body.model_id
            }
            const addingVersion = await Version.create(newVersion)
            response.data = addingVersion
            res.json(response)
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },
    createColor: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const newColor = {
                name: req.body.name,
                code: req.body.code
            }
            const addingColor = await Color.create(newColor)
            response.data = addingColor
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
                year: req.body.Year,
                carModel_id: req.body.Model,
                brand_id: req.body.Brand,
                user_id: req.token.finded.id,
                km: req.body.Kilometers,
                color_id: req.body.Color,
                description: req.body.Description,
                price: req.body.Price,
                damage: req.body.Damage,
                onSale: req.body.Discount,
                doors: 2,
                bodyCar_id: req.body.BodyCar,
                transmission: req.body.Transmission,
                version_id: req.body.Version,
                gas: req.body.Gasoline,
                engine: req.body.Engine
            }
            if (newCar.onSale) newCar.price = newCar.price - (newCar.price * newCar.onSale / 100)
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
                    newCar.image = JSON.stringify(newCarImg)
                }
                if (typeof oldImgs === 'string') {
                    newCarImg.push(oldImgs)
                    if (req.files) {
                        req.files.forEach(file => {
                            newCarImg.push(file.filename)
                        });
                    }
                    newCar.images = JSON.stringify(newCarImg)
                }
            } else {
                newCar.images = JSON.stringify(req.files.map((file) => file.filename))
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
            const car = await Cars.findByPk(req.params.id, {
                include: [{ association: 'brand' }, { association: 'model' }, { association: 'bodyCar' }, { association: 'color' }]
            })
            JSON.parse(car.dataValues.images).forEach(element => {
                fs.unlink(`public/images/cars/user_${req.token.finded.id}/${element}`, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            });
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
    },
    deleteVersion: async (req, res) => {
        let response = {
            info: {
                status: 200
            }
        }
        try {
            const destroy = await Version.destroy({
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
    deleteColor: async (req, res) => {
        let response = {
            info: {
                status: 200
            }
        }
        try {
            const destroy = await Color.destroy({
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
}
