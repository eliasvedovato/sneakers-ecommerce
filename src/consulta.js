function consultaProductoServidor() {
    let productos = [
        {
            id: 1,
            producto: 'Nike Air Force 1',
            colorway: 'White',
            precio: '$300',
            linkImg: '../images/zapas-1.jpg',
            moneda:{
                id: 1,
                moneda: 'dolares',
                simbolo: '$'
            },
            stock: 15
        },
        {
            id: 2,
            producto: 'Nike Air Max 1',
            colorway: 'Black/White/Red',
            precio: '$250',
            linkImg: '../images/zapas-2.jpg',
            moneda: {
                id: 2,
                moneda: 'dolares',
                simbolo: '$'
            },
            stock: 20
        },
        {
            id: 3,
            producto: 'Nike Air Max 90 Summit',
            colorway: 'White/Chile-Red/Bleached-Aqua',
            precio: '$370',
            linkImg: '../images/zapas-3.jpg',
            moneda: {
                id: 3,
                moneda: 'dolares',
                simbolo: '$'
            },
            stock: 20
        },
        {
            id: 4,
            producto: 'Nike Air Jordan 1',
            colorway: 'Yellow-Ochre',
            precio: '$350',
            linkImg: '../images/zapas-4.jpg',
            moneda: {
                id: 4,
                moneda: 'dolares',
                simbolo: '$'
            },
            stock: 30
        }
    ];
    return productos; 
}

function consultaCotizacion(){
    let monedas = {};

    $.get('https://api.bluelytics.com.ar/v2/latest'), (data) => {
        console.log(data);
        monedas = data;
    }
    return monedas;
}