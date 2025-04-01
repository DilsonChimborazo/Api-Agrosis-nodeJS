import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config({ path: './env/.env' });

export const configuracionBD = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
});

export const conectarBD = async () => {
    try {
        const client = await configuracionBD.connect();
        console.log('Conectado a la base de datos');
        client.release();
    } catch (error) {
        console.error('Error al conectar a la base de datos', error);
    }
};

