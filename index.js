import express from 'express';
import bodyParser from 'body-parser';
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

// Definimos los endpoints para las operaciones CRUD
app.use(routerasignacion_actividad)
app.use(routerCalendarioLunar)
app.use(routerEspecie)
app.use(routerNotificacion)
app.use(routerProgramacion)
app.use(routerRealiza)
app.use(routerSemillero)
app.use(routerTipoCultivo)

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});


