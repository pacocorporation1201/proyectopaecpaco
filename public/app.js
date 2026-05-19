// =======================
// NAVEGACIÓN
// =======================

function mostrarSeccion(idSeccion) {
  // Ocultar todas las secciones
  const secciones = document.querySelectorAll('.seccion');
  secciones.forEach(sec => {
    sec.classList.remove('activa');
    sec.style.display = 'none'; // Aseguramos que se oculten
  });

  // Mostrar la sección seleccionada
  const seccionActiva = document.getElementById(idSeccion);
  if (seccionActiva) {
    seccionActiva.classList.add('activa');
    seccionActiva.style.display = 'block';
  }
}

// =======================
// LOGIN Y SEGURIDAD
// =======================

function mostrarLogin() {
  document.getElementById('login').classList.remove('oculto');
  document.getElementById('login').style.display = 'flex';
}

function cerrarLogin() {
  document.getElementById('login').classList.add('oculto');
  document.getElementById('login').style.display = 'none';
}

function entrar() {
  const rol = document.getElementById('tipoUsuario').value;
  const pass = document.getElementById('password').value;

  if (pass.trim() === "") {
    alert("Por favor, ingresa una contraseña.");
    return;
  }

  // Lógica simple de roles (solo para prototipo)
  if (rol === 'admin') {
    document.getElementById('btnPanel').classList.remove('oculto');
    document.getElementById('btnPanel').style.display = 'block';
    document.getElementById('adminPanel').classList.remove('oculto');
    document.getElementById('adminPanel').style.display = 'block';
    alert("Bienvenido, Administrador.");
  } else if (rol === 'registro') {
    document.getElementById('btnPanel').classList.remove('oculto');
    document.getElementById('btnPanel').style.display = 'block';
    document.getElementById('adminPanel').classList.add('oculto');
    document.getElementById('adminPanel').style.display = 'none';
    alert("Bienvenido, Registrador.");
  } else {
    document.getElementById('btnPanel').classList.add('oculto');
    document.getElementById('btnPanel').style.display = 'none';
    alert("Ingresaste como Visitante.");
  }
  
  cerrarLogin();
}

function cambiarColor() {
  const colores = ["#4a6fa5", "#2e8b57", "#8b0000", "#5e35b1", "#e67e22"];
  const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
  document.body.style.backgroundColor = colorAleatorio;
}

// =======================
// FUNCIONES DE CREACIÓN (Con soporte de imágenes)
// =======================

// Función auxiliar para leer imágenes y convertirlas a Base64
function leerImagen(input, callback) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) { callback(e.target.result); }
    reader.readAsDataURL(input.files[0]);
  } else {
    callback(null);
  }
}

function crearRegistro() {
  const alumno = document.getElementById('alumno').value;
  const altura = document.getElementById('altura').value;
  const fecha = document.getElementById('fecha').value;
  const inputImg = document.getElementById('imagenRegistro');

  if (!alumno || !altura || !fecha) return alert("Por favor, llena todos los campos del registro.");

  leerImagen(inputImg, (imgSrc) => {
    const imgHtml = imgSrc ? `<img src="${imgSrc}" style="max-width:100%; border-radius:8px; margin-top:10px;">` : '';
    
    const html = `
      <div class="card" style="margin-bottom:15px;">
        <h3>🌱 ${alumno}</h3>
        <p><strong>Altura:</strong> ${altura} cm | <strong>Fecha:</strong> ${fecha}</p>
        ${imgHtml}
        <hr>
        <div class="listaComentarios"></div>
        <input type="text" placeholder="Escribe un comentario y presiona Enter" onkeypress="agregarComentario(event, this)">
        <button type="button" style="margin-top:10px; background:red; color:white;" onclick="this.parentElement.remove(); guardarLocal();">❌ Borrar</button>
      </div>
    `;
    
    document.getElementById('listaRegistros').insertAdjacentHTML('afterbegin', html);
    guardarLocal();
    alert("Registro creado con éxito");
  });
}

function crearArticulo() {
  const titulo = document.getElementById('tituloArticulo').value;
  const contenido = document.getElementById('contenidoArticulo').value;
  const inputImg = document.getElementById('imagenArticulo');

  if (!titulo || !contenido) return alert("Por favor, llena el título y contenido.");

  leerImagen(inputImg, (imgSrc) => {
    const imgHtml = imgSrc ? `<img src="${imgSrc}" style="max-width:100%; border-radius:8px; margin-top:10px;">` : '';
    
    const html = `
      <div class="card" style="margin-bottom:15px;">
        <h3>📰 ${titulo}</h3>
        <p>${contenido}</p>
        ${imgHtml}
        <hr>
        <div class="listaComentarios"></div>
        <input type="text" placeholder="Escribe un comentario y presiona Enter" onkeypress="agregarComentario(event, this)">
        <button type="button" style="margin-top:10px; background:red; color:white;" onclick="this.parentElement.remove(); guardarLocal();">❌ Borrar</button>
      </div>
    `;
    
    document.getElementById('listaArticulos').insertAdjacentHTML('afterbegin', html);
    guardarLocal();
    alert("Artículo publicado");
  });
}

function crearDiagrama() {
  const titulo = document.getElementById('tituloDiagrama').value;
  const inputImg = document.getElementById('imagenDiagrama');

  if (!titulo) return alert("Por favor, escribe un título.");

  leerImagen(inputImg, (imgSrc) => {
    if (!imgSrc) return alert("Debes subir una imagen para el diagrama.");

    const html = `
      <div class="card" style="margin-bottom:15px;">
        <h3>📊 ${titulo}</h3>
        <img src="${imgSrc}" style="max-width:100%; border-radius:8px; margin-top:10px;">
        <hr>
        <div class="listaComentarios"></div>
        <input type="text" placeholder="Escribe un comentario y presiona Enter" onkeypress="agregarComentario(event, this)">
        <button type="button" style="margin-top:10px; background:red; color:white;" onclick="this.parentElement.remove(); guardarLocal();">❌ Borrar</button>
      </div>
    `;
    
    document.getElementById('listaDiagramas').insertAdjacentHTML('afterbegin', html);
    guardarLocal();
    alert("Diagrama publicado");
  });
}

function crearTutorial() {
  const titulo = document.getElementById('tituloTutorial').value;
  const link = document.getElementById('linkTutorial').value;

  if (!titulo || !link) return alert("Por favor, llena el título y el enlace.");

  const html = `
    <div class="card" style="margin-bottom:15px;">
      <h3>🎥 ${titulo}</h3>
      <a href="${link}" target="_blank" style="color: blue; text-decoration: underline;">Ver video en YouTube</a>
      <hr>
      <div class="listaComentarios"></div>
      <input type="text" placeholder="Escribe un comentario y presiona Enter" onkeypress="agregarComentario(event, this)">
      <button type="button" style="margin-top:10px; background:red; color:white;" onclick="this.parentElement.remove(); guardarLocal();">❌ Borrar</button>
    </div>
  `;
  
  document.getElementById('listaTutoriales').insertAdjacentHTML('afterbegin', html);
  guardarLocal();
  alert("Tutorial publicado");
}

// =======================
// CLIMA
// =======================

async function obtenerClima() {
  try {
    const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=20.59&longitude=-100.39&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto");
    const data = await res.json();
    const actual = data.current_weather;
    const dias = data.daily;

    let html = `
      <h2>🌡 Temperatura: ${actual.temperature}°C</h2>
      <p>💨 Viento: ${actual.windspeed} km/h</p>
      <hr>
      <h3>📅 Pronóstico</h3>
    `;

    for (let i = 0; i < 5; i++) {
      html += `<p>📆 ${dias.time[i]} | 🔺 ${dias.temperature_2m_max[i]}°C | 🔻 ${dias.temperature_2m_min[i]}°C</p>`;
    }

    document.getElementById("clima").innerHTML = html;
  } catch (error) {
    console.log(error);
    document.getElementById("clima").innerHTML = "<p>No se pudo cargar el clima.</p>";
  }
}
obtenerClima();

// =======================
// LOCAL STORAGE (GUARDADO Y CARGA)
// =======================

function guardarLocal() {
  localStorage.setItem("registros", document.getElementById("listaRegistros").innerHTML);
  localStorage.setItem("articulos", document.getElementById("listaArticulos").innerHTML);
  localStorage.setItem("diagramas", document.getElementById("listaDiagramas").innerHTML);
  localStorage.setItem("tutoriales", document.getElementById("listaTutoriales").innerHTML);
}

function cargarLocal() {
  document.getElementById("listaRegistros").innerHTML = localStorage.getItem("registros") || "";
  document.getElementById("listaArticulos").innerHTML = localStorage.getItem("articulos") || "";
  document.getElementById("listaDiagramas").innerHTML = localStorage.getItem("diagramas") || "";
  document.getElementById("listaTutoriales").innerHTML = localStorage.getItem("tutoriales") || "";
}
cargarLocal();

// =======================
// COMENTARIOS
// =======================

function agregarComentario(event, input) {
  if (event.key === "Enter") {
    const texto = input.value;
    if(texto.trim() === "") return;

    const lista = input.parentElement.querySelector(".listaComentarios");
    lista.innerHTML += `
      <div class="comentario" style="background:#f4f4f4; padding:5px; border-radius:5px; margin-bottom:5px;">
        👤 ${texto}
        <button type="button" style="float:right; border:none; background:none; cursor:pointer;" onclick="this.parentElement.remove(); guardarLocal()">❌</button>
      </div>
    `;
    input.value = "";
    guardarLocal();
  }
}

// =======================
// MANTENIMIENTO
// =======================

let mantenimiento = {
  registros: false,
  articulos: false,
  diagramas: false,
  tutoriales: false
};

function modoMantenimiento() {
  const seccion = prompt("¿Qué sección deseas poner en mantenimiento?\n(registros, articulos, diagramas, tutoriales)");
  
  if (!seccion || !mantenimiento.hasOwnProperty(seccion)) {
    alert("Sección inválida o cancelado");
    return;
  }
  
  mantenimiento[seccion] = !mantenimiento[seccion];
  actualizarMantenimiento();
}

function actualizarMantenimiento() {
  for (let sec in mantenimiento) {
    const estadoId = "estado" + sec.charAt(0).toUpperCase() + sec.slice(1);
    const estadoDiv = document.getElementById(estadoId);
    
    if(estadoDiv){
      if (mantenimiento[sec]) {
        estadoDiv.innerHTML = `<div class="card" style="background:#ffcc00; color:black;">🚧 Sección en mantenimiento</div>`;
      } else {
        estadoDiv.innerHTML = "";
      }
    }
  }
}

// Inicializar ocultando secciones y mostrando el inicio por defecto
window.onload = () => {
    mostrarSeccion('inicio');
    cerrarLogin();
};