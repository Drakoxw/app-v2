const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Oe desde platos')
})

module.exports = router