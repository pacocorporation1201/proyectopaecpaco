// =======================
// NAVEGACION
// =======================

function mostrarSeccion(id){

  const secciones =
  document.querySelectorAll(".seccion");

  secciones.forEach(sec => {

    sec.style.display = "none";
    sec.classList.remove("activa");

  });

  const destino =
  document.getElementById(id);

  if(destino){

    destino.style.display = "block";
    destino.classList.add("activa");

  }

}

window.onload = () => {

  mostrarSeccion("inicio");

  cargarRegistros();
  cargarArticulos();
  cargarDiagramas();
  cargarTutoriales();

};


// =======================
// LOGIN
// =======================

function mostrarLogin(){

  document
  .getElementById("login")
  .classList.remove("oculto");

}

function cerrarLogin(){

  document
  .getElementById("login")
  .classList.add("oculto");

}

function entrar(){

  const tipo =
  document.getElementById("tipoUsuario").value;

  const pass =
  document.getElementById("password").value;

  if(tipo === "visitante"){

    cerrarLogin();

    return;

  }

  if(
    tipo === "registro" &&
    pass === "lavanda123"
  ){

    document
    .getElementById("btnPanel")
    .classList.remove("oculto");

    cerrarLogin();

    mostrarSeccion("panelRegistro");

    return;

  }

  if(
    tipo === "admin" &&
    pass === "admin123"
  ){

    document
    .getElementById("btnPanel")
    .classList.remove("oculto");

    document
    .getElementById("adminPanel")
    .classList.remove("oculto");

    cerrarLogin();

    mostrarSeccion("panelRegistro");

    return;

  }

  alert("Contraseña incorrecta");

}


// =======================
// REGISTROS
// =======================

async function crearRegistro(){

  const alumno =
  document.getElementById("alumno").value;

  const altura =
  document.getElementById("altura").value;

  const fecha =
  document.getElementById("fecha").value;

  const imagen =
  document.getElementById("imagenRegistro").files[0];

  const formData =
  new FormData();

  formData.append("alumno", alumno);
  formData.append("altura", altura);
  formData.append("fecha", fecha);

  if(imagen){

    formData.append("imagen", imagen);

  }

  await fetch("/registros",{

    method:"POST",
    body:formData

  });

  cargarRegistros();

}

async function cargarRegistros(){

  const res =
  await fetch("/registros");

  const data =
  await res.json();

  const lista =
  document.getElementById("listaRegistros");

  lista.innerHTML = "";

  data.forEach(r => {

    lista.innerHTML += `

      <div class="card">

        <h2>${r.alumno}</h2>

        <p>🌱 ${r.altura} cm</p>

        <p>📅 ${r.fecha}</p>

        ${
          r.imagen
          ?
          `<img src="${r.imagen}" class="imagenCard">`
          :
          ""
        }

      </div>

    `;

  });

}


// =======================
// ARTICULOS
// =======================

async function crearArticulo(){

  const titulo =
  document.getElementById("tituloArticulo").value;

  const contenido =
  document.getElementById("contenidoArticulo").value;

  const imagen =
  document.getElementById("imagenArticulo").files[0];

  const formData =
  new FormData();

  formData.append("titulo", titulo);
  formData.append("contenido", contenido);

  if(imagen){

    formData.append("imagen", imagen);

  }

  await fetch("/articulos",{

    method:"POST",
    body:formData

  });

  cargarArticulos();

}

async function cargarArticulos(){

  const res =
  await fetch("/articulos");

  const data =
  await res.json();

  const lista =
  document.getElementById("listaArticulos");

  lista.innerHTML = "";

  data.forEach(a => {

    lista.innerHTML += `

      <div class="card">

        <h2>${a.titulo}</h2>

        <p>${a.contenido}</p>

        ${
          a.imagen
          ?
          `<img src="${a.imagen}" class="imagenCard">`
          :
          ""
        }

      </div>

    `;

  });

}


// =======================
// DIAGRAMAS
// =======================

async function crearDiagrama(){

  const titulo =
  document.getElementById("tituloDiagrama").value;

  const imagen =
  document.getElementById("imagenDiagrama").files[0];

  const formData =
  new FormData();

  formData.append("titulo", titulo);

  if(imagen){

    formData.append("imagen", imagen);

  }

  await fetch("/diagramas",{

    method:"POST",
    body:formData

  });

  cargarDiagramas();

}

async function cargarDiagramas(){

  const res =
  await fetch("/diagramas");

  const data =
  await res.json();

  const lista =
  document.getElementById("listaDiagramas");

  lista.innerHTML = "";

  data.forEach(d => {

    lista.innerHTML += `

      <div class="card">

        <h2>${d.titulo}</h2>

        ${
          d.imagen
          ?
          `<img src="${d.imagen}" class="imagenCard">`
          :
          ""
        }

      </div>

    `;

  });

}


// =======================
// TUTORIALES
// =======================

async function crearTutorial(){

  const titulo =
  document.getElementById("tituloTutorial").value;

  const link =
  document.getElementById("linkTutorial").value;

  await fetch("/tutoriales",{

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({

      titulo,
      link

    })

  });

  cargarTutoriales();

}

async function cargarTutoriales(){

  const res =
  await fetch("/tutoriales");

  const data =
  await res.json();

  const lista =
  document.getElementById("listaTutoriales");

  lista.innerHTML = "";

  data.forEach(t => {

    lista.innerHTML += `

      <div class="card">

        <h2>${t.titulo}</h2>

        <a href="${t.link}" target="_blank">

          🎥 Ver Tutorial

        </a>

      </div>

    `;

  });

}


// =======================
// ADMIN
// =======================

function cambiarColor(){

  const colores = [

    "#27ae60",
    "#3498db",
    "#9b59b6",
    "#e67e22",
    "#e74c3c"

  ];

  const color =
  colores[
    Math.floor(
      Math.random() * colores.length
    )
  ];

  document
  .documentElement
  .style
  .setProperty(
    "--verde-principal",
    color
  );

}

function modoMantenimiento(){

  alert(
    "Función en construcción."
  );

}

function limpiarSistema(){

  alert(
    "Función en construcción."
  );

}

function descargarExcel(){

  alert(
    "Descarga Excel en construcción."
  );

}

function procesarArchivoAdmin(){

  alert(
    "Archivo recibido."
  );

}