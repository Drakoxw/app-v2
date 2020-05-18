const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//const Users = mongoose.model('User', new mongoose.Schema({ name: String}))//!er modelo de prueba
//Users.create({ name: 'Drako Super-admin'})//se le da nombre al modelo de prueba
const router = express.Router()

//app.get('*', (req, res) => {
    //Users.find()//busca todos lo usuarios
      //  .then(x => res.send(x))//se llama a res y se le paso los usuarios})

router.get('/', (req, res) => {
    res.send('Oe desde ROOT')
})
app.use('/api/platos', router)

module.exports = app