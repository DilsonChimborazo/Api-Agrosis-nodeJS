import express from 'express';
import bodyParser from 'body-parser';
// rutas del modulo de iot
import routerSensores from './src/routers/iot/router.sensores.js';
import routerUbicacion from './src/routers/iot/router.ubicacion.js';
import routerLotes from './src/routers/iot/router.lotes.js';
import routerEras from './src/routers/iot/router.eras.js';
import routerMide from './src/routers/iot/router.mide.js';

//rutas del modulo finanzas
import rutaProduccion from './src/routers/finanzas/router.produccion.js';
import rutaVenta from './src/routers/finanzas/router.venta.js';
import rutaGenera from './src/routers/finanzas/router.genera.js';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Definimos los endpoints para las operaciones CRUD para el modulo IOT
app.use(routerSensores)
app.use(routerUbicacion)
app.use(routerLotes)
app.use(routerEras)
app.use(routerMide)

// Definimos los endpoints para las operaciones CRUD para el modulo Finanzas
app.use(rutaProduccion);
app.use(rutaVenta);
app.use(rutaGenera);

app.listen(3000, () => {
    console.log("Servidor inicializado en el puerto 3000");
});

