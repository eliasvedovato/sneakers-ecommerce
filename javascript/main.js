// Estructura del producto
// let productos = [
//     {
//         id: 1,
//         producto: '',
//         colorway: '',
//         precio: '',
//         linkImg: '',
//         moneda:{
//             id: 1,
//             moneda: '',
//             simbolo: ''
//         },
//         stock: ''
//     }
// ]

// https://api.bluelytics.com.ar/v2/latest
// api de conversiòn de divisas
// Alumni:
// tomas_zab@outlook.com
// 41150436

let monedas = consultaCotizacion();
let productos = consultaProductoServidor();
let carrito = [];

function inicio(){
    // console.log(monedas);

    let tarjetasProductos = document.getElementById("tarjetasProductos");

    tarjetasProductos.innerHTML = "";

    for (const producto of productos) {
        tarjetasProductos.innerHTML += tarjetaProducto(producto);
    }
};

// si esta implementado un sistema de stock
function consultaStock(producto){

    let stockTotal = 0;

    if(typeof(producto.stock) === 'number'){
        
    stockTotal = producto.stock;
    }
    return stockTotal;
}

// genera las tarjetas de los productos
function tarjetaProducto(producto){
    let stock = consultaStock(producto);
    return `
            <div class="articulos">
                <div class="container-img">
                    <img src='${producto.linkImg}'>
                </div>
                <h3>${producto.producto}</h3>
                <small>${producto.colorway}</small>
                <p>${producto.precio}</p>
                <small>Disponibles: ${stock}</small><br>
                <div class="price-2">
                    <div class="quantity">
                        <span><img src="./images/icon-minus.svg" alt="minus" class="minus"></span>
                        <span class="numero"><strong>1</strong></span>
                        <span><img src="./images/icon-plus.svg" alt="plus" class="plus"></span>
                    </div>
                    <div class="carrito-main">
                        <img src="./images/icon-cart.svg" alt="carrito" class="carrito">
                        <strong onclick='agregarAlCarrito(${producto.id})'>Add to cart</strong>
                    </div>
                </div>

            </div>
    `;   
};

// genera las tarjetas del carrito
function tarjetaProductoCarrito(productoCarrito){

    return `
            <div class="articulos">
                <div class="container-img">
                    <img src='${productoCarrito.linkImg}'>
                </div>
                <h3>${productoCarrito.producto}</h3>
                <small>${productoCarrito.colorway}</small>
                <p>${productoCarrito.subTotal}</p>
                <small>Disponibles: ${stock}</small>
                <div class="price-2">
                    <div class="quantity">
                        <span><img src="./images/icon-minus.svg" alt="minus" class="minus"></span>
                        <span class="numero"><strong>1</strong></span>
                        <span><img src="./images/icon-plus.svg" alt="plus" class="plus"></span>
                    </div>
                    <div class="carrito-main">
                        <img src="./images/icon-cart.svg" alt="carrito" class="carrito">
                        <strong onclick='quitarAlCarrito(${productoCarrito.id})'>Quitar del carrito</strong>
                    </div>
                </div>
                <button>Quitar del carrito</button>
            </div>
    `   
};

// agrega un producto al carrito o incrementa en 1 su cantidad
function agregarAlCarrito(id){
    let producto = buscaProdId(id);
    console.log(producto);

    let productoCarrito = {
        producto: producto,
        subTotal: 0,
        cantidad: 0
    }

    carrito.push(productoCarrito);


}

// busca el producto por id
function buscaProdId(id){
    return productos.filter((e) => {
        if(e.id === id){
            return e;
        }
    })
}

// devulve el indice donde encontro el articulo
function buscaProdCarritoId(id){
    return productos.filter((e) => {
        if(e.id === id){
            return e;
        }
    })
}