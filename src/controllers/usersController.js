const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const db = require('../database/models')
const Users = db.User
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
            response.info.status = 400
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
            res.json(response)
        }
        catch (e) {
            response.info.status = 400
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
            const user = {
                image: req.files.filename ? req.files.filename : 'default.jpeg',
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                birthdate: req.body.birthdate,
                phoneNumber: req.body.phoneNumber,
                password: bcrypt.hashSync(req.body.password, 10),
            }
            const isInDb = await Users.findOne({
                $or: [
                    { email: req.body.email },
                    { phone: req.body.phoneNumber }
                ]
            });


            if (isInDb.length > 0) {
                const errorRegister = []
                if (isInDb.dataValues.email === user.email) errorRegister.push('email')
                if (isInDb.dataValues.phoneNumber === user.phoneNumber) errorRegister.push('phoneNumber')
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
            response.info.status = 400
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
            let user = {
                email: req.body.email,
                password: req.body.password
            }
            const userInDb = await Users.findOne({
                $or: [
                    { email: req.body.email },
                    { phone: req.body.email }
                ]
            });
            const finded = userInDb.dataValues
            if (finded) {
                let passwordCheck = bcrypt.compareSync(user.password, finded.password)
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
            response.info.status = 400
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
                name: "Nicolas",
                surname: "Lain",
                email: "nicolas@mail.com ",
                phoneNumber: "[[\"+54\"],[\"1133615533\"]]",
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
            const newUser = await Users.update(newData, { where: { id: req.params.id } })
            response.data = newUser
            res.json(response)

        } catch (e) {
            response.info.status = 400
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
            const destroy = await Users.destroy({
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
