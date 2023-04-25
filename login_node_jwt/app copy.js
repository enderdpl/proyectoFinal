const express=require('express')

const cookieParser = require('cookie-parser')
const morgan=require('morgan')
// const path= require('path')
const app= express();
// const __dirname = path.dirname(fileURLToPath(import.meta.url))


//seteamos el motor de plantilla
// app.set("views", path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs');

// seteamos la carpeta public para archivos estaticos

app.use(morgan('dev'))
app.use(express.static('public'))

// para procesar datos de envios en el form
app.use(express.urlencoded({extended : true}))
app.use(express.json())

//seteamos variables de entornos
const dotenv = require('dotenv');
const { path } = require('./routes/router');
const { fileURLToPath } = require('url');
dotenv.config({path:'./env/.env'});


// setamos las cookies

app.use(cookieParser())


//llamamanos al router

app.use('/', require('./routes/router'))
 

app.use(function(req,res,next){
    if(!req.user)
    res.header('Cache-Control','private, no-cache, no-store,must-revalidate');
    next()
}) 

app.get("/prueba", async (req, res) => {
    /*  const resultado = await pool.query("select * from productos"); */
    const resultado = await fetch("http://localhost:5007/api/v1/productos");
    const data = await resultado.json();
    res.render("prueba.ejs", { users: data });
  });

app.listen(5006, ()=>{
    console.log('server run')
})

