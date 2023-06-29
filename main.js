const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')

//BodyParser
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Banco de dados
const conexaoBanco = require('./models/db')
const userBanco = require('./models/user')

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})

//Páginas
const cadastro = '/cadastro'
const login = '/login'
app.use(express.static(__dirname + '/src/pages'))

app.get('/cadastro', (req, res) => {
    res.sendFile(cadastro)
})

app.post('/cadastro', async (req, res) => {
    
})