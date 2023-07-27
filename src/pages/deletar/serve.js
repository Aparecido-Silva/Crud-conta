const urlBase = "http://localhost:3000/delete/";
const formulario = document.querySelector('.form')

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    const emailUser = e.target.elements['email'].value
    const senhaUser = e.target.elements['senha'].value

    mandarDados()
    function mandarDados() {
        axios({
            method: "post",
            url: urlBase,
            data: {
                email: emailUser,
                senha: senhaUser
            },
        }).then((e) => {
            Swal.fire({
                title: e.data,
                confirmButtonText: 'Certo',
            })
        }).catch(e => {
            Swal.fire({
                title: e.response.data,
                confirmButtonText: 'Certo',
            })
        })
    }
})



