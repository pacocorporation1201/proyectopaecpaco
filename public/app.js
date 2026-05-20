// Variable global para controlar los permisos en tiempo real
let rolActual = "visitante";

// =======================
// NAVEGACIÓN
// =======================
function mostrarSeccion(idSeccion) {
  const secciones = document.querySelectorAll('.seccion');
  secciones.forEach(sec => {
    sec.classList.remove('activa');
    sec.style.display = 'none';
  });

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

  if (pass.trim() === "") return alert("Por favor, ingresa una contraseña.");

  rolActual = rol;
  const zonaSubida = document.getElementById('zonaAdminSubida');

  if (rolActual === 'admin') {
    document.body.classList.add('es-admin');
    document.getElementById('btnPanel').classList.remove('oculto');
    document.getElementById('btnPanel').style.display = 'block';
    document.getElementById('adminPanel').classList.remove('oculto');
    document.getElementById('adminPanel').style.display = 'block';
    
    zonaSubida.classList.remove('oculto');
    zonaSubida.style.display = 'flex';

    alert("Bienvenido, Administrador. Permisos totales activados.");
  } else if (rolActual === 'registro') {
    document.body.classList.remove('es-admin');
    document.getElementById('btnPanel').classList.remove('oculto');
    document.getElementById('btnPanel').style.display = 'block';
    document.getElementById('adminPanel').classList.add('oculto');
    document.getElementById('adminPanel').style.display = 'none';
    
    zonaSubida.classList.add('oculto');
    zonaSubida.style.display = 'none';

    alert("Bienvenido, Registrador. Puedes crear contenido pero no borrar ni subir archivos.");
  } else {
    document.body.classList.remove('es-admin');
    document.getElementById('btnPanel').classList.add('oculto');
    document.getElementById('btnPanel').style.display = 'none';
    
    zonaSubida.classList.add('oculto');
    zonaSubida.style.display = 'none';

    alert("Ingresaste como Visitante. Modo lectura.");
  }
  
  cerrarLogin();
}

function cambiarColor() {
  const colores = ["#eef7f1", "#e0f2f1", "#f1f8e9", "#fff3e0", "#fce4ec"];
  document.body.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
}

// =======================
// FUNCIONES DE CREACIÓN 
// =======================
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

  if (!alumno || !altura || !fecha) return alert("Llena todos los campos del registro.");

  leerImagen(inputImg, (imgSrc) => {
    const imgHtml = imgSrc ? `<img src="${imgSrc}" style="max-width:100%; border-radius:10px; margin-top:10px;">` : '';
    const html = `
      <div class="card">
        <h3>🌱 ${alumno}</h3>
        <p><strong>Altura:</strong> ${altura} cm | <strong>Fecha:</strong> ${fecha}</p>
        ${imgHtml}
        <hr style="margin:15px 0; border:0; border-top:1px solid #eee;">
        <div class="listaComentarios"></div>
        <input type="text" placeholder="Escribe un comentario y presiona Enter" onkeypress="agregarComentario(event, this)">
        <button type="button" class="btn-borrar solo-admin" onclick="this.parentElement.remove(); guardarLocal();">❌ Borrar Registro</button>
      </div>
    `;
    
    document.getElementById('listaRegistros').insertAdjacentHTML('afterbegin', html);
    guardarLocal();
    alert("Registro creado con éxito");
    document.getElementById('alumno').value = "";
    document.getElementById('altura').value = "";
    document.getElementById('imagenRegistro').value = "";
  });
}

function crearArticulo() {
  const titulo = document.getElementById('tituloArticulo').value;
  const contenido = document.getElementById('contenidoArticulo').value;
  const inputImg = document.getElementById('imagenArticulo');

  if (!titulo || !contenido) return alert("Llena el título y contenido.");

  leerImagen(inputImg, (imgSrc) => {
    const imgHtml = imgSrc ? `<img src="${imgSrc}" style="max-width:100%; border-radius:10px; margin-top:10px;">` : '';
    const html = `
      <div class="card">
        <h3>📰 ${titulo}</h3>
        <p>${contenido}</p>
        ${imgHtml}
        <hr style="margin:15px 0; border:0; border-top:1px solid #eee;">
        <div class="listaComentarios"></div>
        <input type="text" placeholder="Escribe un comentario y presiona Enter" onkeypress="agregarComentario(event, this)">
        <button type="button" class="btn-borrar solo-admin" onclick="this.parentElement.remove(); guardarLocal();">❌ Borrar Artículo</button>
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

  if (!titulo) return alert("Escribe un título.");

  leerImagen(inputImg, (imgSrc) => {
    if (!imgSrc) return alert("Sube una imagen para el diagrama.");
    const html = `
      <div class="card">
        <h3>📊 ${titulo}</h3>
        <img src="${imgSrc}" style="max-width:100%; border-radius:10px; margin-top:10px;">
        <hr style="margin:15px 0; border:0; border-top:1px solid #eee;">
        <div class="listaComentarios"></div>
        <input type="text" placeholder="Escribe un comentario y presiona Enter" onkeypress="agregarComentario(event, this)">
        <button type="button" class="btn-borrar solo-admin" onclick="this.parentElement.remove(); guardarLocal();">❌ Borrar Diagrama</button>
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

  if (!titulo || !link) return alert("Llena el título y el enlace.");
  const html = `
    <div class="card">
      <h3>🎥 ${titulo}</h3>
      <a href="${link}" target="_blank" style="color: #27ae60; text-decoration: underline; font-weight:bold;">Ver video en YouTube</a>
      <hr style="margin:15px 0; border:0; border-top:1px solid #eee;">
      <div class="listaComentarios"></div>
      <input type="text" placeholder="Escribe un comentario y presiona Enter" onkeypress="agregarComentario(event, this)">
      <button type="button" class="btn-borrar solo-admin" onclick="this.parentElement.remove(); guardarLocal();">❌ Borrar Tutorial</button>
    </div>
  `;
  document.getElementById('listaTutoriales').insertAdjacentHTML('afterbegin', html);
  guardarLocal();
  alert("Tutorial publicado");
}

// =======================
// COMENTARIOS
// =======================
function agregarComentario(event, input) {
  if (event.key === "Enter") {
    const texto = input.value;
    if(texto.trim() === "") return;

    const lista = input.parentElement.querySelector(".listaComentarios");
    lista.innerHTML += `
      <div style="background:#f4f9f4; padding:8px; border-radius:5px; margin-bottom:8px; border:1px solid #e2e8f0;">
        👤 ${texto}
        <button type="button" class="solo-admin" style="float:right; border:none; background:none; cursor:pointer; color:red;" onclick="this.parentElement.remove(); guardarLocal()">❌</button>
      </div>
    `;
    input.value = "";
    guardarLocal();
  }
}

// =======================
// IMPORTAR ARCHIVOS (EXCEL / PDF / WORD) - SOLO ADMIN
// =======================
function procesarArchivoAdmin(event) {
  if (rolActual !== 'admin') {
    alert("Acceso denegado. Solo el administrador puede subir archivos.");
    event.target.value = '';
    return;
  }

  const archivo = event.target.files[0];
  if (!archivo) return;

  const nombreArchivo = archivo.name;
  const extension = nombreArchivo.split('.').pop().toLowerCase();

  if (extension === 'csv') {
    const lector = new FileReader();
    lector.onload = function(e) {
      const contenido = e.target.result;
      const lineas = contenido.split('\n'); 
      let nuevosRegistros = "";

      for (let i = 1; i < lineas.length; i++) {
        const columnas = lineas[i].split(',');
        if (columnas.length < 3 || columnas[0].trim() === "") continue;

        const nombre = columnas[0].trim();
        const altura = columnas[1].trim();
        const fecha = columnas[2].trim();

        nuevosRegistros += `
          <div class="card">
            <h3>🌱 ${nombre}</h3>
            <p><strong>Altura:</strong> ${altura} cm | <strong>Fecha:</strong> ${fecha}</p>
            <hr style="margin:15px 0; border:0; border-top:1px solid #eee;">
            <div class="listaComentarios"></div>
            <input type="text" placeholder="Escribe un comentario y presiona Enter" onkeypress="agregarComentario(event, this)">
            <button type="button" class="btn-borrar solo-admin" onclick="this.parentElement.remove(); guardarLocal();">❌ Borrar Registro</button>
          </div>
        `;
      }
      document.getElementById('listaRegistros').insertAdjacentHTML('afterbegin', nuevosRegistros);
      guardarLocal();
      alert("¡Datos del Excel cargados con éxito!");
    };
    lector.readAsText(archivo);

  } else if (extension === 'pdf' || extension === 'doc' || extension === 'docx') {
    const lector = new FileReader();
    lector.onload = function(e) {
      const icono = extension === 'pdf' ? '📕 PDF' : '📘 WORD';
      const fechaHoy = new Date().toISOString().split('T')[0];

      const htmlDocumento = `
        <div class="card" style="border-left: 5px solid #27ae60;">
          <h3>${icono}: ${nombreArchivo}</h3>
          <p><strong>Subido por:</strong> Administrador | <strong>Fecha de carga:</strong> ${fechaHoy}</p>
          <p style="color: #7f8c8d; font-size: 14px;">📄 Documento oficial adjunto al sistema.</p>
          <hr style="margin:15px 0; border:0; border-top:1px solid #eee;">
          <div class="listaComentarios"></div>
          <input type="text" placeholder="Escribe un comentario y presiona Enter" onkeypress="agregarComentario(event, this)">
          <button type="button" class="btn-borrar solo-admin" onclick="this.parentElement.remove(); guardarLocal();">❌ Borrar Documento</button>
        </div>
      `;
      document.getElementById('listaRegistros').insertAdjacentHTML('afterbegin', htmlDocumento);
      guardarLocal();
      alert(`¡Documento ${extension.toUpperCase()} enlazado exitosamente!`);
    };
    lector.readAsDataURL(archivo);
  } else {
    alert("Formato no soportado. Por favor sube archivos Excel (CSV), PDF o Word.");
  }
  event.target.value = '';
}

// =======================
// EXPORTAR EXCEL
// =======================
function descargarExcel() {
  const tarjetas = document.querySelectorAll('#listaRegistros .card');
  if (tarjetas.length === 0) return alert("No hay registros para descargar.");

  let csv = "Nombre,Altura (cm),Fecha\n";
  tarjetas.forEach(tarjeta => {
    const titulo = tarjeta.querySelector('h3').innerText;
    // Evitar exportar los PDF/Word al excel
    if(titulo.includes('PDF') || titulo.includes('WORD')) return;

    const nombre = titulo.replace('🌱 ', '');
    const detalles = tarjeta.querySelector('p').innerText;
    const alturaMatch = detalles.match(/Altura:\s*(\d+)/);
    const fechaMatch = detalles.match(/Fecha:\s*([\d-]+)/);
    const altura = alturaMatch ? alturaMatch[1] : 'N/A';
    const fecha = fechaMatch ? fechaMatch[1] : 'N/A';
    csv += `${nombre},${altura},${fecha}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "Registros_Lavanda.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// =======================
// CLIMA, LOCAL STORAGE Y MANTENIMIENTO
// =======================
async function obtenerClima() {
  try {
    const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=20.59&longitude=-100.39&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto");
    const data = await res.json();
    const actual = data.current_weather;
    const dias = data.daily;
    let html = `
      <h2>🌡 Temperatura actual: ${actual.temperature}°C</h2>
      <p>💨 Viento: ${actual.windspeed} km/h</p>
      <hr style="margin:15px 0; border:0; border-top:1px solid rgba(255,255,255,0.3);">
      <h3>📅 Pronóstico</h3>
    `;
    for (let i = 0; i < 5; i++) {
      html += `<p style="margin-top:8px;">📆 ${dias.time[i]} | 🔺 Max: ${dias.temperature_2m_max[i]}°C | 🔻 Min: ${dias.temperature_2m_min[i]}°C</p>`;
    }
    document.getElementById("clima").innerHTML = html;
  } catch (error) {
    document.getElementById("clima").innerHTML = "<p>No se pudo cargar el clima.</p>";
  }
}
obtenerClima();

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

let mantenimiento = { registros: false, articulos: false, diagramas: false, tutoriales: false };

function modoMantenimiento() {
  const seccion = prompt("¿Qué sección deseas poner en mantenimiento?\n(registros, articulos, diagramas, tutoriales)");
  if (!seccion || !mantenimiento.hasOwnProperty(seccion)) return alert("Sección inválida o cancelado");
  mantenimiento[seccion] = !mantenimiento[seccion];
  actualizarMantenimiento();
}

function actualizarMantenimiento() {
  for (let sec in mantenimiento) {
    const estadoDiv = document.getElementById("estado" + sec.charAt(0).toUpperCase() + sec.slice(1));
    if(estadoDiv){
      if (mantenimiento[sec]) {
        estadoDiv.innerHTML = `<div class="card" style="background:#ffcc00; color:black; text-align:center;"><h2>🚧 Sección en mantenimiento</h2></div>`;
      } else {
        estadoDiv.innerHTML = "";
      }
    }
  }
}

window.onload = () => {
    mostrarSeccion('inicio');
    cerrarLogin();
};