import { Router } from 'express';
import { pool } from '../db.js';

// Creación de un router de Express
const router = Router();

// Ruta de prueba para verificar la conexión a la base de datos
router.get('/ping', async (req, res) => {
    try {
        // Consulta a la base de datos para sumar 1 + 1
        const [rows] = await pool.query('SELECT 1 + 1 as result');

        // Imprime el resultado en la consola
        console.log(rows[0]);

        // Devuelve el resultado como respuesta JSON
        res.json(rows[0]);
    } catch (error) {
        // Manejo de errores en caso de problemas con la base de datos
        console.error('Error en la consulta a la base de datos:', error);
        res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    }
});

// Exporta el router para ser utilizado en otras partes de la aplicación
export default router;
