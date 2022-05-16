function consultaProductoServidor() {
    let productos = [
        {
            id: 1,
            producto: 'Nike Air Force 1',
            colorway: 'White',
            precio: 300,
            linkImg: './images/zapas-1.jpg',
            moneda:{
                id: 1,
                moneda: 'dolar',
                simbolo: '$'
            },
            stock: 15,
        },
        {
            id: 2,
            producto: 'Nike Air Max 1',
            colorway: 'Black/White/Red',
            precio: 250,
            linkImg: './images/zapas-2.jpg',
            moneda: {
                id: 2,
                moneda: 'dolar',
                simbolo: '$'
            },
            stock: 20,
        },
        {
            id: 3,
            producto: 'Nike Air Max 90 Summit',
            colorway: 'White/Chile-Red/Bleached-Aqua',
            precio: 370,
            linkImg: './images/zapas-3.jpg',
            moneda: {
                id: 3,
                moneda: 'dolar',
                simbolo: '$'
            },
            stock: 20,
        },
        {
            id: 4,
            producto: 'Nike Air Jordan 1',
            colorway: 'Yellow-Ochre',
            precio: 350,
            linkImg: './images/zapas-4.jpg',
            moneda: {
                id: 4,
                moneda: 'dolar',
                simbolo: '$'
            },
            stock: 30
        },
        {
            id: 5,
            producto: 'Nike Air Jordan 1',
            colorway: 'Yellow-Ochre',
            precio: 377,
            linkImg: './images/zapas-5.jpg',
            moneda: {
                id: 5,
                moneda: 'dolares',
                simbolo: '$'
            },
            stock: 22
        },
        {
            id: 6,
            producto: 'Nike Air Jordan Night',
            colorway: 'Deep-Black',
            precio: 210,
            linkImg: './images/zapas-6.jpg',
            moneda: {
                id: 6,
                moneda: 'dolares',
                simbolo: '$'
            },
            stock: 12
        },
        {
            id: 7,
            producto: 'Nike Air 003',
            colorway: 'Deep-Black/Red',
            precio: 550,
            linkImg: './images/zapas-7.jpg',
            moneda: {
                id: 7,
                moneda: 'dolares',
                simbolo: '$'
            },
            stock: 14
        },
        {
            id: 8,
            producto: 'New Balance 033',
            colorway: 'Black/Blue/Red',
            precio: 430,
            linkImg: './images/zapas-8.jpg',
            moneda: {
                id: 8,
                moneda: 'dolares',
                simbolo: '$'
            },
            stock: 10
        }
    ];
    return productos;
}

function consultaCotizacion(){
    $.get("https://api.bluelytics.com.ar/v2/latest", (data) => {
        monedas = data;
    });
};


