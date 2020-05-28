const express = require('express')
const Users = require('../models/Users')

const router = express.Router()

router.post('/register',(req, res) => {
    res.send('form de reistro')
})

router.post('/login',(req, res) => {
    res.send('form de login')
})
module.exports = router