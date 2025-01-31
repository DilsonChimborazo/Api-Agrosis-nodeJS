import bodyParser from "body-parser";
import express from "express";
import routerPlantacion from "./src/router/router.plantacion.js";
import routerCultivo from "./src/router/router.cultivo.js";
import routerPea from "./src/router/router.pea.js";


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routerPlantacion);
app.use(routerCultivo);
app.use(routerPea);


app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
})