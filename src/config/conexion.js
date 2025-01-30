import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config({path: './env/.env'});

export const configuracionBD = new Pool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
})

export const conectarDB = async () =>{
    try{
        const client = await configuracionBD.connect();
        console.log('conectando a la base de datos');
        client.release();
    } catch (error) {
        console.error('Error al conectar a la base de datos',error);
    }
        
};