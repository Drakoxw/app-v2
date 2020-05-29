const express = require('express')
const crypto = require('crypto')
const Users = require('../models/Users')

const router = express.Router()

router.post('/register',(req, res) => {
    const { email, password } = req.body
    crypto.randomBytes(16, (err, salt) => {
        const newSalt = salt.toString('base64')
        crypto.pbkdf2(password, newSalt, 1000, 64, 'sha1', (err, key) => {
            const encryptedPass = key.toString('base64')
            Users.findOne({ email }).exec()
                .then(user => {
                    if (user) {
                        return res.send('Usuario ya existe!')
                    }
                    Users.create({
                        email,
                        password: encryptedPass,
                        salt: newSalt,
                    }).then(() => {
                        res.send('Usuario creado!')
                    })
                })
        })
    })
})

router.post('/login',(req, res) => {
    res.send('form de login')
})
module.exports = router