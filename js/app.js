const resultado = document.querySelector("#respuesta");
const formulario = document.querySelector("#form");

window.addEventListener("load", () =>{
    formulario.addEventListener("submit",BuscarClima);
});

function BuscarClima(e){
    e.preventDefault();

    let cuidad = document.querySelector("#cuidad").value;
    let pais = document.querySelector("#pais").value;

    if(cuidad === "" || pais === ""){
        MostrarError("Ambos campos son obligatorios");
    }

    ConsultarApi(cuidad,pais);
}

function MostrarError(mensaje){

    const alerta = document.querySelector(".error");

    //si no existe, la agrega
    if(!alerta){
        const mensajeError = document.createElement("p");

        mensajeError.classList.add("error");

        mensajeError.textContent=mensaje;

        resultado.appendChild(mensajeError);

        setTimeout(() =>{
            mensajeError.remove();
        },5000)
    }
}

function ConsultarApi(cuidad,pais){
    const key = "e625f02627dca9942b80fde6a04b3e15";

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cuidad},${pais}&appid=${key}`;

    Spinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            LimpiarHtml();
            if(datos.cod === "404"){
                MostrarError("Ciudad no encontrada");
                return;
            }

            MostrarClima(datos);
        });
}

function MostrarClima(datos){
    const {main:{temp,temp_max,temp_mim}} = datos;
    const temperatura = KevinCentigrados(temp);

    const MostrarTemp = document.createElement("p");

    MostrarTemp.classList.add("temperatura");

    MostrarTemp.innerHTML= `${temperatura} &#8451;`;

    resultado.appendChild(MostrarTemp);

}

function KevinCentigrados(grados){
    return parseInt(grados - 273.15)
}

function LimpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner(){
    LimpiarHtml();

    const divSpinner = document.createElement("div");
    divSpinner.classList.add("sk-circle");

    divSpinner.innerHTML = `<div class="sk-circle1 sk-child"></div>
    <div class="sk-circle2 sk-child"></div>
    <div class="sk-circle3 sk-child"></div>
    <div class="sk-circle4 sk-child"></div>
    <div class="sk-circle5 sk-child"></div>
    <div class="sk-circle6 sk-child"></div>
    <div class="sk-circle7 sk-child"></div>
    <div class="sk-circle8 sk-child"></div>
    <div class="sk-circle9 sk-child"></div>
    <div class="sk-circle10 sk-child"></div>
    <div class="sk-circle11 sk-child"></div>
    <div class="sk-circle12 sk-child"></div>`;

    resultado.appendChild(divSpinner);
}