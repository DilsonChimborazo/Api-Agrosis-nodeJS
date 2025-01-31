import express from 'express';
import bodyParser from 'body-parser';
import routerRol from './src/routers/usuarios/router.rol.js';
import routerUsuarios from './src/routers/usuarios/router.usuarios.js';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(routerRol)
app.use(routerUsuarios)

app.listen(3000,()=>{
    console.log("servidor iniciado en el puerto 3000")
});