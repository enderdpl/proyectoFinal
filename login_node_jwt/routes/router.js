// Importamos librerias necesarias para y paquetes necesarios pra el programa.

const express = require('express')
const router = express.Router()
var methodOverride = require('method-override')
router.use(methodOverride("_method", { methods: ["GET", "POST"] }));
const authController = require('../controllers/authController')

// routes get necesarias
router.get('/dashboard', (req,res)=>{
    res.render('dashboard.ejs')
})
// rutas de graficos con groupby
router.get('/graficos',authController.isAuthenticated, async(req,res)=>{

    const resultado = await fetch(`http://localhost:5007/api/v1/graficos/productos`);

    const data = await resultado.json();

    res.render('graficos.ejs', {results:data})  
})
// VERIFICA TOKEN PARA AUTORIZACION AL INGRESAR
router.get('/',authController.isAuthenticated,async (req,res)=>{
 
    const id =req.user.id
    const resultado = await fetch(`http://localhost:5007/api/v1/productos/${id} `); 

    const data = await resultado.json();
    res.render('index.ejs',{user:req.user, producto:data}) 
})

// PAGINA DE LOGIN CARGADA CON ALERTAS
router.get('/login',(req,res)=>{
    res.render('login.ejs', {alert:false})
})


//REGISTRAR NUEVOS USUARIOS
router.get('/register',(req,res)=>{
    res.render('register.ejs')
}) 

//FORMULARIO CON AUTENTIFICADOR DE TOKEN PARA AGREGAR PRODUCTO
router.get('/newProduct', authController.isAuthenticated,  (req,res)=>{
    res.render('newProduct.ejs', {user:req.user })
})

//AGREGA PRUDUCTOS
router.post("/newProduct", async (req, res) => { 
    const { marca, modelo, estado, usuario_id, fechaEntrega } = req.body;
    console.log(usuario_id)
    const body = { marca: marca, modelo: modelo, estado: estado, usuario_id:usuario_id , fechaEntrega:fechaEntrega}
    const resultado = await fetch("http://localhost:5007/api/v1/newProductos", {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }); 
    const data = await resultado.json();  
    res.redirect("/");;}); 

// RENDERIZA A FORMULARIO CON DATOS CARGADOS PARA EDITAR
router.get('/editar/:id', async(req,res)=>{

        const {id} = req.params
        const resultado=await fetch(`http://localhost:5007/api/v1/edit/productos/${id}`,
        {
          headers: { "Content-Type": "application/json" }
        });
        const data = await resultado.json();
    
        res.render("editProduct.ejs",{ user: data } ); 
      });   

// EDITA PRODUCTOS YA EXISTENTES
router.put("/editar/:id", async (req, res) => {
    /*  const resultado = await pool.query("select * from productos"); */
    const {id} = req.params

    const { marca, modelo, estado  } = req.body;

    const body = { marca: marca, modelo: modelo, estado: estado }

    const resultado = await fetch(`http://localhost:5007/api/v1/productos/${id}`,
    {method: "put",
    body: JSON.stringify(body), 
    headers: { "Content-Type": "application/json"}
});   

    const data = await resultado.json();
    res.redirect("/");
  }); 

// BORRA PRODUCTO 

router.delete("/delete/:id", async(req,res)=>{
    const {id} = req.params
    await fetch(`http://localhost:5007/api/v1/productos/${id}`,
    {
      method: "delete",
      headers: { "Content-Type": "application/json" }
    });
    res.redirect("/"); 
  }) 

//router para los metodos del controller LOGIN- LOGOUT- REGISTER
router.post('/register',authController.register)
router.post('/login',authController.login )
router.get('/logout',authController.logout )
 
module.exports = router

