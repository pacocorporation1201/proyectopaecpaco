let usuarioActual = "visitante";

let mantenimiento = {
  registros:false,
  articulos:false,
  diagramas:false,
  tutoriales:false
};

// CARGAR DATOS AL INICIAR
window.onload = function(){

  cargarDatos();

}

// GUARDAR EN LOCALSTORAGE
function guardarDatos(){

  localStorage.setItem(
    "registros",
    document.getElementById("listaRegistros").innerHTML
  );

  localStorage.setItem(
    "articulos",
    document.getElementById("listaArticulos").innerHTML
  );

  localStorage.setItem(
    "diagramas",
    document.getElementById("listaDiagramas").innerHTML
  );

  localStorage.setItem(
    "tutoriales",
    document.getElementById("listaTutoriales").innerHTML
  );

  localStorage.setItem(
    "mantenimiento",
    JSON.stringify(mantenimiento)
  );
}

// CARGAR DATOS
function cargarDatos(){

  document.getElementById("listaRegistros").innerHTML =
  localStorage.getItem("registros") || "";

  document.getElementById("listaArticulos").innerHTML =
  localStorage.getItem("articulos") || "";

  document.getElementById("listaDiagramas").innerHTML =
  localStorage.getItem("diagramas") || "";

  document.getElementById("listaTutoriales").innerHTML =
  localStorage.getItem("tutoriales") || "";

  const datosMantenimiento =
  localStorage.getItem("mantenimiento");

  if(datosMantenimiento){

    mantenimiento =
    JSON.parse(datosMantenimiento);

    actualizarMantenimiento();
  }
}

// MOSTRAR SECCIONES
function mostrarSeccion(id){

  const secciones =
  document.querySelectorAll(".seccion");

  secciones.forEach(sec => {

    sec.classList.remove("activa");

  });

  document
  .getElementById(id)
  .classList.add("activa");
}

// LOGIN
function mostrarLogin(){

  document
  .getElementById("login")
  .classList.remove("oculto");
}

// CERRAR LOGIN
function cerrarLogin(){

  document
  .getElementById("login")
  .classList.add("oculto");
}

// ENTRAR
function entrar(){

  const tipo =
  document.getElementById("tipoUsuario").value;

  const pass =
  document.getElementById("password").value;

  // VISITANTE
  if(tipo === "visitante"){

    usuarioActual = "visitante";

    cerrarLogin();

    return;
  }

  // REGISTRADOR
  if(tipo === "registro"){

    if(pass === "lavanda123"){

      usuarioActual = "registro";

      document
      .getElementById("btnPanel")
      .classList.remove("oculto");

      mostrarSeccion("panelRegistro");

      cerrarLogin();

    }else{

      alert("Contraseña incorrecta");
    }

  }

  // ADMIN
  if(tipo === "admin"){

    if(pass === "admin123"){

      usuarioActual = "admin";

      document
      .getElementById("btnPanel")
      .classList.remove("oculto");

      document
      .getElementById("adminPanel")
      .classList.remove("oculto");

      mostrarSeccion("panelRegistro");

      cerrarLogin();

    }else{

      alert("Contraseña incorrecta");
    }

  }

}

// CREAR REGISTRO
function crearRegistro(){

  if(mantenimiento.registros){

    alert("Sección en mantenimiento");
    return;
  }

  const alumno =
  document.getElementById("alumno").value;

  const altura =
  document.getElementById("altura").value;

  const fecha =
  document.getElementById("fecha").value;

  const imagen =
  document.getElementById("imagenRegistro").files[0];

  const lector = new FileReader();

  lector.onload = function(e){

    const html = `

      <div class="card">

        <h2>${alumno}</h2>

        <p>🌱 Altura: ${altura} cm</p>

        <p>📅 Fecha: ${fecha}</p>

        <img src="${e.target.result}">

        ${
        usuarioActual === "admin"
        ? `<button onclick="eliminarPublicacion(this)">
        🗑 Eliminar
        </button>`
        : ""
        }

        <div class="comentarios">

          <input
          type="text"
          placeholder="Comentario"
          onkeypress="agregarComentario(event,this)">

          <div class="listaComentarios"></div>

        </div>

      </div>

    `;

    document
    .getElementById("listaRegistros")
    .innerHTML += html;

    guardarDatos();
  }

  if(imagen){

    lector.readAsDataURL(imagen);
  }

}

// CREAR ARTICULO
function crearArticulo(){

  if(mantenimiento.articulos){

    alert("Sección en mantenimiento");
    return;
  }

  const titulo =
  document.getElementById("tituloArticulo").value;

  const contenido =
  document.getElementById("contenidoArticulo").value;

  const imagen =
  document.getElementById("imagenArticulo").files[0];

  const lector = new FileReader();

  lector.onload = function(e){

    const html = `

      <div class="card">

        <h2>${titulo}</h2>

        <p>${contenido}</p>

        <img src="${e.target.result}">

        ${
        usuarioActual === "admin"
        ? `<button onclick="eliminarPublicacion(this)">
        🗑 Eliminar
        </button>`
        : ""
        }

        <div class="comentarios">

          <input
          type="text"
          placeholder="Comentario"
          onkeypress="agregarComentario(event,this)">

          <div class="listaComentarios"></div>

        </div>

      </div>

    `;

    document
    .getElementById("listaArticulos")
    .innerHTML += html;

    guardarDatos();
  }

  if(imagen){

    lector.readAsDataURL(imagen);
  }

}

// CREAR DIAGRAMA
function crearDiagrama(){

  if(mantenimiento.diagramas){

    alert("Sección en mantenimiento");
    return;
  }

  const titulo =
  document.getElementById("tituloDiagrama").value;

  const imagen =
  document.getElementById("imagenDiagrama").files[0];

  const lector = new FileReader();

  lector.onload = function(e){

    const html = `

      <div class="card">

        <h2>${titulo}</h2>

        <img src="${e.target.result}">

        ${
        usuarioActual === "admin"
        ? `<button onclick="eliminarPublicacion(this)">
        🗑 Eliminar
        </button>`
        : ""
        }

        <div class="comentarios">

          <input
          type="text"
          placeholder="Comentario"
          onkeypress="agregarComentario(event,this)">

          <div class="listaComentarios"></div>

        </div>

      </div>

    `;

    document
    .getElementById("listaDiagramas")
    .innerHTML += html;

    guardarDatos();
  }

  if(imagen){

    lector.readAsDataURL(imagen);
  }

}

// CREAR TUTORIAL
function crearTutorial(){

  if(mantenimiento.tutoriales){

    alert("Sección en mantenimiento");
    return;
  }

  const titulo =
  document.getElementById("tituloTutorial").value;

  const link =
  document.getElementById("linkTutorial").value;

  const html = `

    <div class="card">

      <h2>${titulo}</h2>

      <a href="${link}" target="_blank">
      Ver Tutorial
      </a>

      ${
      usuarioActual === "admin"
      ? `<button onclick="eliminarPublicacion(this)">
      🗑 Eliminar
      </button>`
      : ""
      }

      <div class="comentarios">

        <input
        type="text"
        placeholder="Comentario"
        onkeypress="agregarComentario(event,this)">

        <div class="listaComentarios"></div>

      </div>

    </div>

  `;

  document
  .getElementById("listaTutoriales")
  .innerHTML += html;

  guardarDatos();
}

// AGREGAR COMENTARIO
function agregarComentario(event,input){

  if(event.key === "Enter"){

    const texto = input.value;

    const lista =
    input.parentElement
    .querySelector(".listaComentarios");

    lista.innerHTML += `

      <div class="comentario">

        👤 ${texto}

        ${
        usuarioActual === "admin"
        ? `<button onclick="eliminarComentario(this)">
        ❌
        </button>`
        : ""
        }

      </div>

    `;

    input.value = "";

    guardarDatos();
  }

}

// ELIMINAR COMENTARIO
function eliminarComentario(btn){

  btn.parentElement.remove();

  guardarDatos();
}

// ELIMINAR PUBLICACION
function eliminarPublicacion(btn){

  btn.parentElement.remove();

  guardarDatos();
}

// CAMBIAR COLOR
function cambiarColor(){

  const color =
  prompt("Escribe un color");

  document.body.style.background = color;
}

// ACTIVAR/DESACTIVAR MANTENIMIENTO
function modoMantenimiento(){

  const seccion =
  prompt(
`Escribe:

registros
articulos
diagramas
tutoriales`
  );

  if(!mantenimiento.hasOwnProperty(seccion)){

    alert("Sección inválida");
    return;
  }

  mantenimiento[seccion] =
  !mantenimiento[seccion];

  actualizarMantenimiento();

  guardarDatos();
}

// ACTUALIZAR MANTENIMIENTO
function actualizarMantenimiento(){

  for(let seccion in mantenimiento){

    const contenedor = document
    .getElementById(
      "lista" +
      seccion.charAt(0).toUpperCase() +
      seccion.slice(1)
    );

    if(!contenedor) continue;

    if(mantenimiento[seccion]){

      contenedor.innerHTML = `

        <div class="card">

          <h1>🚧 En mantenimiento</h1>

        </div>

      `;
    }
  }
}