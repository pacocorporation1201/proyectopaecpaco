const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const cloudinary = require("cloudinary").v2;

const {
  CloudinaryStorage
} = require("multer-storage-cloudinary");

const app = express();


// =======================
// CONFIG
// =======================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended:true
}));

app.use(express.static("public"));


// =======================
// MONGO
// =======================

mongoose.connect(process.env.MONGO_URL)

.then(()=>{

  console.log("✅ Mongo conectado");

})

.catch((err)=>{

  console.log(err);

});


// =======================
// CLOUDINARY
// =======================

cloudinary.config({

  cloud_name:
  process.env.CLOUD_NAME,

  api_key:
  process.env.API_KEY,

  api_secret:
  process.env.API_SECRET

});


// =======================
// STORAGE IMAGENES (registros, articulos, diagramas)
// =======================

const storage =
new CloudinaryStorage({

  cloudinary:cloudinary,

  params:async(req,file)=>({

    folder:"lavanda",

    allowed_formats:[
      "jpg",
      "png",
      "jpeg",
      "webp"
    ]

  })

});

const upload =
multer({ storage });


// =======================
// STORAGE LOGOS (Cloudinary — permanente)
// =======================

const storageLogo1 =
new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async(req, file) => ({
    folder: "lavanda/logos",
    public_id: "logo-principal",   // sobreescribe siempre el mismo
    allowed_formats: ["jpg","png","jpeg","webp"]
  })
});

const uploadLogo1 = multer({ storage: storageLogo1 });

const storageLogo2 =
new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async(req, file) => ({
    folder: "lavanda/logos",
    public_id: "logo-secundario",  // sobreescribe siempre el mismo
    allowed_formats: ["jpg","png","jpeg","webp"]
  })
});

const uploadLogo2 = multer({ storage: storageLogo2 });


// =======================
// MODELOS
// =======================

const Registro =
mongoose.model("Registro",{

  alumno:String,

  altura:String,

  fecha:String,

  imagen:String

});


const Articulo =
mongoose.model("Articulo",{

  titulo:String,

  contenido:String,

  imagen:String

});
const Producto =
mongoose.model("Producto",{

  nombre:String,

  descripcion:String,

  precio:String,

  imagen:String

});


const Diagrama =
mongoose.model("Diagrama",{

  titulo:String,

  imagen:String

});


const Tutorial =
mongoose.model("Tutorial",{

  titulo:String,

  link:String

});


const Comentario =
mongoose.model("Comentario",{

  seccion:String,

  referenciaId:String,

  autor:String,

  texto:String,

  fecha:{ type: Date, default: Date.now }

});


const RedSocial =
mongoose.model("RedSocial",{

  nombre:   String,

  plataforma: String,  // instagram | facebook | twitter | tiktok | youtube | otro

  url:      String,

  fecha:    { type: Date, default: Date.now }

});


const LogoConfig =
mongoose.model("LogoConfig",{
  url:   String,
  fecha: { type: Date, default: Date.now }
});

const Logo2Config =
mongoose.model("Logo2Config",{
  url:   String,
  fecha: { type: Date, default: Date.now }
});


// =======================
// REGISTROS
// =======================

app.post(
"/registros",
upload.single("imagen"),
async(req,res)=>{

  try{

    const nuevo =
    new Registro({

      alumno:req.body.alumno,

      altura:req.body.altura,

      fecha:req.body.fecha,

      imagen:
      req.file
      ? req.file.path
      : ""

    });

    await nuevo.save();

    res.json(nuevo);

  }catch(error){

    console.log(error);

    res.status(500).send(error);

  }

});


app.get(
"/registros",
async(req,res)=>{

  const datos =
  await Registro.find();

  res.json(datos);

});


app.delete(
"/registros/:id",
async(req,res)=>{

  try{

    await Registro.findByIdAndDelete(req.params.id);

    res.json({ ok:true });

  }catch(error){

    console.log(error);

    res.status(500).send(error);

  }

});


// =======================
// ARTICULOS
// =======================

app.post(
"/articulos",
upload.single("imagen"),
async(req,res)=>{

  try{

    const nuevo =
    new Articulo({

      titulo:req.body.titulo,

      contenido:req.body.contenido,

      imagen:
      req.file
      ? req.file.path
      : ""

    });

    await nuevo.save();

    res.json(nuevo);

  }catch(error){

    console.log(error);

  }

});


app.get(
"/articulos",
async(req,res)=>{

  const datos =
  await Articulo.find();

  res.json(datos);

});


app.delete(
"/articulos/:id",
async(req,res)=>{

  try{

    await Articulo.findByIdAndDelete(req.params.id);

    res.json({ ok:true });

  }catch(error){

    console.log(error);

    res.status(500).send(error);

  }

});

// =======================
// PRODUCTOS
// =======================

app.post(
"/productos",
upload.single("imagen"),
async(req,res)=>{

  try{

    const nuevo =
    new Producto({

      nombre:req.body.nombre,

      descripcion:req.body.descripcion,

      precio:req.body.precio,

      imagen:
      req.file
      ? req.file.path
      : ""

    });

    await nuevo.save();

    res.json(nuevo);

  }catch(error){

    console.log(error);

  }

});


app.get(
"/productos",
async(req,res)=>{

  const datos =
  await Producto.find();

  res.json(datos);

});


app.delete(
"/productos/:id",
async(req,res)=>{

  try{

    await Producto.findByIdAndDelete(req.params.id);

    res.json({ ok:true });

  }catch(error){

    console.log(error);

    res.status(500).send(error);

  }

});

// =======================
// DIAGRAMAS
// =======================

app.post(
"/diagramas",
upload.single("imagen"),
async(req,res)=>{

  try{

    const nuevo =
    new Diagrama({

      titulo:req.body.titulo,

      imagen:
      req.file
      ? req.file.path
      : ""

    });

    await nuevo.save();

    res.json(nuevo);

  }catch(error){

    console.log(error);

  }

});


app.get(
"/diagramas",
async(req,res)=>{

  const datos =
  await Diagrama.find();

  res.json(datos);

});


app.delete(
"/diagramas/:id",
async(req,res)=>{

  try{

    await Diagrama.findByIdAndDelete(req.params.id);

    res.json({ ok:true });

  }catch(error){

    console.log(error);

    res.status(500).send(error);

  }

});


// =======================
// TUTORIALES
// =======================

app.post(
"/tutoriales",
async(req,res)=>{

  try{

    const nuevo =
    new Tutorial({

      titulo:req.body.titulo,

      link:req.body.link

    });

    await nuevo.save();

    res.json(nuevo);

  }catch(error){

    console.log(error);

  }

});


app.get(
"/tutoriales",
async(req,res)=>{

  const datos =
  await Tutorial.find();

  res.json(datos);

});


app.delete(
"/tutoriales/:id",
async(req,res)=>{

  try{

    await Tutorial.findByIdAndDelete(req.params.id);

    res.json({ ok:true });

  }catch(error){

    console.log(error);

    res.status(500).send(error);

  }

});


// =======================
// COMENTARIOS
// =======================

app.post(
"/comentarios",
async(req,res)=>{

  try{

    const nuevo =
    new Comentario({

      seccion:req.body.seccion,

      referenciaId:req.body.referenciaId,

      autor:req.body.autor,

      texto:req.body.texto

    });

    await nuevo.save();

    res.json(nuevo);

  }catch(error){

    console.log(error);

    res.status(500).send(error);

  }

});


app.get(
"/comentarios",
async(req,res)=>{

  const { seccion, referenciaId } =
  req.query;

  const filtro = {};

  if(seccion) filtro.seccion = seccion;

  if(referenciaId) filtro.referenciaId = referenciaId;

  const datos =
  await Comentario.find(filtro).sort({ fecha: 1 });

  res.json(datos);

});


app.delete(
"/comentarios/:id",
async(req,res)=>{

  try{

    await Comentario.findByIdAndDelete(req.params.id);

    res.json({ ok: true });

  }catch(error){

    console.log(error);

    res.status(500).send(error);

  }

});


// =======================
// REDES SOCIALES
// =======================

app.post(
"/redes",
async(req,res)=>{

  try{

    const nueva =
    new RedSocial({

      nombre:     req.body.nombre,

      plataforma: req.body.plataforma,

      url:        req.body.url

    });

    await nueva.save();

    res.json(nueva);

  }catch(error){

    console.log(error);

    res.status(500).send(error);

  }

});


app.get(
"/redes",
async(req,res)=>{

  const datos =
  await RedSocial.find().sort({ fecha: -1 });

  res.json(datos);

});


app.delete(
"/redes/:id",
async(req,res)=>{

  try{

    await RedSocial.findByIdAndDelete(req.params.id);

    res.json({ ok:true });

  }catch(error){

    console.log(error);

    res.status(500).send(error);

  }

});


// =======================
// LOGO 1 — Cloudinary (permanente)
// =======================

app.post(
"/logo/subir",
uploadLogo1.single("logo"),
async(req, res) => {

  try{

    if(!req.file){
      return res.status(400).json({ error: "No se recibió imagen" });
    }

    await LogoConfig.deleteMany({});

    const doc = new LogoConfig({
      url: req.file.path   // Cloudinary devuelve URL completa en path
    });

    await doc.save();

    res.json({ ok: true, url: doc.url });

  }catch(error){

    console.log(error);

    res.status(500).send(error);

  }

});

app.get(
"/logo/info",
async(req, res) => {

  const doc = await LogoConfig.findOne();

  if(!doc){
    return res.json({ disponible: false });
  }

  res.json({ disponible: true, url: doc.url });

});


// =======================
// LOGO 2 — Cloudinary (permanente)
// =======================

app.post(
"/logo2/subir",
uploadLogo2.single("logo2"),
async(req, res) => {

  try{

    if(!req.file){
      return res.status(400).json({ error: "No se recibió imagen" });
    }

    await Logo2Config.deleteMany({});

    const doc = new Logo2Config({
      url: req.file.path   // Cloudinary devuelve URL completa en path
    });

    await doc.save();

    res.json({ ok: true, url: doc.url });

  }catch(error){

    console.log(error);

    res.status(500).send(error);

  }

});

app.get(
"/logo2/info",
async(req, res) => {

  const doc = await Logo2Config.findOne();

  if(!doc){
    return res.json({ disponible: false });
  }

  res.json({ disponible: true, url: doc.url });

});

app.delete(
"/logo2/borrar",
async(req, res) => {

  try{

    await Logo2Config.deleteMany({});

    res.json({ ok: true });

  }catch(error){

    console.log(error);

    res.status(500).send(error);

  }

});


// =======================
// EXCEL (subir y consultar)
// =======================

const path = require("path");
const fs   = require("fs");

const uploadsDir =
path.join(__dirname, "public", "uploads");

if(!fs.existsSync(uploadsDir)){
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storageExcel =
multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },

  filename: (req, file, cb) => {
    const ext =
    path.extname(file.originalname);
    cb(null, "reporte-lavanda" + ext);
  }

});

const uploadExcel =
multer({

  storage: storageExcel,

  fileFilter: (req, file, cb) => {

    const permitidos =
    [".xlsx", ".xls", ".csv"];

    const ext =
    path.extname(file.originalname)
    .toLowerCase();

    if(permitidos.includes(ext)){
      cb(null, true);
    } else {
      cb(new Error("Solo Excel o CSV"));
    }

  }

});

const ArchivoExcel =
mongoose.model("ArchivoExcel",{
  nombre: String,
  url:    String,
  fecha:  { type: Date, default: Date.now }
});


app.post(
"/excel/subir",
uploadExcel.single("archivo"),
async(req, res) => {

  try{

    if(!req.file){
      return res.status(400).json({ error: "No se recibió archivo" });
    }

    await ArchivoExcel.deleteMany({});

    const registro = new ArchivoExcel({
      nombre: req.file.filename,
      url:    "/uploads/" + req.file.filename
    });

    await registro.save();

    res.json({ ok: true, url: registro.url });

  }catch(error){

    console.log(error);
    res.status(500).send(error);

  }

});


app.get(
"/excel/info",
async(req, res) => {

  const doc = await ArchivoExcel.findOne();

  if(!doc){
    return res.json({ disponible: false });
  }

  res.json({
    disponible: true,
    url:    doc.url,
    nombre: doc.nombre,
    fecha:  doc.fecha
  });

});


// =======================
// PUERTO
// =======================

const PORT =
process.env.PORT || 3000;

app.listen(PORT,()=>{

  console.log(
    "🚀 Servidor iniciado en puerto " + PORT
  );

});