const express = require('express')
const Plates = require('../models/Meals')

const router = express.Router()

router.get('/', (req, res) => {//get para listar
    Plates.find()//buscar todo
    .exec()// ejecuta la query para q devuelva una promesa con arreglo de los documentos q encontro
    .then(x => res.status(200).send(x))// x son todos los elementos
})

router.get('/:id', (req, res) => {//get de elemento único
    Plates.findById(req.params.id)
        .exec()
        .then(x => res.status(200).send(x))//
})

router.post('/',(req, res) => {//ruta para crear elemento
    Plates.create(req.body)
        .then(x => res.status(201).send(x))//status 201 creado
})

router.put('/:id', (req, res) => {//router.put =+ metodo para reemplazar/actualizar
    Plates.findByIdAndUpdate(req.body.id, req.body)// el 1er req busca por id y actualiza, el 2do es la actualizacion q hace
        .then(x => res.status(204).send(x))//status 204 significa q no esta devolviendo ningun contenido
})

router.delete('/:id', (req, res) => {
    Plates.findOneAndDelete(req.params.id).exec().then(() => res.sendStatus(204))
})

module.exports = router