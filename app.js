const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const apiRouter = require('./ApiRuta');
const app = express();

// Configura el middleware cors para todas las rutas
app.use(cors());

// Asociar el enrutador a una ruta base
app.use('/', apiRouter);

// Resto de la configuración del servidor...

app.listen(8080, () => {
    console.log('Servidor en funcionamiento en http://localhost:8080');
});
