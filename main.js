const express = require('express')
const app = express()
const { Sequelize, where } = require('sequelize')
const bcrypt = require('bcrypt')

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

    const senha = req.body.senha
    const senhaHash = bcrypt.hashSync(senha, 8)

    if (!buscarEmail) {
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

app.post('/login', async (req, res) => {
    const buscarEmail = await userBanco.findOne({
        attributes: ['email', 'senha'],
        where: {
            email: req.body.email
        }
    })

    const senhaUser = req.body.senha

    if (!buscarEmail) {
        res.status(400).send({ message: 'Usuário não cadastrado' })
    }
    else {
        const compareSenha = bcrypt.compareSync(senhaUser, buscarEmail.senha)
        if (!compareSenha) {
            res.status(400).send({ message: 'Senha incorreta' })
        }
        else {
            res.status(200).send({ message: 'Usuário logado' })
        }
    }
})