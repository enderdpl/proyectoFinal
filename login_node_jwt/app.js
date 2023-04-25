// Importamos librerias necesarias para y paquetes necesarios pra el programa.
const express=require('express')
const cookieParser = require('cookie-parser')
var methodOverride = require('method-override')
const morgan=require('morgan')
const app= express();
app.use(methodOverride("_method", { methods: ["GET", "POST"] }));

app.use(morgan('dev'))
//seteamos el motor de plantilla

app.set(' view engine', 'ejs');

// seteamos la carpeta public para archivos estaticos
 
app.use(express.static('public'))

// para procesar datos de envios en el form
app.use(express.urlencoded({extended : true}))
app.use(express.json())  

//seteamos variables de entornos
const dotenv = require('dotenv');
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
   
  
app.listen(5006, ()=>{ 
    console.log('server run') 
}) 
 
