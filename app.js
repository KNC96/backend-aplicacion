const express = require('express');
const apiRouter = require('./ApiRuta');
const app = express();

// Asociar el enrutador a una ruta base
app.use('/', apiRouter);

// Resto de la configuración del servidor...

app.listen(8080, () => {
    console.log('Servidor en funcionamiento en http://localhost:8080');
});
