const express = require('express')
const Orders = require('../models/Orders')

const router = express.Router()

router.get('/', (req, res) => {//get para listar
    Orders.find()
    .exec()
    .then(x => res.status(200).send(x)) 
})

router.get('/:id', (req, res) => {//get de elemento único
    Orders.findById(req.params.id)
        .exec()
        .then(x => res.status(200).send(x))
})

router.post('/',(req, res) => {//ruta para crear
    Orders.create(req.body)
        .then(x => res.status(201).send(x))
})

router.put('/:id', (req, res) => {//router.put =+ metodo para reemplazar/actualizar
    Orders.findByIdAndUpdate(req.params.id, req.body)
        .then(x => res.status(204).send(x))
})

router.delete('/:id', (req, res) => {
    Orders.findOneAndDelete(req.params.id).exec().then(() => res.sendStatus(204))
})

module.exports = router