import express from 'express';
import bodyParser from 'body-parser';
import routerSensores from './src/routers/iot/router.sensores.js';
import routerUbicacion from './src/routers/iot/router.ubicacion.js';
import routerLotes from './src/routers/iot/router.lotes.js';
import routerEras from './src/routers/iot/router.eras.js';
import routerMide from './src/routers/iot/router.mide.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Definimos los endpoints para las operaciones CRUD para el modulo IOT
app.use(routerSensores)
app.use(routerUbicacion)
app.use(routerLotes)
app.use(routerEras)
app.use(routerMide)

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
