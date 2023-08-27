const express = require('express');
const apiRouter = require('./ApiRuta');
const app = express();

// Asociar el enrutador a una ruta base
app.use('/', apiRouter);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:19006');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// Resto de la configuración del servidor...

app.listen(3000, () => {
    console.log('Servidor en funcionamiento en http://localhost:3000');
});
