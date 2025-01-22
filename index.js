import bodyParser from "body-parser";
import express from "express";

//rutas de las tablas
import rutaProduccion from './src/routers/finanzas/router.produccion.js';
import rutaVenta from './src/routers/finanzas/router.venta.js';
import rutaGenera from './src/routers/finanzas/router.genera.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// rutas
app.use(rutaProduccion);
app.use(rutaVenta);
app.use(rutaGenera);

app.listen(3000, () => {
    console.log("Servidor inicializado en el puerto 3000");
});