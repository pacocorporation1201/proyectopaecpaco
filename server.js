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
// STORAGE
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
