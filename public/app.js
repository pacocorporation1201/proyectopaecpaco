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

  formData.append(
    "alumno",
    alumno
  );

  formData.append(
    "altura",
    altura
  );

  formData.append(
    "fecha",
    fecha
  );

  formData.append(
    "imagen",
    imagen
  );

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
  document.getElementById(
    "listaRegistros"
  );

  lista.innerHTML = "";

  data.forEach((r)=>{

    lista.innerHTML += `

      <div class="card">

        <h2>${r.alumno}</h2>

        <p>
        🌱 ${r.altura} cm
        </p>

        <p>
        📅 ${r.fecha}
        </p>

        ${
          r.imagen
          ?
          `
          <img
          src="${r.imagen}"
          class="imagenCard">
          `
          :
          ""
        }

      </div>

    `;

  });

}

cargarRegistros();


// =======================
// ARTICULOS
// =======================

async function crearArticulo(){

  const titulo =
  document.getElementById(
    "tituloArticulo"
  ).value;

  const contenido =
  document.getElementById(
    "contenidoArticulo"
  ).value;

  const imagen =
  document.getElementById(
    "imagenArticulo"
  ).files[0];

  const formData =
  new FormData();

  formData.append(
    "titulo",
    titulo
  );

  formData.append(
    "contenido",
    contenido
  );

  formData.append(
    "imagen",
    imagen
  );

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
  document.getElementById(
    "listaArticulos"
  );

  lista.innerHTML = "";

  data.forEach((a)=>{

    lista.innerHTML += `

      <div class="card">

        <h2>${a.titulo}</h2>

        <p>${a.contenido}</p>

        ${
          a.imagen
          ?
          `
          <img
          src="${a.imagen}"
          class="imagenCard">
          `
          :
          ""
        }

      </div>

    `;

  });

}

cargarArticulos();


// =======================
// DIAGRAMAS
// =======================

async function crearDiagrama(){

  const titulo =
  document.getElementById(
    "tituloDiagrama"
  ).value;

  const imagen =
  document.getElementById(
    "imagenDiagrama"
  ).files[0];

  const formData =
  new FormData();

  formData.append(
    "titulo",
    titulo
  );

  formData.append(
    "imagen",
    imagen
  );

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
  document.getElementById(
    "listaDiagramas"
  );

  lista.innerHTML = "";

  data.forEach((d)=>{

    lista.innerHTML += `

      <div class="card">

        <h2>${d.titulo}</h2>

        ${
          d.imagen
          ?
          `
          <img
          src="${d.imagen}"
          class="imagenCard">
          `
          :
          ""
        }

      </div>

    `;

  });

}

cargarDiagramas();


// =======================
// TUTORIALES
// =======================

async function crearTutorial(){

  const titulo =
  document.getElementById(
    "tituloTutorial"
  ).value;

  const link =
  document.getElementById(
    "linkTutorial"
  ).value;

  await fetch("/tutoriales",{

    method:"POST",

    headers:{
      "Content-Type":
      "application/json"
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
  document.getElementById(
    "listaTutoriales"
  );

  lista.innerHTML = "";

  data.forEach((t)=>{

    lista.innerHTML += `

      <div class="card">

        <h2>${t.titulo}</h2>

        <a
        href="${t.link}"
        target="_blank">

        🎥 Ver Tutorial

        </a>

      </div>

    `;

  });

}

cargarTutoriales();
