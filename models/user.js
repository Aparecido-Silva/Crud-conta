const { Sequelize, DataTypes } = require('sequelize')
const conexaoBanco = require('./db')

const userBanco = conexaoBanco.define('dadoscrud', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

//Criar tabela no banco
//userBanco.sync()

module.exports =  userBanco
