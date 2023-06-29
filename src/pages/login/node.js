const btn = document.querySelector('#btn-google');

btn.addEventListener("click", function (req, res) {
    res.redirect("/cadastrar")
})