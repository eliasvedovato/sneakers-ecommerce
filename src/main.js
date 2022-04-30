// console.log("Hello World");

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

function inicio(){
    // console.log(monedas);

    let productos = consultaProductoServidor();

    let tarjetasProductos = document.getElementById("tarjetasProductos");

    tarjetasProductos.innerHTML = "";

    for (const producto of productos) {
        tarjetasProductos.innerHTML += tarjetaProducto(producto);
    }
};

function consultaStock(producto){
    let stockTotal = 0;

    if(typeof(producto.stock) === 'number'){
    stockTotal = producto.stock;
    }
    return stockTotal;
}

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
                <button onclick='agregarAlCarrito(${producto.id})'>Agregar al carrito</button>
                <small>Disponibles: ${stock}</small>
            </div>
    `   
};


