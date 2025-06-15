import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

// rutas del modulo de iot
import routerSensores from './src/routers/iot/router.sensores.js';
import routerUbicacion from './src/routers/iot/router.ubicacion.js';
import routerLotes from './src/routers/iot/router.lotes.js';
import routerEras from './src/routers/iot/router.eras.js';
import routerMide from './src/routers/iot/router.mide.js';

//rutas del modulo finanzas
import rutaProduccion from './src/routers/finanzas/router.produccion.js';
import rutaVenta from './src/routers/finanzas/router.venta.js';

//rutas del modulo trazabilidad
import routerasignacion_actividad from './src/routers/trazabilidad/router.asignacionActividades.js';
import routerCalendarioLunar from './src/routers/trazabilidad/router.calendarioLunar.js';
import routerEspecie from './src/routers/trazabilidad/router.especie.js';
import routerNotificacion from './src/routers/trazabilidad/router.notificacion.js';
import routerProgramacion from './src/routers/trazabilidad/router.programacion.js';
import routerRealiza from './src/routers/trazabilidad/router.realiza.js';
import routerSemillero from './src/routers/trazabilidad/router.semillero.js';
import routerTipoCultivo from './src/routers/trazabilidad/router.tipoCultivo.js';
import routerPlantacion from "./src/routers/trazabilidad/router.plantacion.js";
import routerCultivo from "./src/routers/trazabilidad/router.cultivo.js";
import routerPea from "./src/routers/trazabilidad/router.pea.js";
import routerDesarollan from "./src/routers/trazabilidad/router.desarrollan.js";
import routerActividad from "./src/routers/trazabilidad/router.actividad.js";
import routerResiduos from "./src/routers/trazabilidad/router.residuos.js";
import RouterCF from "./src/routers/trazabilidad/router.controlFitosanitario.js";
import routerTipoResiduo from './src/routers/trazabilidad/router.tipo_residuo.js';

// Definimos los endpoints para el modulo Usuarios
import routerRol from './src/routers/usuarios/router.rol.js';
import routerUsuarios from './src/routers/usuarios/router.usuarios.js';
import router from './src/routers/usuarios/router.autenticacion.js';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './src/views/swagger.js';

// Definimos los endpoints para el modulo Inventario
import routerInsumo from './src/routers/Inventario/Insumo.routers.js';
import routerRequiere from './src/routers/Inventario/Requiere.routers.js';
import routerUtiliza from './src/routers/Inventario/Utiliza.routers.js';
import routerControlUsaInsumo from './src/routers/Inventario/Control_Usa_Insumo.routers.js';
import routerHerramientas from './src/routers/Inventario/herramientas.routers.js';

const app = express();
const httpServer = createServer(app);


// Inicializar socket.io
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: ['http://localhost:5173', 'http://192.168.100.205:5173'],
    methods: ['GET', 'POST'],
    credentials: true, // Añadir para soportar withCredentials
  },
});

io.on('connection', (socket) => {
  console.log('✅ Cliente conectado al WebSocket');
  socket.on('disconnect', () => {
    console.log('⚠ Cliente desconectado');
  });
});

// Exportar io para usarlo en controladores
export { io };

// Habilitamos CORS para permitir peticiones desde el frontend
app.use(cors({
  origin: ['http://localhost:5173',, 'http://192.168.100.205:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para manejar JSON y datos en formulario
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Definimos los endpoints para el modulo IOT
app.use(routerSensores);
app.use(routerUbicacion);
app.use(routerLotes);
app.use(routerEras);
app.use(routerMide);

// Definimos los endpoints para el modulo Finanzas
app.use(rutaProduccion);
app.use(rutaVenta);

// Definimos los endpoints para el modulo trazabilidad
app.use(routerasignacion_actividad);
app.use(routerCalendarioLunar);
app.use(routerEspecie);
app.use(routerNotificacion);
app.use(routerProgramacion);
app.use(routerRealiza);
app.use(routerSemillero);
app.use(routerTipoCultivo);
app.use(routerPlantacion);
app.use(routerCultivo);
app.use(routerPea);
app.use(routerDesarollan);
app.use(routerTipoCultivo);
app.use(routerActividad);
app.use(routerResiduos);
app.use(RouterCF);
app.use(routerTipoResiduo);

// Definimos los endpoints para el modulo Usuarios
app.use(routerRol);
app.use(routerUsuarios);
app.use(router);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Definimos los endpoints para el modulo Inventario
app.use(routerInsumo);
app.use(routerRequiere);
app.use(routerHerramientas);
app.use(routerUtiliza);
app.use(routerControlUsaInsumo);

// Servidor
const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`✅ Servidor iniciado en http://localhost:${PORT}`);
  console.log(`📄 Documentación disponible en http://localhost:${PORT}/api-docs`);
});