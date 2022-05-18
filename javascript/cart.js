/** Ubicamos el icono del carro, el carro y el botón de cerrar */
const iconCart = document.querySelector(".carro"),
        cart = document.querySelector(".cart-section"),
        closeCart = document.querySelector(".close-cart")


// cuando haga click en el icono del carro le decimos que agregue la clase
iconCart.addEventListener("click", (e) =>{
    e.preventDefault
    cart.classList.add("open-cart")
})

// cuando haga click en el icono del salir le decimos que saque la clase
closeCart.addEventListener("click", (e) =>{
    e.preventDefault
    cart.classList.remove("open-cart")
})