// https://api.bluelytics.com.ar/v2/latest
// api de conversiòn de divisas

// Alumni:
// tomas_zab@outlook.com
// 41150436

consultaCotizacion();
let monedas = {};
let productos = consultaProductoServidor();
let carrito = [];

var intervalo;

//Funcion inicial
function inicio(){

    let tarjetasProductos = document.getElementById("tarjetasProductos");

    tarjetasProductos.innerHTML = "";

    intervalo = setInterval(function () {
        if (!monedas.hasOwnProperty("last_update")) {
            console.log("No llegaron las monedas");
        } else {
            clearInterval(intervalo);
            if (productos) {
            
                for (const producto of productos) {
                    tarjetasProductos.innerHTML += tarjetaProducto(producto);
                }
            }
        }
    }, 100);
}

//Esta funcion toma en cuenta la modularidad del sistema (si está implementado un sistema de stock)
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
                <p>$${producto.precio}</p>
                <small>Disponibles: ${stock}</small><br>
                <div class="price-2">
                    <div class="quantity">
                        <span><img src="./images/icon-minus.svg" alt="minus" class="minus"></span>
                        <span class="numero"><strong>1</strong></span>
                        <span><img src="./images/icon-plus.svg" alt="plus" class="plus"></span>
                    </div>
                    <div class="carrito-main">
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
                    <img src='${productoCarrito.producto.linkImg}'>
                </div>
                <h3>${productoCarrito.producto.producto}</h3>
                <small>${productoCarrito.producto.colorway}</small>
                <p>$${productoCarrito.subTotal}</p>
                <small>Disponibles: ${productoCarrito.producto.stock}</small>
                <div class="price-2">
                    <div class="quantity">
                        <span><img src="./images/icon-minus.svg" alt="minus" class="minus"></span>
                        <span class="numero"><strong>1</strong></span>
                        <span><img src="./images/icon-plus.svg" alt="plus" class="plus"></span>
                    </div>
                    <div class="carrito-main">
                        <strong onclick='quitarDelCarrito(${productoCarrito.producto.id})'>Eliminar</strong>
                    </div>
                </div>
            </div>
    `   
};

// agrega un producto al carrito o incrementa en cantidadAAumentar su cantidad
function agregarAlCarrito(id, cantidadAAumentar){

    let producto = buscaProdId(id);

    let indiceCarrito = carrito.map((e) => {return e.producto.id}).indexOf(id);

    if (indiceCarrito > -1) { //EN CASO DE QUE ENCUENTRE EL PRODUCTO, INCREMENTA EL SUBTOTAL Y LA CANTIDAD.

        if ((carrito[indiceCarrito].cantidad + cantidadAAumentar) <= consultaStock(carrito[indiceCarrito].producto)) {
            
            carrito[indiceCarrito].subTotal += (carrito[indiceCarrito].producto.precio * cantidadAAumentar),        
            carrito[indiceCarrito].cantidad += cantidadAAumentar;
        } else {
            // alert("No se pueden agregar más artículos de los existentes");
            mostrarToast("No se pueden agregar más artículos de los existentes", 3000);
        }

    } else {                            //EN CASO DE QUE NO LO ENCUENTRE, LO AGREGA DE 0.
       
        //Hay que ver si la cantidad supera a la disponible (tengo que usar para cantidad la variable cantidadAAumentar)

        let productoCarrito = {
            producto: producto,
            subTotal: producto.precio,
            cantidad: 1,
        }

        carrito.push(productoCarrito);
    }

    
    muestraCarrito(carrito);
}

// quita un producto al carrito o disminuye en cantidadADisminuir su cantidad
function quitarDelCarrito(id, cantidadADisminuir){

    let producto = buscaProdId(id);

    // console.log(producto);

    let indiceCarrito = carrito.map((e) => {return e.producto.id}).indexOf(id);

    if (indiceCarrito > -1) {       

        if ((carrito[indiceCarrito].cantidad - cantidadADisminuir) > 0) {
            
            carrito[indiceCarrito].subTotal -= (carrito[indiceCarrito].producto.precio * cantidadADisminuir),        
            carrito[indiceCarrito].cantidad -= cantidadADisminuir;
        } else {
            carrito.splice(indiceCarrito, 1);
        }

    } else {             
        //alert("El item no se encuentra en el carrito");
        mostrarToast("El item no se encuentra en el carrito", 3000);            
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

    if (productos.length > 0) {

        for (const producto of productos) {

            divCarrito.innerHTML += tarjetaProductoCarrito(producto);
    
        }    
    } else {
        divCarrito.innerHTML = "No hay artículos en el carrito.";
    }
}

var limpiaToast;

function mostrarToast(mensaje, tiempo) {

    var divToast = document.getElementById("toast");
    divToast.innerHTML = mensaje;
    divToast.classList.add("show");
    limpiaToast = setTimeout(clearToast, tiempo);
}

function clearToast() {
    var divToast = document.getElementById("toast");
    
    clearTimeout(limpiaToast);
    divToast.classList.remove("show"); 
}

//Dark mode

const btnSwitch = document.querySelector('#switch')

btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');          //con la propiedad "toggle" si el elemento tiene una clase se la va a quitar, y si no0 tiene se la va a agregar
    btnSwitch.classList.toggle('active');
})