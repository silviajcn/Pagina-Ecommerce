/*---------------------------------------- Tarjetas de productos ---------------------------------------*/



//Esperar a que cargue la pagina y lea los productos
document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    
    //Local storage
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito();
    }
})

//Obtener datos del json
const fetchData = async () => {
    try {
        const res = await fetch('scripts/api.json');
        const data = await res.json();
        //console.log(data);
        pintarProductos(data);
        detectarBotones(data);
    } catch (error) {
        console.log(error);
    }
}


//Mostrar productos en las cards del documento html
const contenedorProductos = document.querySelector('#contenedor_productos');
const pintarProductos = (data) => {
    //Creacion del template
    const template = document.querySelector('#template_productos').content;
    //Creacion del fragment
    const fragment = document.createDocumentFragment();
    //console.log(template);
    //Iteracion de los productos
    data.forEach(producto => {
        //console.log(producto);
        //Modificacion del template con la data del json
        template.querySelector('img').setAttribute('src', producto.imageUrl);
        template.querySelector('h5').textContent = producto.title;
        template.querySelector('p span').textContent = producto.precio;
        template.querySelector('button').dataset.id = producto.id;

        //clonar el template 
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    });

    //agregar los datos creados al contenedor de productos
    contenedorProductos.appendChild(fragment);
}


/*----------------------------------------- Tabla carrito de compras ---------------------------------------*/
//
let carrito = {}

const detectarBotones = (data) => {
    const botones = document.querySelectorAll('.card button');

    //hacer recorrido en el array
    botones.forEach(btn => {
        //detectar click en botones de compra
        btn.addEventListener('click', () => {
            // console.log(btn.dataset.id)
            //constante para encontrar los datos de cada producto
            const producto = data.find(item => item.id === parseInt(btn.dataset.id));
            producto.cantidad = 1
            if (carrito.hasOwnProperty(producto.id)) {
                producto.cantidad = carrito[producto.id].cantidad + 1
            }
            carrito[producto.id] = { ...producto }
            // console.log('carrito', carrito)
            pintarCarrito();
        })
    })
}

const items = document.querySelector('#items');

const pintarCarrito = () => {

    items.innerHTML = ''

    //transformar objeto carrito en array para poder recorrerlo
    const template = document.querySelector('#template_carrito').content;
    const fragment = document.createDocumentFragment();

    Object.values(carrito).forEach(producto => {
        // console.log('producto', producto)
        template.querySelector('th').textContent = producto.id
        template.querySelectorAll('td')[0].textContent = producto.title
        template.querySelectorAll('td')[1].textContent = producto.cantidad
        template.querySelector('span').textContent = producto.precio * producto.cantidad
        
        //botones de agregar quitar
        template.querySelector('.btn-info').dataset.id = producto.id
        template.querySelector('.btn-danger').dataset.id = producto.id

        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    })

    items.appendChild(fragment);

    pintarFooter();
    accionBotones();


    //Guardar informacion en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

}

//pie de la tabla del carrito
const footer = document.querySelector('#footer_carrito');
const pintarFooter = () => {

    footer.innerHTML = ''

    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Tu carrito está vacío</th>
        `
        return
    }

    const template = document.querySelector('#template_footer').content;
    const fragment = document.createDocumentFragment();


    //Sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0);
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    //console.log(nPrecio);

    template.querySelectorAll('td')[0].textContent = nCantidad
    template.querySelector('span').textContent = nPrecio


    const clone = template.cloneNode(true);
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    // Boton de vaciar la tabla del carito
    const boton = document.querySelector('#vaciar_carrito');
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito();
    });
}


/* -----  Funciones para botones de agregar o quitar productos en la tabla del carrito  ----- */ 
const accionBotones = () => {
    const botonesAgregar = document.querySelectorAll('#items .btn-info');
    const botonesEliminar = document.querySelectorAll('#items .btn-danger');

    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = carrito[btn.dataset.id]
            producto.cantidad ++
            carrito[btn.dataset.id] = { ...producto }
            pintarCarrito();
        })
    });

    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = carrito[btn.dataset.id]
            producto.cantidad --
            if (producto.cantidad === 0) {
                delete carrito[btn.dataset.id]     //Eliminar objeto de la coleccion de objetos
            } else {
                carrito[btn.dataset.id] = { ...producto }
            }
            pintarCarrito();
        })
    });
}