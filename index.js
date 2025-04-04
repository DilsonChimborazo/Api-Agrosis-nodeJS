import bodyParser from "body-parser";
import express from "express";
import routerPlantacion from "./src/routers/trazabilidad2/router.plantacion.js";
import routerCultivo from "./src/routers/trazabilidad2/router.cultivo.js";
import routerPea from "./src/routers/trazabilidad2/router.pea.js";
import routerDesarollan from "./src/routers/trazabilidad2/router.desarrollan.js";
import routerTipoCultivo from "./src/routers/trazabilidad2/router.tipo_cultivo.js";
import routerActividad from "./src/routers/trazabilidad2/router.actividad.js";
import routerResiduos from "./src/routers/trazabilidad2/router.residuos.js";
import RouterCF from "./src/routers/trazabilidad2/router.controlFitosanitario.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routerPlantacion);
app.use(routerCultivo);
app.use(routerPea);
app.use(routerDesarollan);
app.use(routerTipoCultivo);
app.use(routerActividad);
app.use(routerResiduos);
app.use(RouterCF);

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
})