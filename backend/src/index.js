const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/properties');
const connectLocalDB = require('./config/mongoDBLocal');
const app = express();
connectLocalDB(); // Conexion con la base de datos


app.use(cors());

app.use(express.json()); // parse application/json

app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// Rutas
app.use('/api', require('./routes/login.routes'));
app.use('/clientes', require('./controllers/clientes'));
app.use('/inventario', require('./controllers/inventario'));
app.use('/recetas', require('./controllers/recetas'));
app.use('/bebidas', require('./controllers/bebidas'));

// Servidor
app.listen(PORT, () => console.log(`Escuchando por el puerto ${PORT}`) );

