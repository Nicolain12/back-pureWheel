const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const carsController = require('./carsController.js')
const db = require('../database/models');
const Users = db.User
const {validationResult} = require('express-validator');
const { log } = require('console');
module.exports = {
    // List
    list: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const users = await Users.findAll()
            response.info.total = users.length
            response.data = users
            res.json(response)
        }
        catch (e) {
            response.info.status = 500
            response.info.msg = e.message
            res.json(response)
        }

    },
    // Read
    detail: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const users = await Users.findByPk(req.params.id)
            response.data = users
            const carsApi = await carsController.carsByUser(req.params.id)
            response.info.userCars = carsApi.data
            res.json(response)
        }
        catch (e) {
            response.info.status = 500
            console.error(e);
            response.info.msg = e.message
            res.json(response)
        }
    },
    // Create
    register: async (req, res) => {
        let response = {
            info: {
                status: 200
            }
        }
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                response.info.status = 422
                response.info.errors =  {}
                errors.array().forEach(error => {
                    response.info.errors[error.path] = {msg: error.msg, currentValue: error.value}
                })
              return res.json(response);
            }
            const user = {
                image: req.file ? req.file.filename : 'default.jpeg',
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                birthdate: req.body.birthdate,
                phoneNumber: req.body.phoneNumber,
                password: bcrypt.hashSync(req.body.password, 10),
            }
            console.log(user);
            const errorRegister = []
            const users = await Users.findAll()
            users.forEach(element => {
                if(element.dataValues.email === user.email) errorRegister.push('email')
                if(element.dataValues.phoneNumber === user.phoneNumber) errorRegister.push('phoneNumber')
            });
            if (errorRegister.length > 0) { 
                return res.status(409).json({ status: 409, error: 'The user already exists', inputError: errorRegister })
            } else {
                const registedUser = await Users.create(user)
                response.data = registedUser
                delete registedUser.password
                jwt.sign({ registedUser }, 'secretkey', { expiresIn: '1d' }, (err, token) => {
                    if (err) {
                        console.error(err);
                        return response.sendStatus(500);
                    }
                    response.info.token = token;
                    res.json(response)
                }
                );
            }

        } catch (e) {
            response.info.status = 500
            response.info.msg = e.message
            res.json(response)
        }
    },
    // Read
    loggin: async (req, res) => {
        let response = {
            info: {
                status: 200
            }
        }
        try {
            const user = {
                email: req.body.email,
                password: req.body.password
            }
            const userInDb = await Users.findOne({
                $or: [
                    { email: req.body.email },
                    { phone: JSON.stringify([['+54'], [req.body.email]])}
                ]
            });
            const finded = userInDb.dataValues
            if (finded) {
                const passwordCheck = bcrypt.compareSync(user.password, finded.password)
                if (passwordCheck) {
                    if (req.body.remember) {
                        delete finded.password
                        jwt.sign({ finded }, 'secretkey', { expiresIn: '30d' }, (err, token) => {
                            if (err) {
                                console.error(err);
                                return response.sendStatus(500);
                            }
                            response.info.permanentToken = token;
                            response.data = finded
                            return res.json(response)
                        }
                        );
                    } else {
                        delete finded.password
                        jwt.sign({ finded }, 'secretkey', { expiresIn: '1d' }, (err, token) => {
                            if (err) {
                                console.error(err);
                                return response.sendStatus(500);
                            }
                            response.info.token = token;
                            response.data = finded
                            return res.json(response)
                        }
                        );
                    }
                } else {
                    return res.status(409).json({ status: 409, error: 'Invalid Password', inputError: 'password' })
                }
            } else {
                return res.status(409).json({ status: 409, error: 'Invalid Data', inputError: 'email' })

            }
        } catch (e) {
            response.info.status = 500
            response.info.msg = e.message
            res.json(response)
        }
    },
    // Update
    update: async (req, res) => {
        let response = {
            info: {
                status: 200
            }
        }
        try {
            let newData = {
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
            }
            if (req.file != undefined) newData.image = req.file.filename
            if (newData.image) {
                const previousUser = await Users.findByPk(req.params.id)
                const previousImage = previousUser.dataValues.image
                if (previousImage != 'default.jpeg') {
                    fs.unlink(`public/images/users/${previousImage}`, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                }
            }
            await Users.update(newData, { where: { id: req.params.id } })
            const newUser = await Users.findByPk(req.params.id)
            response.data = newUser
            res.json(response)

        } catch (e) {
            console.error(e)
            response.info.status = 500
            response.info.msg = e.message
            res.json(response)
        }

    },
    //Delete
    delete: async (req, res) => {
        let response = {
            info: {
                status: 200
            }
        }
        try {
            await Cars.destroy({ where: { user_id: req.params.id } });
            const destroy = await Users.destroy({
                where: {
                    id: req.params.id
                }
            })
            response.data = destroy
            res.json(response)


        } catch (e) {
            response.info.status = 500
            response.info.msg = e.message
            res.json(response)
        }

    },

    //UserByToken
    getByToken: (req, res) => {
        let response = {
            info: {
                status: 200
            }
        }
        if (req.token) {
            response.data = req.token.finded
            return res.json(response)
        } else {
            response.info.status = 500
            response.info.msg = 'User not found'
            return res.json(response)
        }

    }

}
