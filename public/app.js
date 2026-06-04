// =======================
// ESTADO GLOBAL
// =======================

let esAdmin = false;
let esRegistrador = false;

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

  cargarClima();
  cargarRegistros();
  cargarArticulos();
  cargarProductos();
  cargarDiagramas();
  cargarTutoriales();
  verificarExcelDisponible();
  cargarLogo();
  cargarRedesInicio();
  

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

    esAdmin = false;
    esRegistrador = true;

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

    esAdmin = true;
    esRegistrador = true;

    document
    .getElementById("btnPanel")
    .classList.remove("oculto");

    document
    .getElementById("adminPanel")
    .classList.remove("oculto");

    // Mostrar botón de descarga Excel solo para admin
    document
    .getElementById("btnExcelAdmin")
    .classList.remove("oculto");

    cerrarLogin();

    mostrarSeccion("panelRegistro");

    // Recargar todo para que aparezcan botones de borrar
    cargarRegistros();
    cargarArticulos();
    cargarProductos();
    cargarDiagramas();
    cargarTutoriales();
    cargarRedesInicio();

    return;

  }

  alert("Contraseña incorrecta");

}


// =======================
// CLIMA - DOLORES HIDALGO
// Open-Meteo (sin API key)
// Lat: 21.1567, Lon: -100.9328
// =======================

async function cargarClima(){

  const lat = 21.1567;
  const lon = -100.9328;

  try{

    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature` +
      `&timezone=America%2FMexico_City&forecast_days=1`;

    const res = await fetch(url);
    const data = await res.json();

    const c = data.current;

    const desc = interpretarClima(c.weather_code);

    document.getElementById("clima").innerHTML = `
      <div class="clima-grid">
        <div class="clima-item">
          <span class="clima-icono">${desc.icono}</span>
          <span class="clima-valor">${c.temperature_2m}°C</span>
          <span class="clima-label">${desc.texto}</span>
        </div>
        <div class="clima-item">
          <span class="clima-icono">🌡️</span>
          <span class="clima-valor">${c.apparent_temperature}°C</span>
          <span class="clima-label">Sensación térmica</span>
        </div>
        <div class="clima-item">
          <span class="clima-icono">💧</span>
          <span class="clima-valor">${c.relative_humidity_2m}%</span>
          <span class="clima-label">Humedad</span>
        </div>
        <div class="clima-item">
          <span class="clima-icono">💨</span>
          <span class="clima-valor">${c.wind_speed_10m} km/h</span>
          <span class="clima-label">Viento</span>
        </div>
      </div>
      <p style="margin-top:12px; font-size:13px; opacity:0.7;">
        📍 Dolores Hidalgo, Gto. • Actualizado ahora
      </p>
    `;

  }catch(err){

    document.getElementById("clima").innerHTML =
      "<p>No se pudo cargar el clima. Intenta más tarde.</p>";

  }

}

function interpretarClima(code){

  if(code === 0) return { icono:"☀️", texto:"Cielo despejado" };
  if(code <= 2)  return { icono:"🌤️", texto:"Parcialmente nublado" };
  if(code === 3) return { icono:"☁️", texto:"Nublado" };
  if(code <= 49) return { icono:"🌫️", texto:"Niebla" };
  if(code <= 59) return { icono:"🌦️", texto:"Llovizna" };
  if(code <= 69) return { icono:"🌧️", texto:"Lluvia" };
  if(code <= 79) return { icono:"❄️", texto:"Nieve" };
  if(code <= 84) return { icono:"🌧️", texto:"Lluvia moderada" };
  if(code <= 99) return { icono:"⛈️", texto:"Tormenta" };
  return { icono:"🌈", texto:"Variable" };

}


// =======================
// REGISTROS
// =======================

async function crearRegistro(){

  try{

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

    const res =
    await fetch("/registros",{
      method:"POST",
      body:formData
    });

    console.log("STATUS:", res.status);

    const texto =
    await res.text();

    console.log("RESPUESTA:", texto);

    cargarRegistros();

  }catch(error){

    console.error("ERROR:", error);

  }

}
async function cargarRegistros(){

  const res =
  await fetch("/registros");

  const data =
  await res.json();

  const lista =
  document.getElementById("listaRegistros");

  lista.innerHTML = "";

  for(const r of data){

    const comentariosHTML =
    await obtenerComentariosHTML("registro", r._id);

    const btnBorrar = esAdmin
      ? `<button type="button" class="btn-borrar"
           onclick="borrarPublicacion('registros','${r._id}',cargarRegistros)">
           🗑️ Borrar registro
         </button>`
      : "";

    lista.innerHTML += `
      <div class="card">

        <h2>${r.alumno}</h2>

        <p>🌱 ${r.altura} cm</p>

        <p>📅 ${r.fecha}</p>

        ${r.imagen
          ? `<img src="${r.imagen}" class="imagenCard">`
          : ""
        }

        ${btnBorrar}

        <div class="seccion-comentarios">

          ${comentariosHTML}

          <div class="form-comentario">

            <input
              type="text"
              placeholder="Tu nombre"
              id="autor-registro-${r._id}">

            <textarea
              placeholder="Comentario"
              id="texto-registro-${r._id}">
            </textarea>

            <button
              type="button"
              onclick="enviarComentario('registro','${r._id}',cargarRegistros)">
              💬 Comentar
            </button>

          </div>

        </div>

      </div>
    `;

  }

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

  for(const a of data){

    const comentariosHTML =
    await obtenerComentariosHTML("articulo", a._id);

    const btnBorrar = esAdmin
      ? `<button type="button" class="btn-borrar" style="margin-top:10px;"
           onclick="borrarPublicacion('articulos','${a._id}', cargarArticulos)">
           🗑️ Borrar artículo
         </button>`
      : "";

    lista.innerHTML += `
      <div class="card" id="item-articulo-${a._id}">
        <h2>${a.titulo}</h2>
        <p>${a.contenido}</p>
        ${a.imagen ? `<img src="${a.imagen}" class="imagenCard">` : ""}
        ${btnBorrar}
        <div class="seccion-comentarios">
          ${comentariosHTML}
          <div class="form-comentario">
            <input type="text" placeholder="Tu nombre" id="autor-articulo-${a._id}">
            <textarea placeholder="Escribe un comentario..." id="texto-articulo-${a._id}" rows="2"></textarea>
            <button type="button" onclick="enviarComentario('articulo','${a._id}', cargarArticulos)">💬 Comentar</button>
          </div>
        </div>
      </div>
    `;

  }

}
// =======================
// PRODUCTOS
// =======================

async function crearProducto(){

  const nombre =
  document.getElementById("nombreProducto").value;

  const descripcion =
  document.getElementById("descripcionProducto").value;

  const precio =
  document.getElementById("precioProducto").value;

  const imagen =
  document.getElementById("imagenProducto").files[0];

  const formData =
  new FormData();

  formData.append("nombre", nombre);
  formData.append("descripcion", descripcion);
  formData.append("precio", precio);

  if(imagen){

    formData.append("imagen", imagen);

  }

  await fetch("/productos",{

    method:"POST",
    body:formData

  });

  cargarProductos();

}
async function cargarProductos(){

  const res =
  await fetch("/productos");

  const data =
  await res.json();

  const lista =
  document.getElementById("listaProductos");

  if(!lista) return;

  lista.innerHTML = "";

  for(const p of data){

    const comentariosHTML =
    await obtenerComentariosHTML(
      "producto",
      p._id
    );

    const btnBorrar = esAdmin
      ? `<button
           type="button"
           class="btn-borrar"
           onclick="borrarPublicacion('productos','${p._id}',cargarProductos)">
           🗑️ Borrar producto
         </button>`
      : "";

    lista.innerHTML += `
      <div class="card">

        <h2>${p.nombre}</h2>

        <p>${p.descripcion}</p>

        <p><strong>💲${p.precio}</strong></p>

        ${p.imagen
          ? `<img src="${p.imagen}" class="imagenCard">`
          : ""
        }

        ${btnBorrar}

        <div class="seccion-comentarios">

          ${comentariosHTML}

          <div class="form-comentario">

            <input
              type="text"
              placeholder="Tu nombre"
              id="autor-producto-${p._id}">

            <textarea
              placeholder="Comentario"
              id="texto-producto-${p._id}">
            </textarea>

            <button
              type="button"
              onclick="enviarComentario('producto','${p._id}',cargarProductos)">
              💬 Comentar
            </button>

          </div>

        </div>

      </div>
    `;

  }

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

  for(const d of data){

    const comentariosHTML =
    await obtenerComentariosHTML("diagrama", d._id);

    const btnBorrar = esAdmin
      ? `<button type="button" class="btn-borrar" style="margin-top:10px;"
           onclick="borrarPublicacion('diagramas','${d._id}', cargarDiagramas)">
           🗑️ Borrar diagrama
         </button>`
      : "";

    lista.innerHTML += `
      <div class="card" id="item-diagrama-${d._id}">
        <h2>${d.titulo}</h2>
        ${d.imagen ? `<img src="${d.imagen}" class="imagenCard">` : ""}
        ${btnBorrar}
        <div class="seccion-comentarios">
          ${comentariosHTML}
          <div class="form-comentario">
            <input type="text" placeholder="Tu nombre" id="autor-diagrama-${d._id}">
            <textarea placeholder="Escribe un comentario..." id="texto-diagrama-${d._id}" rows="2"></textarea>
            <button type="button" onclick="enviarComentario('diagrama','${d._id}', cargarDiagramas)">💬 Comentar</button>
          </div>
        </div>
      </div>
    `;

  }

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

  for(const t of data){

    const comentariosHTML =
    await obtenerComentariosHTML("tutorial", t._id);

    const btnBorrar = esAdmin
      ? `<button type="button" class="btn-borrar" style="margin-top:10px;"
           onclick="borrarPublicacion('tutoriales','${t._id}', cargarTutoriales)">
           🗑️ Borrar tutorial
         </button>`
      : "";

    lista.innerHTML += `
      <div class="card" id="item-tutorial-${t._id}">
        <h2>${t.titulo}</h2>
        <a href="${t.link}" target="_blank">🎥 Ver Tutorial</a>
        ${btnBorrar}
        <div class="seccion-comentarios">
          ${comentariosHTML}
          <div class="form-comentario">
            <input type="text" placeholder="Tu nombre" id="autor-tutorial-${t._id}">
            <textarea placeholder="Escribe un comentario..." id="texto-tutorial-${t._id}" rows="2"></textarea>
            <button type="button" onclick="enviarComentario('tutorial','${t._id}', cargarTutoriales)">💬 Comentar</button>
          </div>
        </div>
      </div>
    `;

  }

}


// =======================
// COMENTARIOS
// =======================

async function obtenerComentariosHTML(seccion, referenciaId){

  const res =
  await fetch(`/comentarios?seccion=${seccion}&referenciaId=${referenciaId}`);

  const data = await res.json();

  if(data.length === 0){
    return `<p class="sin-comentarios">Sin comentarios aún.</p>`;
  }

  return data.map(c => `
    <div class="comentario" id="cmt-${c._id}">
      <div class="comentario-header">
        <strong>👤 ${c.autor}</strong>
        <span class="comentario-fecha">${new Date(c.fecha).toLocaleDateString("es-MX")}</span>
        ${esAdmin
          ? `<button type="button" class="btn-borrar-cmt" onclick="borrarComentario('${c._id}', '${seccion}', '${referenciaId}')">🗑️</button>`
          : ""
        }
      </div>
      <p class="comentario-texto">${c.texto}</p>
    </div>
  `).join("");

}

async function enviarComentario(seccion, referenciaId, recargarFn){

  const autorEl =
  document.getElementById(`autor-${seccion}-${referenciaId}`);

  const textoEl =
  document.getElementById(`texto-${seccion}-${referenciaId}`);

  const autor = autorEl ? autorEl.value.trim() : "";
  const texto = textoEl ? textoEl.value.trim() : "";

  if(!autor || !texto){
    alert("Escribe tu nombre y un comentario.");
    return;
  }

  await fetch("/comentarios",{

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({
      seccion,
      referenciaId,
      autor,
      texto
    })

  });

  recargarFn();

}

async function borrarComentario(id, seccion, referenciaId){

  if(!confirm("¿Borrar este comentario?")) return;

  await fetch(`/comentarios/${id}`,{
    method:"DELETE"
  });

  if(seccion === "registro")  cargarRegistros();
  if(seccion === "articulo")  cargarArticulos();
  if(seccion === "diagrama")  cargarDiagramas();
  if(seccion === "tutorial")  cargarTutoriales();

}


// =======================
// EXCEL (solo descarga)
// =======================

async function descargarExcel(){

  const res   = await fetch("/registros");
  const data  = await res.json();

  if(data.length === 0){
    alert("No hay registros para descargar.");
    return;
  }

  const encabezado = "Alumno,Altura (cm),Fecha,Imagen\n";

  const filas = data.map(r =>
    `"${r.alumno}","${r.altura}","${r.fecha}","${r.imagen || ""}"`
  ).join("\n");

  const csv = "\uFEFF" + encabezado + filas;

  const blob = new Blob([csv], { type:"text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);

  const a    = document.createElement("a");
  a.href     = url;
  a.download = "registros_lavanda.csv";
  a.click();

  URL.revokeObjectURL(url);

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


// =======================
// QR
// =======================

function mostrarQR(){

  document
  .getElementById("modalQR")
  .classList.remove("oculto");

  const contenedor =
  document.getElementById("qrCanvas");

  if(contenedor.innerHTML !== "") return;

  new QRCode(contenedor, {

    text: "https://proyectopaecpaco.onrender.com/",

    width: 220,

    height: 220,

    colorDark: "#1b3a2a",

    colorLight: "#ffffff",

    correctLevel: QRCode.CorrectLevel.H

  });

}

function cerrarQR(){

  document
  .getElementById("modalQR")
  .classList.add("oculto");

}

function descargarQR(){

  const canvas =
  document.querySelector("#qrCanvas canvas");

  if(!canvas){
    alert("El QR aún no está listo.");
    return;
  }

  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "qr-lavanda.png";
  a.click();

}


// =======================
// EXCEL ADMIN
// =======================

async function subirExcel(){

  const archivo =
  document.getElementById("archivoExcelAdmin").files[0];

  if(!archivo){
    alert("Selecciona un archivo Excel o CSV primero.");
    return;
  }

  const estado =
  document.getElementById("estadoSubidaExcel");

  estado.textContent = "Subiendo...";

  const formData = new FormData();
  formData.append("archivo", archivo);

  const res = await fetch("/excel/subir",{
    method: "POST",
    body: formData
  });

  const data = await res.json();

  if(data.ok){
    estado.textContent = "✅ Archivo subido correctamente.";
    verificarExcelDisponible();
  } else {
    estado.textContent = "❌ Error al subir el archivo.";
  }

}

async function verificarExcelDisponible(){

  const res  = await fetch("/excel/info");
  const data = await res.json();

  const zona =
  document.getElementById("zonaDescargaExcel");

  if(!zona) return;

  if(data.disponible){

    zona.style.display = "block";

    document
    .getElementById("linkDescargaExcel")
    .href = data.url;

    const fecha =
    new Date(data.fecha)
    .toLocaleDateString("es-MX", {
      day:"2-digit", month:"long", year:"numeric"
    });

    document
    .getElementById("fechaExcel")
    .textContent = "Subido el " + fecha;

  } else {

    zona.style.display = "none";

  }

}


// =======================
// LOGO 1 (sidebar) — Cloudinary
// =======================

async function cargarLogo(){

  const res  = await fetch("/logo/info");
  const data = await res.json();

  const contenedor =
  document.getElementById("sidebarLogo");

  const img =
  document.getElementById("logoImg");

  if(data.disponible && contenedor && img){

    img.src = data.url;
    contenedor.style.display = "flex";

  }

  cargarLogo2();

}

async function subirLogo(){

  const archivo =
  document.getElementById("archivoLogo").files[0];

  if(!archivo){
    alert("Selecciona una imagen primero.");
    return;
  }

  const estado =
  document.getElementById("estadoLogo");

  estado.textContent = "Subiendo...";

  const formData = new FormData();
  formData.append("logo", archivo);

  const res = await fetch("/logo/subir",{
    method: "POST",
    body: formData
  });

  const data = await res.json();

  if(data.ok){
    estado.textContent = "✅ Logo actualizado.";
    cargarLogo();
  } else {
    estado.textContent = "❌ Error al subir el logo.";
  }

}


// =======================
// LOGO 2 (superior derecho) — Cloudinary
// =======================

async function cargarLogo2(){

  const res  = await fetch("/logo2/info");
  const data = await res.json();

  const contenedor = document.getElementById("segundoLogoHeader");
  const img        = document.getElementById("segundoLogoImg");

  if(contenedor && img){
    if(data.disponible){
      img.src = data.url;
      contenedor.style.display = "block";
    } else {
      contenedor.style.display = "none";
    }
  }

}

async function subirLogo2(){

  const archivo =
  document.getElementById("archivoLogo2").files[0];

  if(!archivo){
    alert("Selecciona una imagen primero.");
    return;
  }

  const estado = document.getElementById("estadoLogo2");
  estado.textContent = "Subiendo...";

  const formData = new FormData();
  formData.append("logo2", archivo);

  const res  = await fetch("/logo2/subir",{ method:"POST", body:formData });
  const data = await res.json();

  if(data.ok){
    estado.textContent = "✅ Segundo logo actualizado.";
    cargarLogo2();
  } else {
    estado.textContent = "❌ Error al subir.";
  }

}

async function borrarLogo2(){

  if(!confirm("¿Borrar el segundo logo?")) return;

  await fetch("/logo2/borrar",{ method:"DELETE" });

  document.getElementById("estadoLogo2").textContent = "✅ Logo eliminado.";
  cargarLogo2();

}


// =======================
// REDES SOCIALES
// =======================

const iconosRed = {
  instagram: "📸",
  facebook:  "📘",
  twitter:   "🐦",
  tiktok:    "🎵",
  youtube:   "▶️",
  otro:      "🔗"
};

async function publicarRedSocial(){

  const nombre    = document.getElementById("nombreRedSocial").value.trim();
  const plataforma = document.getElementById("plataformaRedSocial").value;
  const url       = document.getElementById("urlRedSocial").value.trim();
  const estado    = document.getElementById("estadoRedSocial");

  if(!nombre || !url){
    alert("Completa tu nombre y la URL.");
    return;
  }

  estado.textContent = "Publicando...";

  const res = await fetch("/redes",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ nombre, plataforma, url })
  });

  const data = await res.json();

  if(data._id){
    estado.textContent = "✅ Red social publicada.";
    document.getElementById("nombreRedSocial").value  = "";
    document.getElementById("urlRedSocial").value     = "";
    cargarRedesInicio();
  } else {
    estado.textContent = "❌ Error al publicar.";
  }

}

async function cargarRedesInicio(){

  const res  = await fetch("/redes");
  const data = await res.json();

  const seccion = document.getElementById("seccionRedesInicio");
  const lista   = document.getElementById("listaRedesInicio");

  if(!seccion || !lista) return;

  if(data.length === 0){
    seccion.style.display = "none";
    lista.innerHTML = "";
    return;
  }

  seccion.style.display = "block";

  lista.innerHTML = data.map(r => {

    const icono  = iconosRed[r.plataforma] || "🔗";
    const urlFmt = r.url.startsWith("http") ? r.url : "https://" + r.url;

    const btnBorrar = esAdmin
      ? `<button type="button" class="btn-borrar-cmt"
           style="margin-left:auto;"
           onclick="borrarRedSocial('${r._id}')">🗑️</button>`
      : "";

    return `
      <div style="display:flex; align-items:center; gap:10px; padding:10px 0;
                  border-bottom:1px solid var(--borde-suave);" id="red-${r._id}">
        <span style="font-size:22px;">${icono}</span>
        <div style="flex:1;">
          <strong style="display:block; font-size:14px; color:var(--verde-oscuro);">${r.nombre}</strong>
          <a href="${urlFmt}" target="_blank"
             style="font-size:13px; color:var(--verde-principal); word-break:break-all;">
            ${r.url}
          </a>
        </div>
        ${btnBorrar}
      </div>
    `;

  }).join("");

}

async function borrarRedSocial(id){

  if(!confirm("¿Borrar esta red social?")) return;

  await fetch(`/redes/${id}`,{ method:"DELETE" });

  cargarRedesInicio();

}