const Sequelize =  require('sequelize')

const conexaoBanco =  new Sequelize ('banco_dados', 'root', '@Aparecido12', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    conexaoBanco.authenticate()
    console.log('Conexão com banco de dados feita com sucesso')
}catch (erro) {
    console.log('Erro na conexão com banco de dados')
}

module.exports =  conexaoBanco