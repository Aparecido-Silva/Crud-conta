const form = document.querySelector('.form')
const checkBox = document.querySelector('#mostrar')
const inputSenha = document.querySelector('#senha')

form.addEventListener('submit', (e) => {
    const email = e.target.elements['email'].value
    const senha = e.target.elements['senha'].value

    if (senha == '' || email == '') {
        e.preventDefault()
        Swal.fire({
            title: 'Confira se todos os seus dados estão completos',
            confirmButtonText: 'Certo',
        })
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

