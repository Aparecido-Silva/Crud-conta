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
app.use(express.static(__dirname + '/src/pages'))
const cadastro = '/cadastro'
const login = '/login'
const redefinir = '/redefinir'


app.get('/cadastro', (req, res) => {
    res.sendFile(cadastro)
})

app.get('/login', (req, res) => {
    res.sendFile(login)
})

app.get('/redefinir', (req, res) => {
    res.sendFile(redefinir)
})


app.post('/cadastro', async (req, res) => {
    const buscarEmail = await userBanco.findOne({
        where: {
            email: req.body.email
        }
    })

    const { senha } = req.body
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

app.put('/update', async (req, res) => {
    const { email, senha } = req.body

    const buscarUser = await userBanco.findOne({
        attributes: ['email', 'senha'],
        where: { email }
    })

    if (!buscarUser) {
        res.status(200).send({ message: 'Usuário não encontrado' })
    }
    else {
        const compareSenha = bcrypt.compareSync(senha, buscarUser.senha)

        if (compareSenha) {
            res.status(400).send({ message: 'Sua senha não pode ser a mesma' })
        }
        else {
            const senhaHash = bcrypt.hashSync(senha, 8)

            try {
                const user = await userBanco.update(
                    { senha: senhaHash },
                    { where: { email } }
                )
                res.status(200).send({ message: 'Senha alterada com sucesso' })
            } catch (erro) {
                res.status(400).send({ message: erro })
            }
        }
    }
})

app.delete('/delete', async (req, res) => {
    const buscarUser = await userBanco.findOne({
        attributes: ['email', 'senha'],
        where: { email }
    })
    const { email, senha } = req.body


    const compareSenha = bcrypt.compareSync(senha, buscarUser.senha)

    if (!buscarUser) {
        res.status(400).send({ message: 'Nenhum usuário com este email' })
    }
    else {
        if (!compareSenha) {
            res.status(400).send({ message: 'Senha incorreta' })
        }
        else {
            try {
                await userBanco.destroy({
                    where: { email }
                })
                res.status(200).send({ message: 'Usuário deletado com sucesso' })
            } catch (erro) {
                res.status(400).send({ message: 'Erro ao deleta usuário' })
            }
        }
    }
})



