const urlBase = "http://localhost:3000/cadastro/";
const formulario = document.querySelector('.form')

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    const nomeUser = e.target.elements['nome'].value
    const emailUser = e.target.elements['email'].value
    const senhaUser = e.target.elements['senha'].value

    mandarDados()
    function mandarDados() {
        axios({
            method: "post",
            url: urlBase,
            data: {
                nome: nomeUser,
                email: emailUser,
                senha: senhaUser
            },
        }).then((e) => {
            Swal.fire({
                title: e.data,
                confirmButtonText: 'Certo',
            })
            setTimeout(function () {
                window.location = '/login'
            }, 3000)
        }).catch(e => {
            Swal.fire({
                title: e.response.data,
                confirmButtonText: 'Certo',
            })
            setTimeout(function () {
                window.location = '/login'
            }, 3000)
        })
    }
})



