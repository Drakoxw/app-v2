const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hola desde ordenes')//get para listar
})

router.get('/:id', (req, res) => {
    res.send(req.params.id)//get de elemento único
})

router.post('/',(req, res) => {
    res.send('soy post!')//ruta para crear
})

router.put('/:id', (req, res) => {
    res.send('Soy un put!')
//router.put =+ metodo para reemplazar
})

router.delete('/:id', (req, res) => {
    res.send('Soy un delete')
})

module.exports = router