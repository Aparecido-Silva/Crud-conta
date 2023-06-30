const express = require('express')
const app = express()
const { Sequelize, where } = require('sequelize')
const { bcrypt, hashSync } = require('bcrypt')

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
    const buscarEmail = await userBanco.findOne({
        where: {
            email: req.body.email
        }
    })
    const senha = req.body.email
    const senhaHash = hashSync(senha, 8)

    if(!buscarEmail) {
            userBanco.create({
            nome: req.body.nome,
            email: req.body.email,
            senha: senhaHash
        })
        res.status(200).send({ message: 'Usuário cadastrado' })
    } 
    else {
        res.status(400).send({ message: 'Usuário já cadastrado' })
    }
})

app.post('/login', async(req, res) => {
    const buscarEmail = await userBanco.findOne({
        where: {
            email: req.body.email
        }
    })

    const senha = req.body.email

    if(!buscarEmail) {
        res.status(400).send({ message: 'Usuário não cadastrado' })
    } 
    else {
        const comparaSenha = bcrypt.compare(senha, userBanco.senha)
        res.status(200).send({ message: 'Usuário logado' })
    }
})