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

//rutas del modulo trazabilidad
import routerasignacion_actividad from './src/routers/trazabilidad/router.asignacionActividades.js';
import routerCalendarioLunar from './src/routers/trazabilidad/router.calendarioLunar.js';
import routerEspecie from './src/routers/trazabilidad/router.especie.js';
import routerNotificacion from './src/routers/trazabilidad/router.notificacion.js';
import routerProgramacion from './src/routers/trazabilidad/router.programacion.js';
import routerRealiza from './src/routers/trazabilidad/router.realiza.js';
import routerSemillero from './src/routers/trazabilidad/router.semillero.js';
import routerTipoCultivo from './src/routers/trazabilidad/router.tipoCultivo.js';



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

// Definimos los endpoints para las operaciones CRUD para el modulo trazabilidad 
app.use(routerasignacion_actividad)
app.use(routerCalendarioLunar)
app.use(routerEspecie)
app.use(routerNotificacion)
app.use(routerProgramacion)
app.use(routerRealiza)
app.use(routerSemillero)
app.use(routerTipoCultivo)

app.listen(3000, () => {
    console.log("Servidor inicializado en el puerto 3000");
});


