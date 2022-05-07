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
                <button onclick='agregarAlCarrito(${producto.id}, 1)'>Agregar al carrito</button>
                <small>Disponibles: ${stock}</small>
            </div>
    `   
};

// genera las tarjetas del carrito
function tarjetaProductoCarrito(productoCarrito){

    return `
            <div class="articulos">
                <div class="container-img">
                    <img src='${productoCarrito.producto.linkImg}'>
                </div>
                <h3>${productoCarrito.producto.producto}</h3>
                <small>${productoCarrito.producto.colorway}</small>
                <h4>${productoCarrito.producto.precio}</h4>
                <p>Subtotal: ${productoCarrito.subTotal}</p>
                <button onclick='quitarAlCarrito(${productoCarrito.producto.id}, 1)'>Quitar del carrito</button>
                <small>Cantidad a comprar: ${productoCarrito.cantidad}</small>
            </div>
    `   
};

// agrega un producto al carrito o incrementa en 1 su cantidad
function agregarAlCarrito(id, cantidadAAumentar){

    let producto = buscaProdId(id);

    // console.log(producto);

    let indiceCarrito = carrito.map((e) => {return e.producto.id}).indexOf(id);

    if (indiceCarrito > -1) {            //EN CASO DE QUE ENCUENTRE EL PRODUCTO, INCREMENTA EL SUBTOTAL Y LA CANTIDAD.

        if ((carrito[indiceCarrito].cantidad + cantidadAAumentar) <= consultaStock(carrito[indiceCarrito].producto)) {
            
            carrito[indiceCarrito].subTotal += (carrito[indiceCarrito].producto.precio * cantidadAAumentar),        
            carrito[indiceCarrito].cantidad += cantidadAAumentar;
        } else {
            alert("No se pueden agregar mas artículos de los existentes");
        }

    } else {                            //EN CASO DE QUE NO LO ENCUENTRE, LO AGREGA DE 0.
       
        let productoCarrito = {
            producto: producto,
            subTotal: producto.precio,
            cantidad: 1,
        }

        carrito.push(productoCarrito);
    }

    
    muestraCarrito(carrito);
}

// Busca el producto por id

//PARA PODER AGREGAR AL CARRITO MEDIANTE EL FILTRO,
//HAY Q TENER EN CUENTA QUE LA FUNCION FILTER SIEMPRE DEVUELVE UN ARRAY, POR MAS QUE SEA DE UN UNICO ELEMENTO.
//ENTONCES COMO SOLUCION, HAY QUE INDICAR SIEMPRE EL INDICE [0].

function buscaProdId(id) {     
    
    // Hay dos formas de resolver el problema:

    /*
    Esta es una forma de expresarlo:
    let conjuntoProductos = productos.filter((e) => {if (e.id === id) {return e}});

    const producto = conjuntoProductos[0];

    return producto;
    */

    //Y esta es la otra forma:
    return productos.filter((e) => {if (e.id === id) {return e}})[0];
}

// devuelve el indice donde encontró el articulo
function buscaProdCarritoId(id) {

    return carrito.filter((e) => {

        if(e.id === id){

            return e;
        }
    })[0];
}


//Muestra el carrito
function muestraCarrito(productos) {

    let divCarrito = document.getElementById("tarjetasCarrito");

    divCarrito.innerHTML = "";

    for (const producto of productos) {

        divCarrito.innerHTML += tarjetaProductoCarrito(producto);

    }

}