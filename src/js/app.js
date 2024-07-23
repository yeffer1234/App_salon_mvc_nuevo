let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
id: "",
nombre:  "",
fecha:  "",
hora:  "",
descripcion:  "",
servicios:[]


}




document.addEventListener("DOMContentLoaded", function(){
iniciarApp();


});


function iniciarApp(){
mostrarSeccion();//muestra y oculta las secciones
   tabs();//cambia la seccion cuando se presionan los tabs
   botonesPaginador();//agrega o quita los botones del paginador
   paginaSiente();
   paginaAnterior();
   consultarAPI(); //consulta la api en el bakend de php
   idCliente();
   nombreCliente();//añade el nombre del cliente al objecto de cita
   seleccionarFecha();//añade la fecha de la cita en el objecto
   guardarDescripcion();//añade la descripcion de la cita en el objecto
   seleccionarHora();//añade la hora de la cita en el objecto

   mostrarResumen();//muestra el resumen de la cita

}


function mostrarSeccion(){
//ocultar la seccion que tenga la clase de mostrar
const seccionAnterior = document.querySelector(".mostrar");
if(seccionAnterior) {
 seccionAnterior.classList.remove("mostrar")   
}


    //seleccionar la seccion con el paso 
   const pasoSelector = `#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);
    seccion.classList.add("mostrar");
   
    //quita la clase de actual al tab anterior
    const tabAnterior = document.querySelector(".actual");
    if(tabAnterior){
        tabAnterior.classList.remove("actual");
    }
    //resalta el tabs actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add("actual");

 
}

function tabs(){
    
    const botones = document.querySelectorAll(".tabs button");
   
botones.forEach(boton => {
boton.addEventListener("click", function(e){

   paso = parseInt(e.target.dataset.paso);

   mostrarSeccion();
   botonesPaginador();

   
});
})



}


function botonesPaginador(){
const paginaAnterior = document.querySelector("#anterior");
const paginaSiente = document.querySelector("#siguiente");

if(paso === 1 ){
    paginaAnterior.classList.add("ocultar");
    paginaSiente.classList.remove("ocultar");
}
else if(paso === 3){
    paginaAnterior.classList.remove("ocultar");
    paginaSiente.classList.add("ocultar");
    mostrarResumen();
}else{
    paginaAnterior.classList.remove("ocultar");
    paginaSiente.classList.remove("ocultar");
}
mostrarSeccion();
}

function paginaAnterior(){
paginaAnterior = document.querySelector("#anterior");
paginaAnterior.addEventListener("click", function(){

    if(paso <= pasoInicial) return;
paso--;
botonesPaginador();
});

}

function paginaSiente(){

    paginaSiente = document.querySelector("#siguiente");
    paginaSiente.addEventListener("click", function(){
    
        if(paso >= pasoFinal) return;
    paso++;
    botonesPaginador();
    });

}


 async function consultarAPI(){
try {
    const url = "/api/servicios";
    const resultado = await fetch(url);
    const servicios = await resultado.json();
    mostrarServicios(servicios);
} catch (error) {
    console.log(error)
}
 }


 function mostrarServicios(servicios){
servicios.forEach(servicio => {
const {id, nombre, precio} = servicio;

const nombreServicio = document.createElement("P");
nombreServicio.classList.add("nombre-servicio");
nombreServicio.textContent = nombre;

const precioServicio = document.createElement("P");
precioServicio.classList.add("precio-servicio");
precioServicio.textContent =`$${precio} COP`;

const serviciosDiv = document.createElement("DIV");
serviciosDiv.classList.add("servicio");
serviciosDiv.dataset.idServicio = id;
serviciosDiv.onclick = function(){
    seleccionarServicio(servicio);
}


serviciosDiv.appendChild(nombreServicio);
serviciosDiv.appendChild(precioServicio);

document.querySelector("#servicios").appendChild(serviciosDiv);

// console.log(serviciosDiv);
});


 }


 function seleccionarServicio(servicio){
      const {id} = servicio;
      const {servicios} = cita;

// indentificar al elemento al que se le da click
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);
   //comprobar si un servicio ya fue agregado
    if(servicios.some( agregado => agregado.id === id)){
       //eliminar
cita.servicios = servicios.filter(agregado => agregado.id !== id);
divServicio.classList.remove("seleccionado");
    }else{
        //agregarlo
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add("seleccionado");
    }





// console.log(cita);
 }


 function idCliente(){
    cita.id = document.querySelector("#id").value;
   
 }
 function nombreCliente(){
    const nombre = document.querySelector("#nombre").value;
    cita.nombre = nombre;
 }


 


 function seleccionarFecha(e){
const inputFecha = document.querySelector("#fecha");
inputFecha.addEventListener("input", function(e){
// console.log(e.target.value);
   
const dia  = new Date(e.target.value).getUTCDay();

if([0].includes(dia)){
    e.target.value = "";

    mostrarAlerta("Lo sentimos los Domingos no laboramos :( ", "error", ".formulario");
}else{
  cita.fecha = e.target.value;
}

});

 }

 function  guardarDescripcion(){
    const inputDescripcion = document.querySelector("#descripcion");
    inputDescripcion.addEventListener("input", function(e){
    cita.descripcion = e.target.value;
    });
    

 }

 function seleccionarHora(){

    const inputHora = document.querySelector("#hora");
    inputHora.addEventListener("input", function(e){

const horaCita = e.target.value
const hora = horaCita.split(":")[0];
if(hora < 8 || hora > 18 || hora == 12 || hora == 13){
    e.target.value = "";
   mostrarAlerta("Hora no valida", "error",".formulario");
}else{
  cita.hora = e.target.value;
//   console.log(cita);
}
// console.log(hora);
    });



 }
 function  mostrarAlerta(mensaje , tipo , elemento, desaparece = true){
//previene que se genere mas de una alerta
const alertaPrevia = document.querySelector(".alerta");
if(alertaPrevia){
    alertaPrevia.remove();
}

//scripting para crear la alerta
const alerta = document.createElement("DIV");
alerta.textContent = mensaje;
alerta.classList.add("alerta");
alerta.classList.add(tipo);

const referencia = document.querySelector(elemento);
referencia.appendChild(alerta);
if(desaparece){
//eliminar la alerta
setTimeout(() => {
    alerta.remove();
}, 6000);
}
 }

 function mostrarResumen(){
    const resumen = document.querySelector(".contenido-resumen");

 //limpia el contenido de resumen
 while(resumen.firstChild){
    resumen.removeChild(resumen.firstChild);
 }

    if(Object.values(cita).includes("") || cita.servicios.length === 0){
mostrarAlerta("Faltan datos de servicios","error",".contenido-resumen", false);
return;
    }

    //formatiar el div de resumen
    const {nombre, fecha, hora, descripcion , servicios} = cita;
    
    
    //heading para servicios en resumen
const headingServicios = document.createElement("H3");
headingServicios.textContent = "Resumen de servicios";
resumen.appendChild(headingServicios);
    //Iterando y mostrando los servicios
servicios.forEach(servicio =>{
    const {id, precio, nombre} = servicio;
const contenedorServicio = document.createElement("DIV");
contenedorServicio.classList.add("contenedor-servicio");

const textoServicio = document.createElement("P");
textoServicio.textContent = nombre;

const precioServicio = document.createElement("P");
precioServicio.innerHTML = `<span>Precio: </span>$${precio} COP`;

contenedorServicio.appendChild(textoServicio);
contenedorServicio.appendChild(precioServicio);
resumen.appendChild(contenedorServicio);
} );

  
    
    //formatear la fecha en español
    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate() + 2;
    const year = fechaObj.getFullYear();

    const fechaUTC = new Date( Date.UTC(year, mes, dia));
    const opciones = {weekday: "long", year: "numeric", month: "long", day: "numeric"}
    const fechaFormateada = fechaUTC.toLocaleDateString("es-VE", opciones);
// console.log(fechaFormateada);
  //heading para cita en resumen
    const headingCita = document.createElement("H3");
    headingCita.textContent = "Resumen de cita";
    resumen.appendChild(headingCita);

const nombreCliente = document.createElement("P");
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;
    
    const fechaCliente = document.createElement("P");
    fechaCliente.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;
    const horaCliente = document.createElement("P");
    horaCliente.innerHTML = `<span>Hora:</span> ${hora} Horas`;
    
    const descripcionCliente = document.createElement("P");
    descripcionCliente.innerHTML = `<span>Descripcion:</span> ${descripcion}`;

//boton para crear una cita 
const botonReservar = document.createElement("BUTTON");
botonReservar.classList.add("boton");
botonReservar.textContent = "Reservar cita";
botonReservar.onclick = reservarCita;

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCliente);
    resumen.appendChild(horaCliente);
    resumen.appendChild(descripcionCliente);
    resumen.appendChild(botonReservar);
  
 }

 async function reservarCita(){

const { nombre, fecha, hora, descripcion, servicios, id } = cita;

const idServicios = servicios.map(servicio => servicio.id);

const datos = new FormData();

datos.append("fecha",fecha);
datos.append("hora",hora);
datos.append("descripcion",descripcion);
datos.append("usuarioId",id);
datos.append("servicios",idServicios);
// console.log([...datos]);
// return;
//peticion hacia la api
try {
    const url = "/api/citas"
    const respuesta = await fetch(url, {
    method: "POST",
    body: datos

});

const resultado = await respuesta.json();
console.log(resultado);
} 
catch (error) {
    console.log(error);
}



try {
   if (404) {
    Swal.fire({
        icon: 'success',
        title: 'Cita creada',
        text: 'Tu cita fue creada correctamente',
        button: "OK"
    }).then(() =>{
       setTimeout(() => {
            window.location.reload();
       },3000);
       
    
    })
    return;
}
 
} catch (error) {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al guardar la cita",
     
      });
}


 }

 