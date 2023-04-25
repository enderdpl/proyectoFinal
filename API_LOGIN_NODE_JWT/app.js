// Importamos librerias necesarias para y paquetes necesarios pra el programa.
const express = require('express')
const dotenv = require('dotenv');
const morgan = require('morgan')
dotenv.config({ path: './env/.env' });
const app = express();
app.use(express.json())
const conexion = require('./database/db')
app.use(morgan('dev'))

app.listen(5007, () => {
    console.log('server run')
})

// CONSULTA A LA API CON JOIN-ORDER BY-DATEFORMAT PARA CARGAR DATOS DE USERS Y PRODUCTOS
app.get('/api/v1/productos/:id', async (req, res) => {
    const id = req.params.id;

    console.table(id)
    try {

        conexion.query('SELECT producto.id,producto.marca, producto.modelo, producto.estado,DATE_FORMAT(producto.fechaEntregaEquipo, "%Y-%m-%d") AS fechaEntregaEquipo , users.name FROM producto JOIN users ON producto.usuario_id = users.id WHERE users.id = ?   ORDER BY producto.fechaEntregaEquipo ASC', [id], (error, results, fields) => {
            if (error) throw error;

            res.json(results);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});



app.get('/api/v1/graficos/productos', async (req, res) => {

    try {

        conexion.query('SELECT marca, COUNT(*) AS cantidad FROM producto GROUP BY marca ', (error, results, fields) => {
        if (error) throw error;

        res.json(results);
    });
    } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
} 
});


// CONSULTA A LA API PARA INSERTAR DATOS A LA TABLA USERS
app.post('/api/v1/productos', async (req, res) => {
    const { user, name, pass } = req.body;
    await conexion.query('INSERT INTO users (user, name, pass) VALUES (?, ?, ?)', [user, name, pass]);
    try {
        const query = 'SELECT * FROM users';
        conexion.query(query, (error, results, fields) => {
            if (error) throw error;
            res.json(results);
            console.log(results);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


// CONSULTA A LA API PARA INSERTAR DATOS A LA TABLA PRODUCTOS
app.post('/api/v1/newProductos', async (req, res) => {
    const { marca, modelo, estado, usuario_id, fechaEntrega } = req.body;
    console.log(usuario_id)
    try {
        await conexion.query('INSERT INTO producto (marca, modelo, estado,usuario_id, fechaEntregaEquipo ) VALUES (?, ?, ?, ?,?)', [marca, modelo, estado, usuario_id, fechaEntrega], (error, results, fields) => {
            if (error) throw error;
            res.json(results);
            console.log(results);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }

});

// CONSULTA A LA API PARA ELIMINAR REGISTRO DATOS A LA TABLA PRODUCTOS
app.delete("/api/v1/productos/:id", (req, res) => {
    const { id } = req.params
    try {

        conexion.query("DELETE FROM producto where id=?", [id], (error, results, fields) => {
            if (error) throw error;
            res.json(results);
            console.log(results);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// CONSULTA A LA API PARA CARGAR DATOS DE FORMULARIO AL EDITAR
app.get("/api/v1/edit/productos/:id", (req, res) => {
    const { id } = req.params;

    try {

        conexion.query("SELECT * FROM producto where id=?", [id], (error, results, fields) => {
            if (error) throw error;
            res.json(results);
            console.log(results);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// CONSULTA A LA API PARA EDITAR DATOS DE LA TABLA PRODUCTOS 

app.put("/api/v1/productos/:id", async (req, res) => {
    const { id } = req.params;
    console.log(req.body)
    const { marca, modelo, estado } = req.body;
    try {
        await conexion.query(
            "UPDATE producto SET marca=?, modelo=?, estado=? WHERE id=?",
            [marca, modelo, estado, id],
            (error, results, fields) => {
                if (error) throw error;
                res.json(results);
                console.log(results);
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al actualizar el usuario.");
    }
});


