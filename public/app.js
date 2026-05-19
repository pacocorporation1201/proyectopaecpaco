// =======================
// CLIMA
// =======================

async function obtenerClima(){

  try{

    const res =
    await fetch(
"https://api.open-meteo.com/v1/forecast?latitude=20.59&longitude=-100.39&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto"
    );

    const data = await res.json();

    const actual =
    data.current_weather;

    const dias =
    data.daily;

    let html = `

      <h2>
      🌡 Temperatura:
      ${actual.temperature}°C
      </h2>

      <p>
      💨 Viento:
      ${actual.windspeed} km/h
      </p>

      <hr>

      <h3>
      📅 Pronóstico
      </h3>

    `;

    for(let i=0; i<5; i++){

      html += `

        <p>

        📆 ${dias.time[i]}

        | 🔺 ${dias.temperature_2m_max[i]}°C

        | 🔻 ${dias.temperature_2m_min[i]}°C

        </p>

      `;
    }

    document
    .getElementById("clima")
    .innerHTML = html;

  }catch(error){

    console.log(error);

  }

}

obtenerClima();


// =======================
// GUARDAR LOCAL
// =======================

function guardarLocal(){

  localStorage.setItem(
    "registros",
    document.getElementById(
      "listaRegistros"
    ).innerHTML
  );

  localStorage.setItem(
    "articulos",
    document.getElementById(
      "listaArticulos"
    ).innerHTML
  );

  localStorage.setItem(
    "diagramas",
    document.getElementById(
      "listaDiagramas"
    ).innerHTML
  );

  localStorage.setItem(
    "tutoriales",
    document.getElementById(
      "listaTutoriales"
    ).innerHTML
  );

}

function cargarLocal(){

  document.getElementById(
    "listaRegistros"
  ).innerHTML =
  localStorage.getItem("registros") || "";

  document.getElementById(
    "listaArticulos"
  ).innerHTML =
  localStorage.getItem("articulos") || "";

  document.getElementById(
    "listaDiagramas"
  ).innerHTML =
  localStorage.getItem("diagramas") || "";

  document.getElementById(
    "listaTutoriales"
  ).innerHTML =
  localStorage.getItem("tutoriales") || "";

}

cargarLocal();


// =======================
// MANTENIMIENTO
// =======================

let mantenimiento = {

  registros:false,
  articulos:false,
  diagramas:false,
  tutoriales:false

};

function modoMantenimiento(){

  const seccion =
  prompt(
"¿Qué sección?\nregistros\narticulos\ndiagramas\ntutoriales"
  );

  if(!mantenimiento.hasOwnProperty(seccion)){

    alert("Sección inválida");
    return;

  }

  mantenimiento[seccion] =
  !mantenimiento[seccion];

  actualizarMantenimiento();

}

function actualizarMantenimiento(){

  for(let sec in mantenimiento){

    const estado =
    document.getElementById(
      "estado" +
      sec.charAt(0).toUpperCase() +
      sec.slice(1)
    );

    if(mantenimiento[sec]){

      estado.innerHTML = `

        <div class="card">

        🚧 Sección en mantenimiento

        </div>

      `;

    }else{

      estado.innerHTML = "";

    }

  }

}


// =======================
// BORRAR COMENTARIOS
// =======================

function agregarComentario(event,input){

  if(event.key === "Enter"){

    const texto = input.value;

    const lista =
    input.parentElement
    .querySelector(".listaComentarios");

    lista.innerHTML += `

      <div class="comentario">

        👤 ${texto}

        <button onclick="this.parentElement.remove();guardarLocal()">

        ❌

        </button>

      </div>

    `;

    input.value = "";

    guardarLocal();

  }

}


// =======================
// GUARDAR AUTOMATICO
// =======================

const viejoRegistro = crearRegistro;

crearRegistro = function(){

  viejoRegistro();

  setTimeout(() => {

    guardarLocal();

  }, 500);

};

const viejoArticulo = crearArticulo;

crearArticulo = function(){

  viejoArticulo();

  setTimeout(() => {

    guardarLocal();

  }, 500);

};

const viejoDiagrama = crearDiagrama;

crearDiagrama = function(){

  viejoDiagrama();

  setTimeout(() => {

    guardarLocal();

  }, 500);

};

const viejoTutorial = crearTutorial;

crearTutorial = function(){

  viejoTutorial();

  setTimeout(() => {

    guardarLocal();

  }, 500);

};