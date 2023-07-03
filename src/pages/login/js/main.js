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
    } else {
    }
})

function loginUser() {
    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    })

}


checkBox.addEventListener('click', () => {
    if (inputSenha.type == 'password') {
        inputSenha.type = 'text'
    }
    else {
        inputSenha.type = 'password'
    }
})
