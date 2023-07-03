const btnLogin = document.querySelector('.form__button')
const form = document.querySelector('.form')
const checkBox = document.querySelector('#mostrar')
const inputSenha = document.querySelector('#senha')

form.addEventListener('submit', (e) => {
    const nome = e.target.elements['nome'].value
    const email = e.target.elements['email'].value
    const senha = e.target.elements['senha'].value

    if (email === '' || senha === '' || nome === '') {
        e.preventDefault()
    }
})

checkBox.addEventListener('click', () => {
    if (inputSenha.type == 'password') {
        inputSenha.type = 'text'
    }
    else {
        inputSenha.type = 'password'
    }
})

