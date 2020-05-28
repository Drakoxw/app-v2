const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const orders = require('./routes/orders')
const plates = require('./routes/plates') // se importa la ruta de plates
const auth = require('./routes/auth')
const app = express()

app.use(bodyparser.json())

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//const Users = mongoose.model('User', new mongoose.Schema({ name: String}))//!er modelo de prueba
//Users.create({ name: 'Drako Super-admin'})//se le da nombre al modelo de prueba

//app.get('*', (req, res) => {
    //Users.find()//busca todos lo usuarios
      //  .then(x => res.send(x))//se llama a res y se le paso los usuarios})


app.use('/api/platos', plates)//esta es la ruta en el buscador
app.use('/api/ordenes', orders)
app.use('/api/auth', auth)

module.exports = app