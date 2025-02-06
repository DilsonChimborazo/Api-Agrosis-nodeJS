import express from 'express';
import bodyParser from 'body-parser';
import routerRol from './src/routers/usuarios/router.rol.js';
import routerUsuarios from './src/routers/usuarios/router.usuarios.js';
import router from './src/routers/usuarios/router.autenticacion.js';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './src/views/swagger.js';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(routerRol)
app.use(routerUsuarios)
app.use(router)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(3000,()=>{
    console.log("servidor iniciado en el puerto 3000")
    
    console.log(
        `Version 1 de documentacion dsiponible en url http://localhost:3000/api-docs`
    )
});