const checkBox = document.querySelector('#mostrar')
const inputSenha = document.querySelector('#senha')


checkBox.addEventListener('click', () => {
    if (inputSenha.type == 'password') {
        inputSenha.type = 'text'
    }
    else {
        inputSenha.type = 'password'
    }
})

