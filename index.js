import express from 'express';
import bodyParser from 'body-parser';

// Importar rutas
import routerInsumo  from './src/routers/Inventario/Insumo.routers.js';
import routerHerramientas  from './src/routers/Inventario/Herramientas.routers.js';
import routerRequiere  from './src/routers/Inventario/Requiere.routers.js';
import routerUtiliza  from './src/routers/Inventario/Utiliza.routers.js';
import routerControlUsaInsumo from './src/routers/Inventario/Control_Usa_Insumo.routers.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(routerHerramientas);

// Registrar rutas
app.use(routerInsumo);
app.use( routerHerramientas);
app.use( routerRequiere);
app.use(routerUtiliza);
app.use( routerControlUsaInsumo);

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor inicializado en el puerto http://localhost:3000");
});
