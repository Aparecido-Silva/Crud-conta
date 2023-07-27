const express = require('express')
const app = express()
const { Sequelize, where } = require('sequelize')
const bcrypt = require('bcrypt')

const port = process.env.PORT || 3000

//BodyParser
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Banco de dados
const conexaoBanco = require('./models/db')
const userBanco = require('./models/user')

app.listen(port, () => {
    console.log('Servidor rodando na porta 3000')
})

//Páginas
app.use(express.static(__dirname + '/src/pages'))
const cadastro = '/cadastro'
const login = '/login'
const redefinir = '/redefinir'
const deletar = '/deletar'


app.get('/cadastro', (req, res) => {
    res.sendFile(cadastro)
})

app.get('/login', (req, res) => {
    res.sendFile(login)
})

app.get('/redefinir', (req, res) => {
    res.sendFile(redefinir)
})

app.get('/deletar', (req, res) => {
    res.sendFile(deletar)
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
        res.status(200).send('Usuário cadastrado')
    }
    else {
        res.status(400).send('Usuário já cadastrado')
    }
})

app.post('/login', async (req, res) => {
    const { email, senha } = req.body

    const buscarEmail = await userBanco.findOne({
        attributes: ['email', 'senha'],
        where: { email }
    })

    if (!buscarEmail) {
        res.status(400).send('Usuário não cadastrado')
    }
    else {
        const compareSenha = await bcrypt.compareSync(senha, buscarEmail.senha)
        if (!compareSenha) {
            res.status(400).send('Senha incorreta')
        }
        else {
            res.status(200).send('Usuário logado')
        }
    }
})

app.post('/update', async (req, res) => {
    const { email, senha } = req.body

    const buscarUser = await userBanco.findOne({
        attributes: ['email', 'senha'],
        where: { email }
    })

    if (!buscarUser) {
        res.status(400).send('Usuário não encontrado')
    }
    else {
        const compareSenha = bcrypt.compareSync(senha, buscarUser.senha)

        if (compareSenha) {
            res.status(400).send('Sua senha não pode ser a mesma')
        }
        else {
            const senhaHash = bcrypt.hashSync(senha, 8)
            try {
                await userBanco.update(
                    { senha: senhaHash },
                    { where: { email } }
                )
                res.status(200).send('Senha alterada com sucesso')
            } catch (erro) {
                res.status(400).send(erro)
            }
        }
    }
})

app.post('/delete', async (req, res) => {
    const { email, senha } = req.body

    const buscarUser = await userBanco.findOne({
        attributes: ['email', 'senha'],
        where: { email }
    })

    if (!buscarUser) {
        res.status(400).send( 'Nenhum usuário com este email')
    }
    else {
        const compareSenha = bcrypt.compareSync(senha, buscarUser.senha)

        if (!compareSenha) {
            res.status(400).send('Senha incorreta')
        }
        else {
            try {
                userBanco.destroy({
                    where: { email }
                })
                res.status(200).send('Usuário deletado com sucesso')
            } catch (erro) {
                res.status(400).send('Erro ao deleta usuário')
            }
        }
    }
})



