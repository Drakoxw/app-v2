const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Oe desde ROOT')
})

module.exports = router