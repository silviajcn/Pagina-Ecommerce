
//variable para el escuchar el evento de envio en el formulario de regitro
const enviar = document.getElementById('enviar').addEventListener('click', saveUser);


//Prevent Default
let form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

});


// Obtener los datos de usuario ingresados en el formulario
function saveUser() {
    const primerNombre = document.getElementById('fname').value;
    const apellido = document.getElementById('lname').value;
    const telefono = document.getElementById('tel').value;
    const correo = document.getElementById('email').value;
    const clave = document.getElementById('clave').value;
    const check = document.getElementById('check1').value

    crearCuenta(primerNombre, apellido, telefono, correo, clave, check);
}

//Convertir los datos recibidos en un array 
let listaUsuarios = [];

function crearCuenta(nombre, apellido, telefono, correo, clave, check) {
    let newUser = {
        // llave/valor
        firstName: nombre,
        lastName: apellido,
        telefono: telefono,
        email: correo,
        password: clave,
        checkBoton: check
    };

    listaUsuarios.push(newUser);
    localStoragelistaUsuarios(listaUsuarios);
}

// Obtener los datos de usuario en el localStorage
function getUsuario() {
    let storedUsuario = localStorage.getItem('datosUser');
    if(storedUsuario == null) {                             //verificar si los datos existen
        listaUsuarios = [];
    } else {
        listaUsuarios = JSON.parse(storedUsuario);
    }
}


//Guardar los datos en el localStorage
function localStoragelistaUsuarios(lista) {
    localStorage.setItem('datosUser', JSON.stringify(lista));
}