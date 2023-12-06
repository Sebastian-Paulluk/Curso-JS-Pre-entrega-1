const carrito = [];
const historial = [];
let seccionAnterior = "";

const remeras = [{descripcion: "Remera Puma Essentials", precio: 12800},
                {descripcion: "Musculosa Lotto Basic", precio: 7200}];
const calzado = [{descripcion: "Zapatillas Nike Court Legacy Lift", precio: 95000},
                {descripcion: "Zapatillas Converse Chuck Taylor All Star Ox ", precio: 61500}];

const lavarropas = [{descripcion: "Lavarropas Drean Automático NEXT 6 kg", precio: 585000}];
const heladeras = [{descripcion: "Heladera Philco Top Mount 290 L PHCT291B", precio: 430000}];



const quitarElementos = array => {
    while (array.length > 0) {
        array.pop()
    }
}

const listarProductos = seccionProducto => {
    let producto = "";
    for (let i=0; i < seccionProducto.length; i++) {
        producto += `         ${i+1}- ${seccionProducto[i].descripcion} ($ ${seccionProducto[i].precio})\n`;
    }
    return producto;
}

const modificarHistorial = seccion => {
    if (historial[historial.length -1] !== seccion) {
        historial.push(seccion);
    }
}

const mostrarHistorial = () => historial.join(' > ')

const irASeccionAnterior = () => {
    switch (seccionAnterior) {
        case "inicio":
            inicio();
        case "menuRopa":
            menuRopa();
        case "menuElectrodomesticos":
            menuElectrodomesticos();
        case "catalogoRemeras":
            catalogoRemeras();
        case "catalogoCalzado":
            catalogoCalzado();
        case "catalogoHeladeras":
            catalogoHeladeras();
        case "catalogoLavarropas":
            catalogoLavarropas();
    }  
}

// ------------------------------- Caja

const pagar = () => {
    quitarElementos(carrito);
    alert("Compra realizada con éxito. Gracias!");
    inicio();
}

const confirmacionPago = () => {
    let confirmacion = confirm(`¿Confirma el pago de $ ${calcularPrecioTotal()}?`);
    if (confirmacion === true) {
        pagar();
    } else {
        ingresoCodigoSeguridad();
    }
}

const validarCogidoSeguridad = codigoIngresado => {
    numero = codigoIngresado.toString();
    if (numero.length === 3) {
        confirmacionPago();
    } else {
        alert("Código de seguridad inválido.");
        ingresoCodigoSeguridad();
    }
}

const ingresoCodigoSeguridad = () => {
    let ingreso = parseInt(prompt(
        `Caja - ingreso tarjeta > Fecha vencimiento > Código\nIngrese el código de seguridad:                   Total: $ ${calcularPrecioTotal()}\n\n` +
        `(3 dígitos)                                                      9- Volver    0- Inicio`
    ));

    switch (ingreso) {
        case 9:
            ingresoFechaVencimiento();
        case 0:
            inicio();
        default:
            validarCogidoSeguridad(ingreso);
    }
}

const validarFechaVencimiento = fechaIngresada => {
    numero = fechaIngresada.toString();
    if (numero.length === 5) {
        ingresoCodigoSeguridad();
    } else {
        alert("Fecha de vencimiento inválida.");
        ingresoFechaVencimiento();
    }
}

const ingresoFechaVencimiento = () => {
    let ingreso = parseInt(prompt(
        `Caja - ingreso tarjeta > Fecha vencimiento\nIngrese la fecha de vencimiento:                  Total: $ ${calcularPrecioTotal()}\n\n` +
        `(5 dígitos)                                                      9- Volver    0- Inicio`
    ));

    switch (ingreso) {
        case 9:
            caja();
        case 0:
            inicio();
        default:
            validarFechaVencimiento(ingreso);
    }
}

const validarNumeroTarjeta = numeroTarjetaIngresado => {
    numero = numeroTarjetaIngresado.toString();
    if (numero.length === 16) {
        ingresoFechaVencimiento();
    } else {
        alert("Número de tarjeta inválido.");
        caja();
    }
}

function caja() {
    let ingreso = parseInt(prompt(
        `Caja - ingreso tarjeta \nIngrese el número de la tarjeta:                   Total: $ ${calcularPrecioTotal()}\n\n` +
        `(16 dígitos)                                                    9- Volver    0- Inicio`
    ));

    switch (ingreso) {
        case 9:
            verCarrito();
        case 0:
            inicio();
        default:
            validarNumeroTarjeta(ingreso);
    }
}

// ------------------------------- Carrito

const agregarACarrito = producto => {
    if (!carrito.includes(producto)) {
        carrito.push(producto);
        alert("Se ha agregado " + producto.descripcion + " al carrito.");
    } else {
        alert("Este articulo ya se encuentra en el carrito.")
    }
}

const carritoEstaVacio = () => carrito.length === 0

const  tamanioCarrito = () => {
    if (carritoEstaVacio()) {
        return "vacío";
    } else {
        return carrito.length;
    }
}

const descartarProductoDelCarrito = producto => {
    let confirmar = confirm(`¿Descartar ${producto.descripcion}?`);
    if (confirmar === true) {
        let indice = carrito.indexOf(producto);
        carrito.splice(indice, 1);
        alert(`Se ha descartado ${producto.descripcion} del carrito de compras.`);
    }
}

const vaciarCarrito = () => {
    let confirmar = confirm("¿Vaciar carrito?");
    if (confirmar === true) {
        quitarElementos(carrito);
        alert("Se ha vaciado el carrito de compras.");
    }
}

const comprobarSiHayProductosEnCarrito = () => {
    if (carritoEstaVacio()) {
        alert("El carrito ya está vacío.");
    } else {
        vaciarCarrito();
    }
}

const comprobarProductoADescartarDelCarrito = producto => {
    if (carrito.includes(producto)) {
        descartarProductoDelCarrito(producto);
    } else {
        alert("Opcion inválida.");
    }
}

const comprobarProductosParaPagar = () => {
    if (carritoEstaVacio()) {
        alert("No hay artículos para pagar en el carrito.");
        verCarrito();
    } else {
        caja();
    }
}

const mensajeMenuCarrito = () => {
    let ret = "El carrito de compras está vacío."
    if (!carritoEstaVacio()) {
        ret = "Selecciona un producto para descartarlo del carrito:"
    }
    return ret
}

const calcularPrecioTotal = () => {
    let total = 0;
    for (producto of carrito) {
        total += producto.precio;
    }
    return total
}

function verCarrito() {
    let opcion = parseInt(prompt(
        `Carrito\n${mensajeMenuCarrito()}\n\n` +
        `${listarProductos(carrito)}`+
        `             Total: $ ${calcularPrecioTotal()}\n\n`+
        `7-  Ir a caja\n` +
        `8-  Vaciar carrito                                                  9- Volver    0- Inicio`
    ));

    switch (opcion) {
        case 7:
            comprobarProductosParaPagar();
        case 8:
            comprobarSiHayProductosEnCarrito();
            verCarrito();
        case 9:
            irASeccionAnterior();
        case 0:
            inicio();
        default:
            comprobarProductoADescartarDelCarrito(carrito[opcion-1]);
            verCarrito();
    }
}

// ------------------------------- Catálogo

// Catálogo de electrodomesticos

function catalogoLavarropas(){
    modificarHistorial("Lavarropas");

    let opcion = parseInt(prompt(
        `${mostrarHistorial()}\n\Selecciona un producto para agregarlo al carrito:\n\n` +
        `${listarProductos(lavarropas)}\n`+
        `8-  Ver carrito (${tamanioCarrito()})                                            9- Volver    0- Inicio`
    ));

    switch (opcion) {
        case 1:
            agregarACarrito(lavarropas[opcion-1]);
            catalogoLavarropas();
        case 8:
            seccionAnterior = "catalogoLavarropas";
            verCarrito();
        case 9:
            historial.pop();
            menuElectrodomesticos();
        case 0:
            inicio();
        default:
            alert("Opcion inválida.");
            catalogoLavarropas();
    }
}

function catalogoHeladeras() {
    modificarHistorial("Lavarropas");

    let opcion = parseInt(prompt(
        `${mostrarHistorial()}\n\Selecciona un producto para agregarlo al carrito:\n\n` +
        `${listarProductos(heladeras)}\n`+
        `8-  Ver carrito (${tamanioCarrito()})                                            9- Volver    0- Inicio`
    ));

    switch (opcion) {
        case 1:
            agregarACarrito(heladeras[opcion-1]);
            catalogoHeladeras();
        case 8:
            seccionAnterior = "catalogoHeladeras";
            verCarrito();
        case 9:
            historial.pop();
            menuElectrodomesticos();
        case 0:
            inicio();
        default:
            alert("Opcion inválida.");
            catalogoHeladeras();
    }
}

// Catálogo de ropa

function catalogoRemeras() {
    modificarHistorial("Remeras");

    let opcion = parseInt(prompt(
        `${mostrarHistorial()}\n\Selecciona un producto para agregarlo al carrito:\n\n` +
        `${listarProductos(remeras)}\n`+
        `8-  Ver carrito (${tamanioCarrito()})                                            9- Volver    0- Inicio`
    ));

    switch (opcion) {
        case 1:
            agregarACarrito(remeras[opcion-1]);
            catalogoRemeras();
        case 2: 
            agregarACarrito(remeras[opcion-1]);
            catalogoRemeras();
        case 8:
            seccionAnterior = "catalogoRemeras";
            verCarrito();
        case 9:
            historial.pop();
            menuRopa();
        case 0:
            inicio();
        default:
            alert("Opcion inválida.");
            catalogoRemeras();
    }
}

function catalogoCalzado() {
    modificarHistorial("Calzado");

    let opcion = parseInt(prompt(
        `${mostrarHistorial()}\n\Selecciona un producto para agregarlo al carrito:\n\n` +
        `${listarProductos(calzado)}\n`+
        `8-  Ver carrito (${tamanioCarrito()})                                            9- Volver    0- Inicio`
    ));

    switch (opcion) {
        case 1:
            agregarACarrito(calzado[opcion-1]);
            catalogoCalzado();
        case 2: 
            agregarACarrito(calzado[opcion-1]);
            catalogoCalzado();
        case 8:
            seccionAnterior = "catalogoCalzado";
            verCarrito();
        case 9:
            historial.pop();
            menuRopa();
        case 0:
            inicio();
        default:
            alert("Opcion inválida.");
            catalogoCalzado();
    }
}

// ------------------------------- Categorias

function menuElectrodomesticos() {
    modificarHistorial("Electrodomésticos");
    
    let opcion = parseInt(prompt(
        `${mostrarHistorial()}\nSeleccione una categoria de electrodomésticos:\n
        1-  Lavarropas
        2-  Heladeras\n\n` + 
        `8-  Ver carrito (${tamanioCarrito()})                                            9- Volver    0- Inicio`
    ));

    switch (opcion) {
        case 1:
            catalogoLavarropas();
        case 2: 
            catalogoHeladeras();
        case 8:
            seccionAnterior = "menuElectrodomesticos";
            verCarrito();
        case 9:
        case 0:
            inicio();
        default:
            alert("Opcion inválida.");
            menuRopa();
    }
}

function menuRopa() {
    modificarHistorial("Ropa");
    
    let opcion = parseInt(prompt(
        `${mostrarHistorial()}\nSeleccione una categoria de ropa:\n
        1-  Remeras
        2-  Calzado\n\n` +
        `8-  Ver carrito (${tamanioCarrito()})                                            9- Volver    0- Inicio`
    ));

    switch (opcion) {
        case 1:
            catalogoRemeras();
        case 2: 
            catalogoCalzado();
        case 8:
            seccionAnterior = "menuRopa";
            verCarrito();
        case 9:
        case 0:
            inicio();
        default:
            alert("Opcion inválida.");
            menuRopa();
    }
}

// ------------------------------- Menú de inicio

function inicio() {
    quitarElementos(historial);
    modificarHistorial("Inicio");

    let opcion = parseInt(prompt(
        `${mostrarHistorial()}\nSeleccione una categoria para ver nuestros productos:\n
        1-  Ropa
        2-  Electrodomésticos\n\n` + 
        `8-  Ver carrito (${tamanioCarrito()})` 
    ));

    switch (opcion) {
        case 1:
            menuRopa();
        case 2: 
            menuElectrodomesticos();
        case 8:
            seccionAnterior = "inicio";
            verCarrito();
        default:
            alert("Opcion inválida.");
            inicio();
    }
}

inicio();