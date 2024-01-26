import { createPool } from 'mysql2/promise';

// Creación de un pool de conexión a la base de datos MySQL
export const pool = createPool({
    host: 'localhost',      // Dirección del servidor de la base de datos
    port: '3306',           // Puerto de conexión a la base de datos
    user: 'root',           // Nombre de usuario de la base de datos
    password: 'faztpassword', // Contraseña de la base de datos
    database: 'municipio'   // Nombre de la base de datos a la que se conectará
});



