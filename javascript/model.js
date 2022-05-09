// ubicamos el icono del carrito
const iconCart = document.querySelector(".carro")
// ubico el modal
const modal = document.querySelector(".sec-modal");
// ubico el boton de cerrar
const cerrarModal = document.querySelector(".modalClose")

// cuando haga click en el icono del carro le decimos que agregue la clase
iconCart.addEventListener("click", (e) =>{
    e.preventDefault
    modal.classList.add("modalOpen")
})

// cuando haga click en el icono del salir le decimos que saque la clase
cerrarModal.addEventListener("click", (e) =>{
    e.preventDefault
    modal.classList.remove("modalOpen")
})